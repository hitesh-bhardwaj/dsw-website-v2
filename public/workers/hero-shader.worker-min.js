/**
 * Hero Shader Web Worker - Offscreen Canvas Rendering
 *
 * This worker handles all canvas rendering off the main thread using OffscreenCanvas.
 * Receives commands from the main thread and runs the animation loop independently.
 *
 * Performance benefits:
 * - Zero main thread blocking
 * - Smooth 60fps rendering without affecting page interactions
 * - True parallelism (main + worker + GPU)
 */

// Worker state
let canvas = null;
let ctx = null;
let config = {};
let animationId = null;
let isRunning = false;

// Mouse state
const targetMousePos = { x: -1000, y: -1000 };
const currentMousePos = { x: -1000, y: -1000 };

// Spring mesh vertices
let vertices = null;
let gridDimensions = { cols: 0, rows: 0 };

// Gradient buffers
let gradientCanvas = null;
let gradientCtx = null;
let gradWidth = 0;
let gradHeight = 0;
let gradImageData = null;
let gradData = null;

// Precomputed phase arrays
let xPhase = null;
let yPhase = null;
let uvY = null;

// Boundary arrays
let lowerE0 = null;
let topE0 = null;
let invLowerRange = null;
let invTopRange = null;

// UV lookup tables for corner variants
let uvLookupU = null;
let uvLookupV = null;

// Canvas dimensions
let dpr = 1;
let logicalWidth = 0;
let logicalHeight = 0;
let viewportLogicalWidth = 0;
let viewportLogicalHeight = 0;
let extensionTop = 0;
let extensionBottom = 0;
let extensionLeft = 0;
let extensionRight = 0;

// Stroke style cache
const strokeStyleCache = new Map();

// Animation timing
let lastFrameTime = 0;
let lastTime = 0;

// Precomputed constants
const TWO_PI = Math.PI * 2;

// ===== Message Handler =====
self.onmessage = function(e) {
  const { type, data } = e.data;

  switch (type) {
    case "init":
      initializeWorker(data);
      break;
    case "updateMouse":
      updateMousePosition(data.position);
      break;
    case "resize":
      handleResize(data);
      break;
    case "stop":
      stopAnimation();
      break;
  }
};

// ===== Initialization =====
function initializeWorker(data) {
  canvas = data.canvas;

  // Get initial dimensions from config
  const initialWidth = data.config?.initialWidth || 1920;
  const initialHeight = data.config?.initialHeight || 1080;
  const initialDpr = data.config?.dpr || 1;

  config = {
    variant: data.config.variant || "default",

    // Wave params
    HOVER_ALPHA_BOOST: data.config.HOVER_ALPHA_BOOST || 4.1,
    lowerWaveFreq: data.config.lowerWaveFreq || 0.5,
    lowerWaveAmp: data.config.lowerWaveAmp || 0.12,
    lowerWaveSpeed: data.config.lowerWaveSpeed || 0.8,
    lowerBoundaryBase: data.config.lowerBoundaryBase || 0.12,
    lowerFadeSoftness: data.config.lowerFadeSoftness || 0.15,
    lowerVerticalSpeed: data.config.lowerVerticalSpeed || 0.15,
    lowerVerticalAmp: data.config.lowerVerticalAmp || 0.08,

    upperWaveFreq: data.config.upperWaveFreq || 0.8,
    upperWaveAmp: data.config.upperWaveAmp || 0.1,
    upperWaveSpeed: data.config.upperWaveSpeed || 0.8,
    topBoundaryBase: data.config.topBoundaryBase || 0.57,
    topFadeSoftness: data.config.topFadeSoftness || 0.3,
    upperVerticalSpeed: data.config.upperVerticalSpeed || 0.12,
    upperVerticalAmp: data.config.upperVerticalAmp || 0.08,

    color: data.config.color || "rgba(54, 87, 255, 0.95)",
    fps: data.config.fps || 60,

    // Grid params
    gridSize: data.config.gridSize || 80,
    deformRadius: data.config.deformRadius || 150,
    gridStroke: data.config.gridStroke || "rgba(255, 255, 255, 0.12)",
    gridLineWidth: data.config.gridLineWidth || 1,

    // Physics params
    mouseInfluence: data.config.mouseInfluence || 0.01,
    mouseSmoothingBase: data.config.mouseSmoothingBase || 0.2,

    topOffsetPx: data.config.topOffsetPx || 0,
  };

  // Get canvas context
  ctx = canvas.getContext("2d", {
    alpha: true,
    desynchronized: true,
    willReadFrequently: false,
  });

  // Create offscreen gradient buffer
  gradientCanvas = new OffscreenCanvas(1, 1);
  gradientCtx = gradientCanvas.getContext("2d", { alpha: true });

  // Parse color
  const colorData = parseColor(config.color);
  config.r = colorData.r | 0;
  config.g = colorData.g | 0;
  config.b = colorData.b | 0;
  config.a255 = (colorData.a * 255) | 0;

  // Parse grid stroke color
  const rgbMatch = String(config.gridStroke).match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/i
  );
  if (rgbMatch) {
    config.strokeR = parseInt(rgbMatch[1], 10);
    config.strokeG = parseInt(rgbMatch[2], 10);
    config.strokeB = parseInt(rgbMatch[3], 10);
    config.baseAlpha = rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1;
  } else {
    config.strokeR = 255;
    config.strokeG = 255;
    config.strokeB = 255;
    config.baseAlpha = 0.12;
  }

  // Precompute frequency constants
  config.lowerFreq07 = config.lowerWaveFreq * 0.7;
  config.lowerFreq13 = config.lowerWaveFreq * 1.3;
  config.upperFreq075 = config.upperWaveFreq * 0.75;
  config.upperFreq125 = config.upperWaveFreq * 1.25;

  // Initialize canvas size immediately
  handleResize({
    width: initialWidth,
    height: initialHeight,
    dpr: initialDpr
  });

  // Start animation
  isRunning = true;
  lastTime = performance.now();
  animate(lastTime);
}

// ===== Mouse Updates =====
function updateMousePosition(position) {
  targetMousePos.x = position.x;
  targetMousePos.y = position.y;
}

// ===== Resize Handler =====
function handleResize(data) {
  dpr = Math.min(data.dpr, 1.5);

  const viewportWidth = data.width;
  const viewportHeight = data.height;

  const overflow = getOverflowExtension(config.variant);
  extensionTop = viewportHeight * overflow.top;
  extensionBottom = viewportHeight * overflow.bottom;
  extensionLeft = viewportWidth * overflow.left;
  extensionRight = viewportWidth * overflow.right;

  const totalWidth = viewportWidth + extensionLeft + extensionRight;
  const totalHeight = viewportHeight + extensionTop + extensionBottom;

  const newWidth = Math.floor(totalWidth * dpr);
  const newHeight = Math.floor(totalHeight * dpr);

  if (canvas.width !== newWidth || canvas.height !== newHeight) {
    canvas.width = newWidth;
    canvas.height = newHeight;

    logicalWidth = totalWidth;
    logicalHeight = totalHeight;
    viewportLogicalWidth = viewportWidth;
    viewportLogicalHeight = viewportHeight;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;

    buildVertices();
    rebuildGradientBuffers();
  }
}

// ===== Stop Animation =====
function stopAnimation() {
  isRunning = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

// ===== Helper Functions =====

function parseColor(colorStr) {
  const rgbaMatch = String(colorStr).match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
  );
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
      a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
    };
  }
  const hexMatch = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(colorStr));
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16),
      g: parseInt(hexMatch[2], 16),
      b: parseInt(hexMatch[3], 16),
      a: 1,
    };
  }
  return { r: 54, g: 87, b: 255, a: 0.95 };
}

function getOverflowExtension(variant) {
  switch (variant) {
    case "default":
      return { top: 0, bottom: 0.3, left: 0, right: 0 };
    case "bottomRight":
      return { top: 0, bottom: 0.1, left: 0, right: 0.2 };
    case "bottomLeft":
      return { top: 0, bottom: 0.1, left: 0.2, right: 0 };
    case "rightVertical":
      return { top: 0, bottom: 0.1, left: 0, right: 0.3 };
    case "leftVertical":
      return { top: 0, bottom: 0, left: 0.3, right: 0 };
    case "topLeft":
      return { top: 0.2, bottom: 0, left: 0.2, right: 0 };
    default:
      return { top: 0, bottom: 0, left: 0, right: 0 };
  }
}

function mapUV(logicalX, logicalY) {
  const xInViewport = logicalX - extensionLeft;
  const yInViewport = logicalY - extensionTop;

  const u01 = xInViewport / Math.max(1, viewportLogicalWidth);
  const v01 = yInViewport / Math.max(1, viewportLogicalHeight);

  if (config.variant === "rightVertical") {
    const fromRight01 = 1.7 - u01;
    return { u: v01, v: 1.2 - fromRight01 };
  }

  if (config.variant === "leftVertical") {
    const fromLeft01 = u01;
    return { u: v01, v: 1.2 - fromLeft01 };
  }

  if (config.variant === "topLeft") {
    const fromRight = 1 - u01;
    const fromBottom = 1 - v01;
    const dist = Math.sqrt(fromRight * fromRight + fromBottom * fromBottom);
    return { u: (u01 + v01) * 0.5, v: 1.6 - dist };
  }

  if (config.variant === "bottomRight") {
    const fromLeft = u01;
    const fromTop = v01;
    const dist = Math.sqrt(fromLeft * fromLeft + fromTop * fromTop);
    return { u: (u01 + (1 - v01)) * 0.5, v: 1.6 - dist };
  }

  if (config.variant === "bottomLeft") {
    const fromRight = 1 - u01;
    const fromTop = v01;
    const dist = Math.sqrt(fromRight * fromRight + fromTop * fromTop);
    return { u: ((1 - u01) + (1 - v01)) * 0.5, v: 1.65 - dist };
  }

  // default
  return { u: u01, v: 1.2 - v01 };
}

function buildVertices() {
  const cols = Math.floor(logicalWidth / config.gridSize) + 1;
  const rows = Math.floor(logicalHeight / config.gridSize) + 1;

  gridDimensions = { cols, rows };

  vertices = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      vertices.push({
        x: col * config.gridSize,
        y: row * config.gridSize,
        dx: 0,
        dy: 0,
      });
    }
  }
}

function updateVertexPhysics() {
  if (!vertices) return;

  const mouseX = currentMousePos.x;
  const mouseY = currentMousePos.y;

  // Early exit if mouse is off screen
  if (mouseX < -999 || mouseY < -999) {
    for (let i = 0; i < vertices.length; i++) {
      vertices[i].dx *= 0.85;
      vertices[i].dy *= 0.85;
    }
    return;
  }

  const radiusSq = config.deformRadius * config.deformRadius;

  for (let i = 0; i < vertices.length; i++) {
    const v = vertices[i];
    const dx = mouseX - v.x;
    const dy = mouseY - v.y;
    const distSq = dx * dx + dy * dy;

    if (distSq < radiusSq && distSq > 0) {
      const dist = Math.sqrt(distSq);
      const force = 1 - dist / config.deformRadius;

      v.dx = dx * force * config.mouseInfluence * 40;
      v.dy = dy * force * config.mouseInfluence * 40;
    } else {
      v.dx *= 0.85;
      v.dy *= 0.85;
    }
  }
}

function computeWaveBoundary(phase, isLower, timeL, timeU, verticalMovement) {
  if (isLower) {
    const l1 = Math.sin(phase * config.lowerWaveFreq + timeL);
    const l2 = Math.sin(phase * config.lowerFreq07 + timeL * 0.85);
    const l3 = Math.sin(phase * config.lowerFreq13 + timeL * 0.6);
    const waveCombined = (l1 * 0.5 + l2 * 0.3 + l3 * 0.2) * config.lowerWaveAmp;
    return config.lowerBoundaryBase + waveCombined + verticalMovement;
  } else {
    const u1 = Math.sin(phase * config.upperWaveFreq + timeU);
    const u2 = Math.sin(phase * config.upperFreq075 + timeU * 0.8);
    const u3 = Math.sin(phase * config.upperFreq125 + timeU * 0.65);
    const waveCombined = (u1 * 0.5 + u2 * 0.3 + u3 * 0.2) * config.upperWaveAmp;
    return config.topBoundaryBase + waveCombined + verticalMovement;
  }
}

function rebuildGradientBuffers() {
  gradWidth = Math.max(1, Math.floor(canvas.width / 4));
  gradHeight = Math.max(1, Math.floor(canvas.height / 4));

  if (gradientCanvas.width !== gradWidth) gradientCanvas.width = gradWidth;
  if (gradientCanvas.height !== gradHeight) gradientCanvas.height = gradHeight;

  gradImageData = gradientCtx.createImageData(gradWidth, gradHeight);
  gradData = gradImageData.data;

  xPhase = new Float32Array(gradWidth);
  yPhase = new Float32Array(gradHeight);
  uvY = new Float32Array(gradHeight);

  const boundaryLen = (config.variant === "rightVertical" || config.variant === "leftVertical") ? gradHeight : gradWidth;
  lowerE0 = new Float32Array(boundaryLen);
  topE0 = new Float32Array(boundaryLen);
  invLowerRange = new Float32Array(boundaryLen);
  invTopRange = new Float32Array(boundaryLen);

  const fourOverDpr = 4 / dpr;

  // Precompute UV lookup for corner variants
  if (config.variant === "bottomRight" || config.variant === "topLeft" || config.variant === "bottomLeft") {
    uvLookupU = new Float32Array(gradWidth * gradHeight);
    uvLookupV = new Float32Array(gradWidth * gradHeight);

    for (let y = 0; y < gradHeight; y++) {
      const logicalY = y * fourOverDpr;
      const rowOffset = y * gradWidth;

      for (let x = 0; x < gradWidth; x++) {
        const logicalX = x * fourOverDpr;
        const { u, v } = mapUV(logicalX, logicalY);
        uvLookupU[rowOffset + x] = u * TWO_PI;
        uvLookupV[rowOffset + x] = v;
      }
    }
  } else {
    uvLookupU = null;
    uvLookupV = null;
  }

  for (let x = 0; x < gradWidth; x++) {
    const logicalX = x * fourOverDpr;
    const { u } = mapUV(logicalX, extensionTop);
    xPhase[x] = u * TWO_PI;
  }

  for (let y = 0; y < gradHeight; y++) {
    const logicalY = y * fourOverDpr;
    const { u } = mapUV(extensionLeft, logicalY);
    yPhase[y] = u * TWO_PI;
  }

  for (let y = 0; y < gradHeight; y++) {
    const logicalY = y * fourOverDpr;
    const { v } = mapUV(extensionLeft, logicalY);
    uvY[y] = v;
  }
}

function updateGradientCanvas(timeSeconds) {
  if (!gradImageData || !gradData) rebuildGradientBuffers();

  const lowerVerticalMovement =
    Math.sin(timeSeconds * config.lowerVerticalSpeed) * config.lowerVerticalAmp;
  const upperVerticalMovement =
    Math.sin(timeSeconds * config.upperVerticalSpeed) * config.upperVerticalAmp;

  const tL = timeSeconds * config.lowerWaveSpeed;
  const tU = timeSeconds * config.upperWaveSpeed;

  // Corner variants: use precomputed UV lookup
  if (config.variant === "bottomRight" || config.variant === "topLeft" || config.variant === "bottomLeft") {
    const data = gradData;
    const uLookup = uvLookupU;
    const vLookup = uvLookupV;

    for (let y = 0; y < gradHeight; y++) {
      const rowOffset = y * gradWidth;
      let idx = rowOffset * 4;

      for (let x = 0; x < gradWidth; x++) {
        const lookupIdx = rowOffset + x;
        const phase = uLookup[lookupIdx];
        const v = vLookup[lookupIdx];

        const lowerB = computeWaveBoundary(phase, true, tL, tU, lowerVerticalMovement);
        const topB = computeWaveBoundary(phase, false, tL, tU, upperVerticalMovement);

        const waveHeight = topB - lowerB > 0.1 ? topB - lowerB : 0.1;
        const extendedLowerFade = config.lowerFadeSoftness + waveHeight * 0.05;
        const extendedTopFade = config.topFadeSoftness + waveHeight * 0.05;

        const lowerA = lowerB - extendedLowerFade;
        const lowerC = lowerB + extendedLowerFade;
        const topA = topB - extendedTopFade;
        const topC = topB + extendedTopFade;

        let t = (v - lowerA) / (lowerC - lowerA || 1e-6);
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        const fromBottom = t * t * (3 - 2 * t);

        let tt = (v - topA) / (topC - topA || 1e-6);
        tt = tt < 0 ? 0 : tt > 1 ? 1 : tt;
        const fromTop = 1 - tt * tt * (3 - 2 * tt);

        const alpha = (fromBottom * fromTop * config.a255) | 0;

        data[idx] = config.r;
        data[idx + 1] = config.g;
        data[idx + 2] = config.b;
        data[idx + 3] = alpha;
        idx += 4;
      }
    }

    if (!gradImageData) return;
    gradientCtx.putImageData(gradImageData, 0, 0);
    return;
  }

  // Vertical variants: boundaries per-Y
  if (config.variant === "rightVertical" || config.variant === "leftVertical") {
    const data = gradData;
    const fourOverDpr = 4 / dpr;

    for (let y = 0; y < gradHeight; y++) {
      const phase = yPhase[y];

      const lowerB = computeWaveBoundary(phase, true, tL, tU, lowerVerticalMovement);
      const topB = computeWaveBoundary(phase, false, tL, tU, upperVerticalMovement);

      const waveHeight = topB - lowerB > 0.1 ? topB - lowerB : 0.1;
      const extendedLowerFade = config.lowerFadeSoftness + waveHeight * 0.05;
      const extendedTopFade = config.topFadeSoftness + waveHeight * 0.05;

      const lowerA = lowerB - extendedLowerFade;
      const lowerC = lowerB + extendedLowerFade;
      const lowerRange = lowerC - lowerA;

      lowerE0[y] = lowerA;
      invLowerRange[y] = lowerRange !== 0 ? 1 / lowerRange : 0;

      const topA = topB - extendedTopFade;
      const topC = topB + extendedTopFade;
      const topRange = topC - topA;

      topE0[y] = topA;
      invTopRange[y] = topRange !== 0 ? 1 / topRange : 0;
    }

    for (let y = 0; y < gradHeight; y++) {
      let idx = y * gradWidth * 4;
      const lE0 = lowerE0[y];
      const invLR = invLowerRange[y];
      const tE0 = topE0[y];
      const invTR = invTopRange[y];

      for (let x = 0; x < gradWidth; x++) {
        const logicalX = x * fourOverDpr;
        const { v } = mapUV(logicalX, extensionTop);

        let t = (v - lE0) * invLR;
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        const fromBottom = t * t * (3 - 2 * t);

        let tt = (v - tE0) * invTR;
        tt = tt < 0 ? 0 : tt > 1 ? 1 : tt;
        const fromTop = 1 - tt * tt * (3 - 2 * tt);

        const alpha = (fromBottom * fromTop * config.a255) | 0;

        data[idx] = config.r;
        data[idx + 1] = config.g;
        data[idx + 2] = config.b;
        data[idx + 3] = alpha;
        idx += 4;
      }
    }

    if (!gradImageData) return;
    gradientCtx.putImageData(gradImageData, 0, 0);
    return;
  }

  // default: boundaries per-X
  const data = gradData;

  for (let x = 0; x < gradWidth; x++) {
    const phase = xPhase[x];

    const lowerB = computeWaveBoundary(phase, true, tL, tU, lowerVerticalMovement);
    const topB = computeWaveBoundary(phase, false, tL, tU, upperVerticalMovement);

    const waveHeight = topB - lowerB > 0.1 ? topB - lowerB : 0.1;
    const extendedLowerFade = config.lowerFadeSoftness + waveHeight * 0.05;
    const extendedTopFade = config.topFadeSoftness + waveHeight * 0.05;

    const lowerA = lowerB - extendedLowerFade;
    const lowerC = lowerB + extendedLowerFade;
    const lowerRange = lowerC - lowerA;

    lowerE0[x] = lowerA;
    invLowerRange[x] = lowerRange !== 0 ? 1 / lowerRange : 0;

    const topA = topB - extendedTopFade;
    const topC = topB + extendedTopFade;
    const topRange = topC - topA;

    topE0[x] = topA;
    invTopRange[x] = topRange !== 0 ? 1 / topRange : 0;
  }

  for (let y = 0; y < gradHeight; y++) {
    const v = uvY[y];
    let idx = y * gradWidth * 4;

    for (let x = 0; x < gradWidth; x++) {
      let t = (v - lowerE0[x]) * invLowerRange[x];
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const fromBottom = t * t * (3 - 2 * t);

      let tt = (v - topE0[x]) * invTopRange[x];
      tt = tt < 0 ? 0 : tt > 1 ? 1 : tt;
      const fromTop = 1 - tt * tt * (3 - 2 * tt);

      const alpha = (fromBottom * fromTop * config.a255) | 0;

      data[idx] = config.r;
      data[idx + 1] = config.g;
      data[idx + 2] = config.b;
      data[idx + 3] = alpha;
      idx += 4;
    }
  }

  if (!gradImageData) return;
  gradientCtx.putImageData(gradImageData, 0, 0);
}

function getStrokeStyle(alpha) {
  const key = Math.round(alpha * 100);
  if (!strokeStyleCache.has(key)) {
    strokeStyleCache.set(
      key,
      `rgba(${config.strokeR},${config.strokeG},${config.strokeB},${alpha})`
    );
  }
  return strokeStyleCache.get(key);
}

function drawGrid() {
  if (!vertices) return;

  const { cols, rows } = gridDimensions;
  if (cols === 0 || rows === 0) return;

  ctx.lineWidth = config.gridLineWidth;

  const mx = currentMousePos.x;
  const my = currentMousePos.y;

  const radius = config.deformRadius;
  const invRadius = radius > 0 ? 1 / radius : 0;

  const smoothstep01 = (t) => t * t * (3 - 2 * t);

  const alphaAt = (x, y) => {
    if (mx < -999 || my < -999) return config.baseAlpha;

    const dx = mx - x;
    const dy = my - y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist >= radius) return config.baseAlpha;

    let t = 1 - dist * invRadius;
    t = t < 0 ? 0 : t > 1 ? 1 : t;

    const eased = smoothstep01(t);
    const boosted = config.baseAlpha * (1 + (config.HOVER_ALPHA_BOOST - 1) * eased);

    return boosted > 1 ? 1 : boosted;
  };

  const getVertex = (col, row) => {
    if (col < 0 || col >= cols || row < 0 || row >= rows) return null;
    return vertices[row * cols + col];
  };

  // Vertical lines
  for (let col = 0; col < cols; col++) {
    let prev = null;

    for (let row = 0; row < rows; row++) {
      const v = getVertex(col, row);
      if (!v) continue;

      const px = v.x + v.dx;
      const py = v.y + v.dy;

      if (prev) {
        const midX = (prev.x + px) * 0.5;
        const midY = (prev.y + py) * 0.5;

        const aSeg = alphaAt(midX, midY);
        ctx.strokeStyle = getStrokeStyle(aSeg);

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      prev = { x: px, y: py };
    }
  }

  // Horizontal lines
  for (let row = 0; row < rows; row++) {
    let prev = null;

    for (let col = 0; col < cols; col++) {
      const v = getVertex(col, row);
      if (!v) continue;

      const px = v.x + v.dx;
      const py = v.y + v.dy;

      if (prev) {
        const midX = (prev.x + px) * 0.5;
        const midY = (prev.y + py) * 0.5;

        const aSeg = alphaAt(midX, midY);
        ctx.strokeStyle = getStrokeStyle(aSeg);

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      prev = { x: px, y: py };
    }
  }
}

// ===== Animation Loop =====
function animate(now) {
  if (!isRunning) return;

  animationId = requestAnimationFrame(animate);

  const targetFrameTime = 1000 / config.fps;
  const deltaMs = now - lastFrameTime;

  if (deltaMs < targetFrameTime - 1) return;

  lastFrameTime = now;

  const dt = now - lastTime;
  lastTime = now;

  // Smooth mouse position
  const lerpFactor = 1 - Math.pow(1 - config.mouseSmoothingBase, dt * 0.06);
  currentMousePos.x += (targetMousePos.x - currentMousePos.x) * lerpFactor;
  currentMousePos.y += (targetMousePos.y - currentMousePos.y) * lerpFactor;

  // Update physics
  updateVertexPhysics();

  // Update gradient
  const t = now * 0.001;
  updateGradientCanvas(t);

  // Draw
  ctx.clearRect(0, 0, logicalWidth, logicalHeight);
  ctx.drawImage(gradientCanvas, 0, 0, logicalWidth, logicalHeight);
  drawGrid();
}

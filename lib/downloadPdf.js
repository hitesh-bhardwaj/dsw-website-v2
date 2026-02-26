export const downloadPdf = async (url, fileName) => {
  // Always normalize to an absolute same-origin URL.
  const absoluteUrl = new URL(url, window.location.origin).href;
  const name = fileName || absoluteUrl.split("/").pop() || "download.pdf";

  // 1) Best path: rely on browser to download static asset.
  try {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = absoluteUrl;
    a.setAttribute("download", name); // same-origin works well
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    return; // success (or at least we asked nicely)
  } catch (e) {
    // continue to next fallback
    console.warn("Direct anchor download failed, trying blob:", e);
  }

  // 2) Fallback: blob download (some Safari versions don't fully support)
  try {
    const res = await fetch(absoluteUrl, { credentials: "same-origin" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = href;
    a.setAttribute("download", name);
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(href);
    return;
  } catch (e) {
    console.warn("Blob download failed, opening in new tab:", e);
  }

  // 3) Last resort (iOS/Safari etc.): open the PDF; user can save/share.
  window.open(absoluteUrl, "_blank", "noopener");
};

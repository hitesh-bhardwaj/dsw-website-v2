// /src/lib/gsapClient.js
export async function loadGSAP(withSplitText = false) {
  const gsapMod = await import("gsap");
  const stMod = await import("gsap/dist/ScrollTrigger");

  const gsap = gsapMod.default || gsapMod.gsap || gsapMod;
  const ScrollTrigger = stMod.default || stMod.ScrollTrigger;

  gsap.registerPlugin(ScrollTrigger);

  let SplitText;
  if (withSplitText) {
    const splitMod = await import("gsap/SplitText");
    SplitText = splitMod.SplitText || splitMod.default;
    gsap.registerPlugin(SplitText);
  }

  return { gsap, ScrollTrigger, SplitText };
}

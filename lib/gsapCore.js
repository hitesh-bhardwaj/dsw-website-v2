/**
 * Centralized GSAP module
 * All components should import GSAP from here instead of directly from 'gsap'
 * This ensures only one copy of GSAP in the bundle
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register all plugins once
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin, MotionPathPlugin);

// Export everything components need
export { gsap, ScrollTrigger, SplitText, ScrollToPlugin, MotionPathPlugin };
export { useGSAP } from "@gsap/react";

// Default export for convenience
export default gsap;

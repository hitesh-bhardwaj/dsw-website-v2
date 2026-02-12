"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function HeadingAnim({ children, animateOnScroll = true, delay = 0 }) {
  const containerRef = useRef(null);
  const splitRefs = useRef([]);
  const lines = useRef([]);
  const triggers = useRef([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    splitRefs.current = [];
    lines.current = [];
    triggers.current = [];

    // If the user passes a wrapper with multiple children, animate each child.
    const elements = el.hasAttribute("data-copy-wrapper")
      ? Array.from(el.children)
      : [el];

    const waitForFonts = async () => {
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch (_) {}
      }
    };

    // Helper: ensure all descendants are aria-visible
    const forceAriaVisible = (root) => {
      if (!root) return;
      const hidden = root.querySelectorAll('[aria-hidden="true"]');
      hidden.forEach((node) => node.setAttribute("aria-hidden", "false"));
    };

    let unmounted = false;

    (async () => {
      await waitForFonts();
      if (unmounted) return;

      elements.forEach((element) => {
        const split = SplitText.create(element, {
          type: "lines",
        //   mask: "lines",
          linesClass: "Headingline++",
          lineThreshold: 0.1,
        });
        splitRefs.current.push(split);

        // Fix text-indent on first split line, preserve visual layout
        const textIndent = getComputedStyle(element).textIndent;
        if (textIndent && textIndent !== "0px" && split.lines.length > 0) {
          split.lines[0].style.paddingLeft = textIndent;
          element.style.textIndent = "0";
        }

        // Make sure any wrappers created by SplitText are aria-visible
        forceAriaVisible(element);

        lines.current.push(...split.lines);
      });

      if (prefersReduced) {
        gsap.set(lines.current, { y: "0%" });
        // Double-ensure aria visibility after initial set
        elements.forEach(forceAriaVisible);
        return;
      }

      gsap.set(lines.current, {  maskPosition: "100% 100%" });
     

      const animationProps = {
        maskPosition: "0% 100%",
        stagger: 0.2,
        duration: 5.5,
        delay: 0.8,
        ease: "power3.out",
        delay,
      };

      if (animateOnScroll) {
        const tween = gsap.to(lines.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
            onEnter: () => elements.forEach(forceAriaVisible),
          },
        });
        if (tween && tween.scrollTrigger) triggers.current.push(tween.scrollTrigger);
      } else {
        gsap.to(lines.current, animationProps);
      }
    })();

    return () => {
      unmounted = true;
      splitRefs.current.forEach((split) => split && split.revert());
      splitRefs.current = [];
      lines.current = [];
      triggers.current.forEach((t) => t && t.kill());
      triggers.current = [];
    };
  }, [animateOnScroll, delay]);

  if (React.Children.count(children) === 1 && React.isValidElement(children)) {
    return React.cloneElement(children, { ref: containerRef });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}

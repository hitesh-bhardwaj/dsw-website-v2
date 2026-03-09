"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";

const PrimaryButton = ({ text, background = "", className = "", href, ...props }) => {
  const textRef = useRef(null);
  const parentOnClick = props.onClick;

  // Split text into spans (vanilla JS, no GSAP)
  useEffect(() => {
    if (!textRef.current || !text) return;

    const letters = text.split("");
    textRef.current.innerHTML = letters
      .map((letter, index) =>
        `<span class="letter" style="--index: ${index};">${letter === " " ? "&nbsp;" : letter}</span>`
      )
      .join("");
  }, [text]);

  // Native smooth scroll
  const handleClick = (e) => {
    parentOnClick?.(e);

    if (typeof href === "string" && href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <Link
      href={href || "#"}
      {...props}
      onClick={handleClick}
      prefetch={false}
      className={`primary-button relative inline-flex items-center h-[3.6vw] min-w-[10vw] px-[2.5vw] gap-3 rounded-full overflow-hidden text-white group max-sm:h-fit max-sm:py-[4.5vw] max-sm:px-[5vw] max-sm:min-w-[50vw] max-md:min-w-[25vw] max-md:h-[2vw] max-sm:gap-[4vw] max-md:gap-[2vw] max-md:py-[4vw] max-md:px-[4vw] max-md:w-fit ${className}`}
    >
      <div className="overflow-clip leading-[1.2] max-md:mx-auto -mt-0.5 max-sm:mt-0 z-1">
        <p ref={textRef} className="button-text text-22 text-white leading-[1.4] max-sm:text-[4vw]">
          {text}
        </p>
      </div>

      <span className={`absolute inset-0 group-hover:scale-95 transition-transform duration-500 rounded-full bg-[#F16B0D] ${background}`} />
    </Link>
  );
};

export default PrimaryButton;

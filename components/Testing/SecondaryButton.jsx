"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";

const SecondaryButton = ({ text, background = "", className = "", href, ...props }) => {
  const textRef = useRef(null);

  // Split text into spans
  useEffect(() => {
    if (!textRef.current || !text) return;

    const letters = text.split("");
    textRef.current.innerHTML = letters
      .map((letter, index) =>
        `<span class="letter" style="--index: ${index};">${letter === " " ? "&nbsp;" : letter}</span>`
      )
      .join("");
  }, [text]);

  return (
    <Link
      href={href || "#"}
      {...props}
      prefetch={false}
      className={`secondary-button relative inline-flex items-center h-[3.6vw] min-w-[10vw] px-[2.5vw] gap-3 rounded-full overflow-hidden group max-sm:h-fit max-sm:py-[4.5vw] max-md:h-[2vw] max-md:min-w-[25vw] max-sm:px-[5vw] max-sm:min-w-[50vw] max-sm:gap-[4vw] max-md:gap-[2vw] max-md:py-[3.7vw] max-md:px-[4vw] max-md:w-fit border border-foreground hover:border-transparent transition-all duration-500 ${className}`}
    >
      <div className="overflow-clip leading-[1.4] max-md:mx-auto -mt-0.5 max-sm:mt-0 z-1">
        <p ref={textRef} className="button-text text-22 text-foreground leading-[1.4] group-hover:text-white transition-all duration-500 max-sm:text-[4vw]">
          {text}
        </p>
      </div>

      <span className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full bg-[#F16B0D] ${background}`} />
    </Link>
  );
};

export default SecondaryButton;

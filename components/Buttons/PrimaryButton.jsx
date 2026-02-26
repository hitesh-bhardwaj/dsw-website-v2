"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Link from "next/link";
import { useRef, useState } from "react";

gsap.registerPlugin(SplitText, ScrollToPlugin);

const PrimaryButton = ({
  text,
  background = "",
  className = "",
  href, //  IMPORTANT
  ...props
}) => {
  const parentOnClick = props.onClick;
  const upperText = useRef(null);
  const [enter, setEnter] = useState(null);

  useGSAP(() => {
    const btnEl1 = new SplitText(upperText.current, {
      mask: "lines",
      type: "chars",
    });

    if (enter) {
      gsap.to(btnEl1.chars, {
        yPercent: -100,
        stagger: 0.008,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    if (enter === false) {
      gsap.from(btnEl1.chars, {
        yPercent: -100,
        stagger: 0.008,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    return () => btnEl1.revert(); // ✅ cleanup (VERY IMPORTANT)
  }, [enter]);

  // ✅ Smooth Scroll Handler
  const handleClick = (e) => {

  // ✅ call parent onClick if exists
  parentOnClick?.(e);

  // ✅ smooth scroll logic
 if (
  typeof href === "string" &&
  href.startsWith("#") &&
  href.length > 1 // ✅ ignore "#"
) {
    e.preventDefault();

    gsap.to(window, {
      duration: 1,
      ease: "power2.out",
      scrollTo: {
        y: href,
        offsetY: 80,
      },
    });
  }
};

  return (
    <Link
      href={href || "#"} 
      {...props}
      onClick={handleClick}
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
      className={` relative inline-flex items-center h-[3.6vw] min-w-[10vw] px-[2.5vw]  gap-3 rounded-full overflow-hidden text-white-200 group max-sm:h-fit max-sm:py-[4.5vw] max-sm:px-[5vw] max-sm:min-w-[50vw]  max-md:min-w-[25vw] max-md:h-[2vw]  max-sm:gap-[4vw]  max-md:gap-[2vw]  max-md:py-[4vw] max-md:px-[4vw] max-md:w-fit ${className}`}>
      <div className="overflow-clip leading-[1.2] max-md:mx-auto -mt-0.5 max-sm:mt-0 z-1">
        <p ref={upperText} className={`text-22  text-white leading-[1.4] buttonTextShadow  max-sm:text-[4vw]`}>{text}</p>
      </div>

       <span className={`absolute inset-0 group-hover:scale-95 transition-transform duration-500 rounded-full bg-[#F16B0D] ${background}`} />
    </Link>
  );
};

export default PrimaryButton;
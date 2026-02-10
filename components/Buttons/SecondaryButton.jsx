"use client"
import Link from "next/link";

const SecondaryButton = ({ text, background = "", className = "", ...props }) => {

  return (
    <Link {...props}  data-letters-delay data-split='letters' className={`buttonSplit relative inline-flex items-center h-[3.8vw] min-w-[10vw] px-[2vw] gap-3 rounded-full overflow-hidden text-white-200 group max-sm:h-fit max-sm:py-[4vw] max-sm:px-[5vw] max-sm:min-w-[65vw]  max-sm:gap-[4vw]  max-md:gap-[2vw]  max-md:py-[5vw] max-md:px-[4vw] max-md:w-fit border border-foreground hover:border-transparent transition-all duration-500  ${className}`}>
      <div className="overflow-clip leading-[1.4] max-sm:mx-auto -mt-1 max-sm:mt-0 z-1">
        <p className={`text-22 text-foreground leading-[1.4] buttonTextShadow  group-hover:text-white transition-all duration-500 `}>{text}</p>
      </div>
      <span className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full bg-linear-to-r from-primary to-secondary ${background}`} />
    </Link>
  );
};

export default SecondaryButton; 
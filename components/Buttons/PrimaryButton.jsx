"use client"
import Link from "next/link";

const PrimaryButton = ({ text, background = "", className = "", ...props }) => {

  return (
    <Link {...props}  data-letters-delay data-split='letters' className={`buttonSplit relative inline-flex items-center h-[3.8vw] min-w-[10vw] px-[2vw] gap-3 rounded-full overflow-hidden text-white-200 group max-sm:h-fit max-sm:py-[5vw] max-sm:px-[6vw] max-sm:min-w-[30vw]  max-sm:gap-[4vw]  max-md:gap-[2vw]  max-md:py-[5vw] max-md:px-[4vw] max-md:w-fit ${className}`}>
      <div className="overflow-clip leading-[1.4] -mt-1 max-sm:mt-0 z-1">
        <p className={`text-22 text-gray-200 max-md:text-[3vw] leading-[1.4] buttonTextShadow max-sm:text-[4vw] `}>{text}</p>
      </div>
      <span className={`absolute inset-0 group-hover:scale-95 transition-transform duration-500 rounded-full bg-linear-to-r from-primary to-secondary ${background}`} />
    </Link>
  );
};

export default PrimaryButton; 
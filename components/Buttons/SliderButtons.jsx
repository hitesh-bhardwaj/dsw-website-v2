import Image from "next/image";

export function PreviousButton({ onClick, isDisabled }) {
  return (
    <button
      aria-label="previous slide"
      disabled={isDisabled} onClick={onClick}
      className={`h-[4vw] w-[4vw] px-[1.2vw] group rounded-full border border-[#0205FA] hover:bg-black/10 transition-all duration-300 ease-in-out relative cursor-pointer max-sm:h-[16vw] max-sm:w-[16vw] max-md:h-[10vw] max-md:w-[10vw] max-sm:px-[5.4vw] max-md:px-[3vw] ${isDisabled ? "opacity-50 pointer-events-none hover:scale-100 hover:border-stone-700" : ""}`}
    >   
      <Image
        src="/assets/icons/arrow-left.svg"
        width={20}
        height={20}
        className="h-full w-full relative z-10"
        alt="arrow-left"
      />
    </button>
  );
}

export function NextButton({ onClick, isDisabled }) {
  return (
    <button
      aria-label="next slide"
      disabled={isDisabled}
      onClick={onClick}
      className={`h-[4vw] w-[4vw] px-[1.2vw] group border border-[#0205FA] hover:bg-black/10 transition-all duration-300 ease-in-out rounded-full relative cursor-pointer max-sm:h-[16vw] max-sm:w-[16vw] max-md:h-[10vw] max-md:w-[10vw] max-sm:px-[5.4vw] max-md:px-[3vw]  ${isDisabled ? "opacity-50 pointer-events-none hover:scale-100 hover:border-stone-700" : ""}`}
    >
      
      <Image
        src="/assets/icons/arrow-right.svg"
        width={20}
        height={20}
        className="h-full w-full relative z-10"
        alt="Next"
      />
    </button>
  );
}

import { CircleBg } from "../Svg/Lines/DottedCircle";
import { Arrow } from "../Svg/AboutUs/Arrow";
import HeadingAnim from "../Animations/HeadingAnim";

export default function Infrastructure() {
  return (
    <div>
      {/* Desktop Layout */}
      <div className="relative w-full h-[80vw] mx-auto my-0 py-[5%] flex items-start justify-start max-sm:hidden">
        <div className="w-full flex items-start justify-center">
          <HeadingAnim>

          <h2 className="text-44 w-fit fadeup">
            The issue wasn't talent or intent. {` `}
            <span className="font-medium">
It was an infrastructure.
            </span>
          </h2>
          </HeadingAnim>
        </div>

        {/* Center Circle */}
        <div className="absolute left-1/2 top-1/2 fadeup -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-[23vw] h-[23vw] flex items-center justify-center">
            <CircleBg />
            <div className="absolute inset-0 flex items-center justify-center text-center text-30 w-[80%] mx-auto z-50 text-black">
              Enterprises were trying
              to run production AI using
            </div>
          </div>
        </div>

        {/* Top Box */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[16vw] z-20">
          <div className="bg-white border text-30 border-primary-blue px-[2vw] w-[20vw] h-[10vw] flex items-center justify-center rounded-[1vw] leading-[1.2] text-black text-center">
            Disconnected tools and vendors
          </div>
        </div>
        {/* Top Line */}
        <svg className="absolute left-1/2 -translate-x-1/2 top-[22.5vw] z-0" width="2vw" height="6vw" viewBox="0 0 2 120" fill="none">
          <line x1="1" y1="0" x2="1" y2="120" stroke="#1727FF" strokeWidth="2"/>
        </svg>

        {/* Right Box */}
        <div className="absolute right-[14vw] top-1/2 -translate-y-1/2 z-20">
          <div className="bg-white border text-30 border-primary-blue px-[2vw] w-[20vw] h-[10vw] flex items-center justify-center rounded-[1vw] leading-[1.2] text-black text-center">
            Governance as documentation
          </div>
        </div>
        {/* Right Line */}
        <svg className="absolute right-[32.5vw] top-1/2 -translate-y-1/2 z-0" width="6vw" height="2vw" viewBox="0 0 120 2" fill="none">
          <line x1="0" y1="1" x2="120" y2="1" stroke="#1727FF" strokeWidth="2"/>
        </svg>

        {/* Bottom Box */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[15vw] z-20">
          <div className="bg-white border text-30 border-primary-blue px-[2vw] w-[20vw] h-[10vw] flex items-center justify-center rounded-[1vw] leading-[1.2] text-black text-center">
            Post-deployment controls
          </div>
        </div>
        {/* Bottom Line */}
        <svg className="absolute left-1/2 -translate-x-1/2 bottom-[22.5vw] z-0" width="2vw" height="6vw" viewBox="0 0 2 120" fill="none">
          <line x1="1" y1="0" x2="1" y2="120" stroke="#1727FF" strokeWidth="2"/>
        </svg>

        {/* Left Box */}
        <div className="absolute left-[15vw] top-1/2 -translate-y-1/2 z-20">
          <div className="bg-white border text-30 border-primary-blue px-[2vw] w-[20vw] h-[10vw] flex items-center justify-center rounded-[1vw] leading-[1.2] text-black text-center">
            Brittle integrations that couldn't scale
          </div>
        </div>
        {/* Left Line */}
        <svg className="absolute left-[32.5vw] top-1/2 -translate-y-1/2 z-0" width="6vw" height="2vw" viewBox="0 0 120 2" fill="none">
          <line x1="120" y1="1" x2="0" y2="1" stroke="#1727FF" strokeWidth="2"/>
        </svg>
      </div>

      {/* Mobile Layout */}
      <div className="hidden max-sm:flex max-sm:flex-col w-[90%] mx-auto max-sm:items-center max-sm:w-full max-sm:px-[7vw] max-sm:py-10">
        {/* Heading */}
        <HeadingAnim>

        <h2 className="text-44 font-normal text-center leading-[1.3] mb-10">
          The issue wasn't talent or intent.{` `}
          <span className="font-medium">It was an infrastructure.</span>
        </h2>
        </HeadingAnim>

        {/* Center label */}
        
        

        {/* Vertical flow */}
        <div className="flex flex-col items-center w-full gap-0">
          {[
            "Enterprises were trying to run production AI using:",
            "Disconnected tools and vendors",
            "Governance as documentation",
            "Post-deployment controls",
            "Brittle integrations that couldn't scale",
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center w-full">
            
              <div className="bg-white fadeup rounded-[3vw] px-5 py-4 w-[80vw] text-center text-30 leading-[1.4] text-black">
                {item}
              </div>
              {i < 4 && (
                <div className="rotate-90 my-[6vw] fadeup">
                <Arrow  className=''/>
                    </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom paragraph — shared, visible on both */}
      <div>
        <p className="text-30 w-[80%] mx-auto text-center fadeup  max-sm:w-[90%] max-sm:mt-10">
          Over time, it became clear to us that AI had crossed the threshold from "software project" to enterprise system. That's when the journey shifted. We stopped thinking like a platform team.
          We started thinking like operating system builders. And that is how DSW evolved into the Enterprise AI Operating System.
        </p>
      </div>
    </div>
  );
}
"use client";
import Copy from "../Animations/Copy";
import HeadingAnim from "../Animations/HeadingAnim";
import Image from "next/image";

const WhoBuiltFor = () => {
  const audiences = [
    {
      id: 1,
      text: "CIOs, CTOs, CDOs, and COOs",
      position: "top-left",
    },
    {
      id: 2,
      text: "Enterprise architects and platform teams",
      position: "top-right",
    },
    {
      id: 3,
      text: "AI, data, and ML engineering leaders",
      position: "bottom-left",
    },
    {
      id: 4,
      text: "Risk, compliance, and security stakeholders",
      position: "bottom-right",
    },
  ];

  return (
    <section className="relative w-full py-[7%] bg-background max-sm:py-[15%] overflow-hidden">
      {/* Heading */}
      <div className="text-center px-[5vw] mb-[5vw] max-sm:mb-[10vw]">
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] ">
            Who This Is Built For
          </h2>
        </HeadingAnim>
      </div>

      {/* Desktop Layout */}
      <div className="relative w-full max-w-[75vw] mx-auto h-[25vw] max-sm:hidden fadeup">
        {/* Center Circle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[11vw] h-[11vw] rounded-full border border-primary-blue bg-background flex items-center justify-center z-10">
          <span className="text-30 text-foreground font-medium">Built For</span>
        </div>

        {/* Top Left Card */}
        <div className="absolute top-0 -left-[1.1vw] gap-1.5 flex items-center">
          <div className="flex items-center border border-primary-blue bg-background h-[5vw] px-[1vw]">
            <p className="text-24 text-foreground whitespace-nowrap">
              CIOs, CTOs, CDOs, and COOs
            </p>
          </div>
          <div className="w-[0.9vw] h-[5vw] border border-primary-blue bg-background" />
        </div>

        {/* Top Left Connector */}
        <div className="absolute top-[2.6vw] left-[19.5vw] w-[14.5vw] h-[5.5vw]">
          <Image
            src="/assets/icons/aios/connector-arm.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Top Right Card */}
        <div className="absolute top-0 right-[0.2vw] gap-1.5 flex items-center">
          <div className="w-[0.9vw] h-[5vw] border border-primary-blue bg-background" />
          <div className="flex items-center border border-primary-blue bg-background h-[5vw]  w-[18vw] px-[1vw]">
            <p className="text-24 text-foreground">
              Enterprise architects and<br />platform teams
            </p>
          </div>
        </div>

        {/* Top Right Connector */}
        <div className="absolute top-[2.6vw] right-[19.5vw] w-[14.5vw] h-[5.5vw] -scale-x-100">
          <Image
            src="/assets/icons/aios/connector-arm.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Bottom Left Card */}
        <div className="absolute bottom-0 gap-1.5 left-0 flex items-center">
          <div className="flex items-center border border-primary-blue bg-background h-[5vw]  w-[18vw] px-[1vw]">
            <p className="text-24 text-foreground">
              AI, data, and ML<br />engineering leaders
            </p>
          </div>
          <div className="w-[0.9vw] h-[5vw] border border-primary-blue bg-background" />
        </div>

        {/* Bottom Left Connector */}
        <div className="absolute bottom-[2.6vw] left-[19.3vw] w-[14.5vw] h-[5.5vw] -scale-y-100">
          <Image
            src="/assets/icons/aios/connector-arm.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Bottom Right Card */}
        <div className="absolute bottom-0 gap-1.5 right-0 flex items-center">
          <div className="w-[0.9vw] h-[5vw] border border-primary-blue bg-background" />
          <div className="flex items-center border border-primary-blue bg-background h-[5vw] w-[18vw] px-[1vw]">
            <p className="text-24 text-foreground">
              Risk, compliance, and<br />security stakeholders
            </p>
          </div>
        </div>

        {/* Bottom Right Connector */}
        <div className="absolute bottom-[2.6vw] right-[19.5vw] w-[14.5vw] h-[5.5vw] scale-[-1]">
          <Image
            src="/assets/icons/aios/connector-arm.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="hidden max-sm:flex flex-col items-center gap-[5vw] px-[5vw]">
        {/* Center Circle */}
        <div className="w-[35vw] h-[35vw] rounded-full border border-primary-blue bg-background flex items-center justify-center">
          <span className="text-24 text-foreground font-heading">Built For</span>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-[4vw] w-full">
          {audiences.map((audience) => (
            <div
              key={audience.id}
              className="flex items-center border border-primary-blue bg-background p-[4vw]"
            >
              <p className="text-18 text-foreground">{audience.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Text */}
      <div className="text-center px-[5vw] mt-[5vw] max-sm:mt-[10vw]">
        <Copy>
        <p className="text-30 text-foreground leading-[1.4]">
          For organizations where AI must be trusted, governed, continuously operational,
          <br className="max-sm:hidden" />
          <span className="max-sm:inline"> </span>
          and aligned with enterprise risk frameworks.
        </p>
        </Copy>
      </div>
    </section>
  );
};

export default WhoBuiltFor;

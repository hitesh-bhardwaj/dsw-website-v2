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
      <div className="text-center px-[5vw] mb-[5vw] max-sm:mb-[20vw]">
        <HeadingAnim>
          <h2 className="text-76 text-[#0A1B4B] ">Who This Is Built For</h2>
        </HeadingAnim>
      </div>

      {/* Desktop Layout */}
      <div className="relative w-full max-w-[75vw] mx-auto h-[25vw] max-md:hidden fadeup">
        {/* Center Circle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[11vw] h-[11vw] rounded-full border border-primary-blue bg-background flex items-center justify-center z-10">
          <span className="text-30 text-foreground font-medium">Built For</span>
        </div>

        {/* Top Left Card */}
        <div className="absolute top-0 -left-[0.9vw] gap-1.5 flex items-center">
          <div className="flex items-center border border-primary-blue bg-background h-[5vw] px-[1vw]">
            <p className="text-24 text-foreground whitespace-nowrap">
              CIOs, CTOs, CDOs, and COOs
            </p>
          </div>
          <div className="w-[0.9vw] h-[5vw] border border-primary-blue bg-background" />
        </div>

        {/* Top Left Connector */}
        <div className="absolute top-[2.6vw] left-[19.7vw] w-[14.5vw] h-[5.5vw]">
          <Image
            src="/assets/icons/aios/connector-arm.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Top Right Card */}
        <div className="absolute top-0 right-[0.5vw] gap-1.5 flex items-center">
          <div className="w-[0.9vw] h-[5vw] border border-primary-blue bg-background" />
          <div className="flex items-center border border-primary-blue bg-background h-[5vw]  w-[18vw] px-[1vw]">
            <p className="text-24 text-foreground">
              Enterprise architects and
              <br />
              platform teams
            </p>
          </div>
        </div>

        {/* Top Right Connector */}
        <div className="absolute top-[2.6vw] right-[19.8vw] w-[14.5vw] h-[5.5vw] -scale-x-100">
          <Image
            src="/assets/icons/aios/connector-arm.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Bottom Left Card */}
        <div className="absolute bottom-0 gap-1.5 left-[0.5vw] flex items-center">
          <div className="flex items-center border border-primary-blue bg-background h-[5vw]  w-[18vw] px-[1vw]">
            <p className="text-24 text-foreground">
              AI, data, and ML
              <br />
              engineering leaders
            </p>
          </div>
          <div className="w-[0.9vw] h-[5vw] border border-primary-blue bg-background" />
        </div>

        {/* Bottom Left Connector */}
        <div className="absolute bottom-[2.6vw] left-[19.8vw] w-[14.5vw] h-[5.5vw] -scale-y-100">
          <Image
            src="/assets/icons/aios/connector-arm.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Bottom Right Card */}
        <div className="absolute bottom-0 gap-1.5 right-[0.5vw] flex items-center">
          <div className="w-[0.9vw] h-[5vw] border border-primary-blue bg-background" />
          <div className="flex items-center border border-primary-blue bg-background h-[5vw] w-[18vw] px-[1vw]">
            <p className="text-24 text-foreground">
              Risk, compliance, and
              <br />
              security stakeholders
            </p>
          </div>
        </div>

        {/* Bottom Right Connector */}
        <div className="absolute bottom-[2.6vw] right-[19.8vw] w-[14.5vw] h-[5.5vw] scale-[-1]">
          <Image
            src="/assets/icons/aios/connector-arm.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="hidden max-md:flex flex-col items-center px-[7vw] relative h-[110vw]">
        {/* <Image src={"/assets/aios/bult-for-img-mob.png"} loading="lazy" alt="built-for-mob" quality={100} className="w-full h-full" width={400} height={700}/> */}
        <div className="size-[30vw] rounded-full border border-primary-blue absolute left-0 top-1/2 -translate-y-1/2 left-[5%] flex justify-center items-center max-sm:text-30 font-medium max-md:text-[4vw]">
          Bulit For
        </div>
        <div className="w-full flex max-sm:h-[18vw] max-md:h-[14vw] gap-[1.5vw] absolute left-[40%] top-[3%]">
          <div className="w-[3vw] h-full border border-primary-blue" />
          <div className="w-[50vw] h-full border border-primary-blue p-[3vw] max-md:text-30">
            CIOs, CTOs, CDOs, and COOs
          </div>
        </div>
        <div className="w-full flex max-sm:h-[18vw] max-md:h-[14vw] gap-[1.5vw] absolute left-[40%] top-[27%]">
          <div className="w-[3vw] h-full border border-primary-blue" />
          <div className="w-[50vw] h-full border border-primary-blue p-[3vw] max-md:text-30">
            Enterprise architects and platform teams
          </div>
        </div>
        <div className="w-full flex max-sm:h-[18vw] max-md:h-[14vw] gap-[1.5vw] absolute left-[40%] top-[58%]">
          <div className="w-[3vw] h-full border border-primary-blue" />
          <div className="w-[50vw] h-full border border-primary-blue p-[3vw] max-md:text-30">
            AI, data, and ML engineering leaders
          </div>
        </div>
        <div className="w-full flex max-sm:h-[18vw] max-md:h-[14vw] gap-[1.5vw] absolute left-[40%] top-[83%]">
          <div className="w-[3vw] h-full border border-primary-blue" />
          <div className="w-[50vw] h-full border border-primary-blue p-[3vw] max-md:text-30">
            Risk, compliance, and security stakeholders
          </div>
        </div>
        <div className="w-[17vw] h-auto absolute left-[23%] top-[10.5%]">
          <Image src={"/assets/icons/aios/mob-line-1.svg"} alt="mob-line" className="w-full h-full" width={400} height={300}/>
        </div>
        <div className="w-[17vw] h-auto absolute left-[23%] top-[63%] -scale-y-100">
          <Image src={"/assets/icons/aios/mob-line-1.svg"} alt="mob-line" className="w-full h-full" width={400} height={300}/>
        </div>
        <div className="w-[9vw] h-auto absolute left-[31.5%] top-[34.5%]">
          <Image src={"/assets/icons/aios/mob-line-2.svg"} alt="mob-line" className="w-full h-full" width={400} height={300}/>
        </div>
        <div className="w-[9vw] h-auto absolute left-[31.5%] top-[58.5%] -scale-y-100">
          <Image src={"/assets/icons/aios/mob-line-2.svg"} alt="mob-line" className="w-full h-full" width={400} height={300}/>
        </div>
      </div>

      {/* Footer Text */}
      <div className="text-center px-[5vw] mt-[5vw] max-sm:mt-[20vw]">
        <Copy>
          <p className="text-30 text-foreground leading-[1.4]">
            For organizations where AI must be trusted, governed, continuously
            operational,
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

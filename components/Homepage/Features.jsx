import Image from "next/image";
import React from "react";

const Features = () => {
  return (
    <section className="w-full h-fit relative space-y-[5vw]" id="features">
      {FEATURES.map((feature) => (
        <div
          key={feature.id}
          className={`
            w-full h-fit sticky px-[5vw] py-[3vw] bg-white
            ${feature.hasTopBorder ? "border-t border-black/30" : ""}
            ${feature.hasBottomBorder ? "border-b border-black/30" : ""}
            ${feature.extraPaddingBottom ? "pb-[10vw]" : ""}
          `}
          style={{ top: feature.stickyTop }}
        >
          <h3 className="text-56 ">
            Create Your Own AI Native Infrastructure
          </h3>

          <div className="w-full flex justify-between mt-[7vw]">
            {/* Left Content */}
            <div className="w-[45%] h-full flex flex-col gap-[5vw] text-30">
              <p>
                Build, deploy, and operate unlimited AI and GenAI use cases
                without per-model, per-agent, or per-workflow pricing.
              </p>

              <ul className="font-medium space-y-[0.5vw]">
                <li>One subscription.</li>
                <li>Predictable spend.</li>
                <li>No compounding AI costs as usage scales.</li>
              </ul>
            </div>

            {/* Right Image */}
            <div className="w-[20vw] rounded-[2vw] h-full">
              <Image
                src="/assets/homepage/features-img-1.png"
                alt="Feature visual"
                width={300}
                height={300}
                className="w-full h-full object-contain"
                priority={feature.id === 1}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;


const FEATURES = [
  {
    id: 1,
    stickyTop: "0%",
    hasTopBorder: false,
    hasBottomBorder: false,
  },
  {
    id: 2,
    stickyTop: "15%",
    hasTopBorder: true,
    hasBottomBorder: false,
  },
  {
    id: 3,
    stickyTop: "30%",
    hasTopBorder: true,
    hasBottomBorder: true,
    extraPaddingBottom: true,
  },
];

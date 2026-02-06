import React from "react";
import { CircleBg } from "../Svg/Lines/DottedCircle";
import { Circle } from "../Svg/Lines/Circle";
import { Insurance } from "../Svg/Insurance";

const HowAgenticWorks = () => {
  return (
    <section className="relative w-full  py-[6vw]">
      <CircleBg className="absolute inset-0 w-[60vw] h-auto m-auto" />

      <CircleBg className="absolute inset-0 w-[45vw] h-auto m-auto" />

      {/* LEFT TEXT */}
      <div className="absolute left-[6vw] top-2 max-w-[20vw]">
        <h3 className="text-[1.6vw] font-semibold text-primary-blue">Connect</h3>
        <p className="text-[1vw] mt-[0.6vw]">
          Ingest enterprise data through managed connectors and DataOps
          pipelines.
        </p>
      </div>

      <div className="absolute left-[6vw] bottom-[8vw] max-w-[20vw]">
        <h3 className="text-[1.6vw] font-semibold">Operate</h3>
        <p className="text-[1vw] mt-[0.6vw]">
          Enforce runtime policies, monitor telemetry, and maintain immutable
          audit trails.
        </p>
      </div>

      {/* RIGHT TEXT */}
      <div className="absolute right-[6vw] top-[8vw] max-w-[20vw]">
        <h3 className="text-[1.6vw] font-semibold">Build</h3>
        <p className="text-[1vw] mt-[0.6vw]">
          Author and test agents in AgenticAI Studio.
        </p>
      </div>

      <div className="absolute right-[6vw] bottom-[8vw] max-w-[20vw]">
        <h3 className="text-[1.6vw] font-semibold">Orchestrate</h3>
        <p className="text-[1vw] mt-[0.6vw]">
          Compose agents, models and enterprise logic into workflows.
        </p>
      </div>

      {/* CENTER DIAGRAM */}
      <div className="relative mx-auto w-[42vw] h-[42vw]">
        {/* center text */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <h2 className="text-[3.2vw] f leading-[1.1]">
            How AgenticAI <br /> runtime works
          </h2>
        </div>

        <div></div>

        <div className="w-full h-full relative">
          {/* ICON 1 */}
          <div className="absolute top-22 left-15 z-2 rounded-full border bg-white border-primary-blue p-[0.25vw] flex items-center justify-center">
            <div className="border-2 border-primary-blue p-[1.5vw] rounded-full bg-card-bg">
              <Insurance className="w-[4vw] h-[4vw]" />
            </div>
          </div>

          {/* ICON 2 */}
          <div className="absolute top-22 right-15 z-2 rounded-full border bg-white border-primary-blue p-[0.25vw] flex items-center justify-center">
            <div className="border border-primary-blue p-[1.5vw] rounded-full bg-card-bg">
              <Insurance className="w-[4vw] h-[4vw]" />
            </div>
          </div>

          {/* ICON 3 */}
          <div className="absolute bottom-22 left-15 z-2 rounded-full border bg-white border-primary-blue p-[0.25vw] flex items-center justify-center">
            <div className="border border-primary-blue p-[1.5vw] rounded-full bg-card-bg">
              <Insurance className="w-[4vw] h-[4vw]" />
            </div>
          </div>

          {/* ICON 4 */}
          <div className="absolute bottom-22 right-15 z-2 rounded-full border bg-white border-primary-blue p-[0.25vw] flex items-center justify-center">
            <div className="border border-primary-blue p-[1.5vw] rounded-full bg-card-bg">
              <Insurance className="w-[4vw] h-[4vw]" />
            </div>
          </div>

          {/* mid circle */}
          <Circle className="absolute inset-0 w-[35vw] h-auto m-auto z-0" />
        </div>
      </div>
    </section>
  );
};

export default HowAgenticWorks;

import React from "react";
import { CircleBg } from "../Svg/Lines/DottedCircle";
import { Circle } from "../Svg/Lines/Circle";
import { Insurance } from "../Svg/Insurance";

const HowAgenticWorks = () => {
  return (
    <section className="relative w-full  py-[10%]">
      <CircleBg className="absolute inset-0 w-[60vw] h-auto m-auto" />

      <CircleBg className="absolute inset-0 w-[45vw] h-auto m-auto" />

      {/* LEFT TEXT */}
      <div className="absolute left-25 top-2 max-w-[25vw] space-y-[0.6vw]">
        <h3 className="text-[2.5vw]  ">• Connect</h3>
        <p className="text-[1.2vw] ">
          Ingest enterprise data through managed connectors and DataOps
          pipelines.
        </p>
      </div>

      <div className="absolute left-25 bottom-40 max-w-[25vw] space-y-[0.6vw]">
        <h3 className="text-[2.5vw] "> • Operate</h3>
        <p className="text-[1.2vw] mt-[0.6vw]">
          Enforce runtime policies, monitor telemetry, and maintain immutable audit trails and reports.
        </p>
      </div>

      {/* RIGHT TEXT */}
      <div className="absolute right-30 top-2 max-w-[25vw] space-y-[0.6vw]">
        <h3 className="text-[2.5vw]">• Build</h3>
        <p className="text-[1.2vw] ">
         Author and test agents in AgenticAI Studio (fine-tune, simulate, validate).
        </p>
      </div>

      <div className="absolute right-30 bottom-40 space-y-[0.6vw] max-w-[20vw]">
        <h3 className="text-[2.5vw] ">• Orchestrate</h3>
        <p className="text-[1.2vw] ">
          Compose agents, models and enterprise logic into auditable workflows using Workflow Builder.
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

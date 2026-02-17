import React from "react";
import Copy from "../Animations/Copy";
import HeadingAnim from "../Animations/HeadingAnim";
import { WorldMap } from "../ui/world-map";


const OfficeLocations = () => {
  return (
    <section className="relative h-full px-[5vw] py-[7%] space-y-[8vw]  max-md:px-[4vw]! max-md:space-y-[7vw]">
        <HeadingAnim>
      <h2 className="text-76 text-[#0A1B4B]  max-md:text-left max-md:px-[3vw] text-center headingAnim">
        Our Office Locations
      </h2>
      </HeadingAnim>
      <div className="w-full pt-[8vw]">
<WorldMap/>
      </div>

      <div className="absolute max-md:static max-md:px-[3vw] left-[5%] bottom-[25%] w-[20%] space-y-[0.5vw] max-md:w-[80%]  max-md:space-y-[3vw] text-right max-sm:text-left">
        <Copy>
          <p className="text-30 text-foreground"> USA </p>
        </Copy>
        <Copy>
          <p className="text-24 text-foreground">
            Data Science Wizards Limited
          </p>
        </Copy>
      </div>

      <div className="absolute max-md:static max-md:px-[3vw] left-[50%] top-[25%] w-[30%] space-y-[0.5vw] max-md:w-[80%]  max-md:space-y-[3vw]">
        <Copy>
          <p className="text-30 text-foreground"> Ireland </p>
        </Copy>
        <Copy>
          <p className="text-24 text-foreground">
            Data Science Wizards Limited, Business Centre, NCI, Mayor Street,
            IFSC, Dublin 1, D01 K6W2
          </p>
        </Copy>
      </div>

      <div className="absolute max-md:static max-md:px-[3vw] right-[10%] top-[72%] w-[28%] space-y-[0.5vw] max-md:w-[90%]  max-md:space-y-[3vw]">
        <Copy>
          <p className="text-30 text-foreground"> India</p>
        </Copy>
        <Copy>
          <p className="text-24 text-foreground">
            604-605, 6th Floor, B Wing, Lodha Supremus II,Road No. 22, Wagle
            Industrial Estate, Thane West - 400604
          </p>
        </Copy>
      </div>
    </section>
  );
};

export default OfficeLocations;

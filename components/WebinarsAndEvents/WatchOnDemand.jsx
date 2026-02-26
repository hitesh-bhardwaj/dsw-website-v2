import React from "react";
import Copy from "../Animations/Copy";
import HeadingAnim from "../Animations/HeadingAnim";
import VideoListing from "../ProductVideos/VideoListing";

const WatchOnDemand = () => {
  return (
    <section className=" w-screen py-[3%] space-y-[8vw] max-sm:space-y-[12vw] max-sm:py-[15%] px-[5vw] max-md:px-[6vw] max-sm:px-[7vw]  max-sm:mt-0 overflow-hidden" id="workshops">
      <div className=" max-sm:space-y-[5vw] w-full flex flex-col items-center justify-center">
        <div className="w-full space-y-[1.5vw] max-md:space-y-[5vw] max-sm:space-y-[7vw]  text-center max-md:w-full max-md:px-[7vw]">
          <HeadingAnim>

          <h2 className="text-76 text-[#0A1B4B] headingAnim  max-sm:w-full leading-[1.2] ">
            Missed a Session? Watch On - Demand
          </h2>
          </HeadingAnim>
          <Copy>
            <p className="text-30 px-[2vw] w-[60%] max-sm:w-full max-md:w-[90%] mx-auto">
              Explore our library of recorded webinars and event highlights.
              Learn at your own pace and share with your team.
            </p>
          </Copy>
        </div>
        <VideoListing/>
      </div>
    </section>
  );
};

export default WatchOnDemand;

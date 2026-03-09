"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import HeadingAnim from "../Animations/HeadingAnim";

const POINTS = [
  {
    id: "01",
    title: "Live Expert Panels",
    text: "Hear from AI leaders, CTOs, and compliance specialists on real-world strategies and deployment journeys.",
    width: "w-full",
  },
  {
    id: "02",
    title: "Industry-Specific Sessions",
    text: "Explore tailored events focused on insurance, banking, healthcare, and other regulated industries.",
    width: "w-full",
  },
  {
    id: "03",
    title: "Hands-On Webinars",
    text: "Follow guided walkthroughs of AI and GenAI use cases using the UnifyAI platform—with no-code to full-code options.",
    width: "w-full",
  },
  {
    id: "04",
    title: "Product Showcases",
    text: "Discover new features, tools, and blueprints to help you accelerate AI to production.",
    width: "w-[60%] max-sm:w-full",
  },
  {
    id: "05",
    title: "Community & Networking",
    text: "Connect with other enterprise leaders solving similar challenges with AI.",
    width: "w-[60%] max-sm:w-full",
  },
];

export default function Expect() {

  
  return (
    <section className="w-screen  relative z-10 px-[7vw]  max-sm:px-[7vw] max-md:px-[6vw] py-[7%] pt-[10%] space-y-[8vw] max-sm:space-y-[12vw] max-sm:py-[25%] max-md:py-[10%]" id="expect">
      <div className="w-full flex flex-col items-center justify-center  gap-y-[7vw] max-sm:gap-y-[15vw] max-md:gap-y-[7vw] max-md:mt-0">
        <div className="text-center">

            <HeadingAnim>

          
          <h2 className="text-76 text-[#0A1B4B]  max-sm:text-center">
            What to Expect
          </h2>
            </HeadingAnim>
          
        </div>

        <div className="flex  flex-wrap justify-start gap-y-[5vw] gap-x-[10vw] max-md:w-full max-sm:gap-[15vw] max-md:justify-start max-md:items-center max-md:gap-[7vw]">
          {POINTS.map(({ id, text,title}) => (
            <div
              key={id}
              className=" flex flex-col gap-[1.2vw] items-start about-item w-[44%] fadeup max-sm:w-full max-sm:items-center max-md:items-start max-sm:gap-y-[5vw] max-md:gap-[5vw]"
            >
              <div className="w-[15%] relative max-md:w-fit">
                <div className="relative w-[5vw] h-[5vw] border border-white-200 rounded-full flex items-center justify-center max-sm:w-[18vw] max-sm:h-[18vw] max-md:h-[10vw] max-md:w-[10vw]">
                  <p className="about-id  text-40 font-heading relative z-1  ">
                    {id}
                  </p>
                </div>
              </div>
              <div className="space-y-[0.7vw] max-sm:space-y-[5vw]">
                <p className="text-44 font-heading  max-sm:text-center">
                  {title}
                </p>

                <p className="text-24 max-sm:text-center">{text}</p>
              </div>
               <span className="lineDraw w-full h-[1px] bg-black opacity-60   hidden max-sm:block mt-[5vw]"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

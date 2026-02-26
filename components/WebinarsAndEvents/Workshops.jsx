import React from "react";
import Copy from "../Animations/Copy";
import Image from "next/image";
import LinkButton from "../Buttons/LinkButton";
import { Heading } from "lucide-react";
import HeadingAnim from "../Animations/HeadingAnim";

const secondaryAnnouncements = [
  {
    image: "/assets/resources/product-videos/inside-unify.png",
    alt: "inside-unify",
    title: "AI for Insurance Workshop",
    date: "July 18, 2025",
    href: "/ai-insurance-workshops",
  },
  {
    image: "/assets/resources/product-videos/genai-production.png",
    alt: "gen-ai-production",
    title: "AI & GenAI Masterclass",
    date: "July 18, 2025",
    href: "/dsw-workshop-deeptech-ai-genai-hands-on-masterclass",
  },
];

const Workshops = () => {
  return (
    <section
      className="py-[7%] space-y-[8vw] max-sm:space-y-[12vw] max-sm:py-[15%] max-md:px-[6vw] max-sm:px-[7vw] px-[5vw]"
      id="workshops"
    >
      <div className="space-y-[5vw] max-sm:space-y-[10vw]">
        <div className="w-full space-y-[1.5vw] max-sm:space-y-[7vw] max-md:space-y-[2vw]">
          <HeadingAnim>
            <h2 className="text-76 text-[#0A1B4B] headingAnim  max-sm:w-full text-center leading-[1.2]">
              AI workshops
            </h2>
          </HeadingAnim>
          <Copy>
            <p className="text-30 text-center max-md:w-[80%] max-sm:w-full mx-auto">
              Watch demo walkthroughs, platform explainers, and customer success
              stories.
            </p>
          </Copy>
        </div>

        <div className="w-full flex justify-between  pt-[0.8vw] max-sm:flex-col max-md:gap-[3vw] max-sm:gap-[13vw]">
          {secondaryAnnouncements.map((item, index) => (
            <div
              key={index}
              className="w-[47.5%] h-fit flex flex-col gap-[1.3vw] fadeup max-sm:w-full max-md:w-[48.5%] max-md:gap-[3vw] max-sm:gap-[7vw] "
            >
              <div className="w-full h-[24vw] rounded-[1.8vw] overflow-hidden group max-md:h-[30vw] max-sm:h-[27vh] max-sm:rounded-[4.5vw] max-md:rounded-[2vw] max-md:border max-md:border-white/20">
                <Image
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-[1.1] duration-700 ease-in-out "
                  width={400}
                  height={300}
                />
              </div>
              <div className="w-full flex justify-between max-md:flex-col max-md:items-start max-sm:space-y-[3vw] items-end">
                <div className="space-y-[1vw] max-sm:space-y-[3vw]">
                  <h3 className="text-30 font-medium max-sm:text-[5.5vw]">
                    {item.title}
                  </h3>

                  <p className="text-24 max-md:text-[2.5vw] max-sm:text-[4vw]">
                    {item.date}
                  </p>
                </div>

                <LinkButton text={"Learn More"} href={item.href} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workshops;

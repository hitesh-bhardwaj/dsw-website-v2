"use client";
import React from "react";
import Image from "next/image";
import Copy from "../Animations/Copy";
import PrimaryButton from "../Buttons/PrimaryButton";
import LinkButton from "../Buttons/LinkButton";
import HeadingAnim from "../Animations/HeadingAnim";

const mainAnnouncement = {
  image: "/assets/resources/dsw-launches-new.png",
  alt: "dsw-launches",
  title: "Deploying GenAI for Claims Automation",
  description:
    "Data Science Wizards (DSW) has unveiled a groundbreaking capability that allows insurance providers to deploy Generative AI solutions in just 2–4 hours, transforming traditional workflows such as claims processing, fraud detection, customer support, and document intelligence.",
  format: "Live Demo + Q&A",
  date: "July 4, 2025",
  author: "Jane Smith",
  href: "#",
};

const secondaryAnnouncements = [
  {
    image: "/assets/resources/unifyai-achieves.png",
    alt: "unifyai-achieves",
    title: "Compliance-First AI: SOC 2, ISO & Beyond",
    type: "Expert Panel",
    date: "July 18, 2025",
    href: "#",
  },
  {
    image: "/assets/resources/unifyai-achieves.png",
    alt: "unifyai-achieves",
    title: "AI in Insurance: Roadmap to Production in 30 Days",
    type: "Workshop",
    date: "August 2, 2025",
    href: "#",
  },
  {
    image: "/assets/resources/unifyai-achieves.png",
    alt: "unifyai-achieves",
    title: "UnifyAI Showcase: What's New This Quarter",
    type: "Product Walkthrough",
    date: "August 16, 2025",
    href: "#",
  },
];

const UpcomingWebinars = () => {
  return (
    <section className="py-[7%] space-y-[8vw] max-sm:space-y-[12vw] max-sm:py-0 px-[5vw] max-sm:px-[7vw]" id="announcement">
      <div className="space-y-[7vw]">
        <div className=" space-y-[2.5vw] max-md:w-full text-center max-sm:space-y-[7vw] max-md:space-y-[5vw] ">
            <HeadingAnim>

          <h2 className=" text-76  headingAnim w-[95%] max-sm:w-full text-[#0A1B4B]">Upcoming Webinars & Events</h2>
            </HeadingAnim>
          <Copy>
            <p className="text-30 text-center w-[70%] max-sm:w-full mx-auto">
              See how DSW is making waves across global tech and AI
              publications. Explore press features, interviews with our
              leadership, and industry mentions.
            </p>
          </Copy>
        </div>
        <div className="w-full space-y-[3vw] max-sm:mt-[10vw]">
          {/* Main Announcement */}
          <div className="w-full space-y-[4vw] max-sm:space-y-[7vw]">
            <div className="w-full h-fit flex justify-between gap-[4.5vw] max-md:flex-col max-md:gap-y-[7vw]">
              <div className="w-[29vw] h-[25vw] rounded-[1.2vw] overflow-hidden fadeup max-md:w-full max-md:h-[35vh] max-md:border max-md:border-white/10 max-md:rounded-[7vw]">
                <Image
                  src={mainAnnouncement.image}
                  alt={mainAnnouncement.alt}
                  className="w-full h-full"
                  width={400}
                  height={300}
                />
              </div>
              <div className="w-[60%] flex flex-col gap-[2.5vw]  max-md:w-full max-sm:justify-start max-sm:gap-[7vw] max-md:gap-[5vw]">
                <Copy>
                  <h3 className="text-44  text-heading max-sm:text-[5.5vw]">{mainAnnouncement.title}</h3>
                </Copy>
                <Copy>
                  <p className="text-24 leading-[1.2] max-sm:leading-[1.5]">{mainAnnouncement.description}</p>
                </Copy>

                <div className="flex gap-[4vw] fadeup max-md:flex-wrap max-sm:pr-[2vw] max-md:justify-between max-md:gap-[7vw]">
                  <div className="flex flex-col gap-[0.5vw] max-sm:w-[40%]">
                    <p className="opacity-50 text-24">Format</p>
                    <p className="text-24  ">{mainAnnouncement.format}</p>
                  </div>
                  <div className="flex flex-col gap-[0.5vw]">
                    <p className="opacity-50 text-24">Webinar Date</p>
                    <p className="text-24  ">{mainAnnouncement.date}</p>
                  </div>
                  <div className="flex flex-col gap-[0.5vw]">
                    <p className="opacity-50 text-24">Author</p>
                    <p className="text-24  ">{mainAnnouncement.author}</p>
                  </div>
                </div>

                <div className="w-fit fadeup max-md:my-[5vw] max-sm:my-[6vw]">
                  <PrimaryButton
                    
                    text="Register Now"
                    href={mainAnnouncement.href}
                    className="hover:text-primary-2 text-primary-2"
                  />
                </div>
              </div>
            </div>
            <span className="w-full h-[1px] block bg-[#C5C5C5] lineDraw" />
          </div>

          {/* Secondary Announcements */}
          <div className="">
            <div className="w-full flex justify-between fadeup pt-[3vw] max-sm:pt-[6vw] max-md:flex-col max-md:gap-[10vw] max-md:pb-[10vw]">
              {secondaryAnnouncements.map((item, index) => (
                <div
                  key={index}
                  className="w-[32%] h-fit flex flex-col gap-[1.5vw] max-md:w-full max-md:gap-[5vw]"
                >
                  <div className="w-full h-[15vw] rounded-[1.2vw] overflow-hidden max-sm:h-[25vh] max-md:h-[35vh] max-md:rounded-[4.5vw] max-md:border max-md:border-white/20">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full"
                      width={400}
                      height={300}
                    />
                  </div>
                  <h3 className="text-30 w-[80%]  leading-[1.4]">{item.title}</h3>
                  <div className="w-full flex justify-between pr-[2vw]">
                    <p className="text-24 ">{item.type}</p>
                    <p className="text-24 "> {item.date}</p>
                  </div>
                  <div className="">
                    <LinkButton href="#" text="Register More" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingWebinars;
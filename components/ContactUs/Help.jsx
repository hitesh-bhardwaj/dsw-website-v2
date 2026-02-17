"use client";
import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import HeadingAnim from "../Animations/HeadingAnim";

const helpCards = [
  {
    id: 1,
    title: "Book a Demo",
    description:
      "Become the backbone of enterprise AI. Just as Linux became the foundation of modern computing, DSW UnifyAI is emerging as the OS for AI - a platform that brings together open innovation",
    buttonText: "Book a Demo",
    href: "#contact-form",
    target: "_self",
  },
  {
    id: 2,
    title: "Contact Sales",
    description:
      "Become the backbone of enterprise AI. Just as Linux became the foundation of modern computing, DSW UnifyAI is emerging as the OS for AI - a platform that brings together open innovation",
    buttonText: "Contact Sales",
    href: "#contact-form",
    target: "_self",
  },
  {
    id: 3,
    title: "Our Community",
    description:
      "Be part of a growing community where data scientists and AI practitioners collaborate, share insights, and build impactful solutions together. DSW is where learning meets real-world AI innovation.",
    buttonText: "Join Our Community",
    href: "https://chat.whatsapp.com/4UJBjd1ZjV3JcXWCgYqqRH",
    target: "_blank",
  },
];

const Help = () => {
  return (
    <section
      id="contact-help"
      className="w-screen flex flex-col items-center h-full space-y-[3vw] mt-10 px-[5vw] py-[7%] max-md:space-y-[15vw] relative z-[50] max-md:mt-0"
    >
      <HeadingAnim>
        <h2 className="text-76 font-head text-[#0A1B4B]">
          How can we help you?
        </h2>
      </HeadingAnim>
      <div className="flex flex-wrap fadeup space-y-[2vw] justify-between items-center w-full max-md:gap-[4vw] max-sm:gap-[8vw] pt-[5vw] max-md:flex-col max-md:pt-0">
        {helpCards.map((card) => (
          <div
            key={card.id}
            className=" w-[48%] p-[3vw] py-[3.5vw] bg-white max-md:h-full max-md:!w-full  max-md:justify-between max-md:px-[7vw] max-md:py-[8vw] border border-[#C2C2C2] group/corner hover:shadow-lg hover:drop-shadow-lg transition-all duration-300"
          >
            <CornerDecorations />
            <div className="w-full h-full space-y-[2.5vw] relative z-[2] max-md:space-y-[7vw]">
              <h3 className="text-44 text-[#111111]">{card.title}</h3>
              <p className="text-24 text-[#111111]">{card.description}</p>
              <PrimaryButton
                href={card.href}
                text={card.buttonText}
                target={card.target}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Help;

function CornerDecorations() {
  const line = `
    w-[5px] h-[1px]
    duration-300 ease-in-out
  `;

  return (
    <>
      {/* Top Left */}
      <div className="absolute -top-[0.25%] -left-[0.25%] w-fit h-fit group-hover/corner:-top-[3%] group-hover/corner:-left-[3%] duration-300 ease-in-out">
        <div className={`${line} bg-black`} />
        <div
          className={`${line} bg-black rotate-90 absolute top-[2.2px] -left-1/2`}
        />
      </div>

      {/* Top Right */}
      <div className="absolute top-[0.3%] -right-[0.5%] w-fit h-fit rotate-90 group-hover/corner:-top-[2.2%] group-hover/corner:-right-[4.5%] duration-300 ease-in-out">
        <div className={`${line} bg-black`} />
        <div
          className={`${line} bg-black rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-[0.5%] -left-[0.5%] w-fit h-fit -rotate-90 group-hover/corner:-bottom-[2.2%] group-hover/corner:-left-[4.5%] duration-300 ease-in-out">
        <div className={`${line} bg-black`} />
        <div
          className={`${line} bg-black rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>

      {/* Bottom Right */}
      <div className="absolute -bottom-[0.3%] -right-[0.25%] w-fit h-fit rotate-180 group-hover/corner:-bottom-[3%] group-hover/corner:-right-[3%] duration-300 ease-in-out">
        <div className={`${line} bg-black`} />
        <div
          className={`${line} bg-black rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>
    </>
  );
}
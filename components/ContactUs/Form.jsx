import React from "react";
// import ContactForm from "./ContactForm";
import Copy from "../Animations/Copy";
import { Facebook, Insta, LinkedIn, Twitter, Youtube } from "../Svg/Icons";
import Link from "next/link";
import HeadingAnim from "../Animations/HeadingAnim";


const socialLinks = [
    { name: "LinkedIn", icon: <LinkedIn/>, url: "https://www.linkedin.com/company/data-science-wizards/" },
    { name: "Instagram", icon: <Insta/>, url: "https://www.instagram.com/datasciencewizards/" },
    { name: "Facebook", icon: <Facebook/>, url: "https://www.facebook.com/datasciencewizards/" },
    { name: "X", icon: <Twitter/>, url: "https://x.com/dswizards" },
    { name: "YouTube", icon: <Youtube/>, url: "https://www.youtube.com/@DataScienceWizards" },
  ];
const Form = () => {
  return (
    <section className="w-screen h-full overflow-hidden relative z-[10]  max-md:mt-0 px-[5vw] py-[7%]" id="contact-form">
      <div className="h-full w-full flex items-start justify-between  container max-sm:flex-col max-md:flex-col max-sm:gap-[8vw] max-md:gap-[10vw] max-sm:px-[5.5vw] max-md:px-[4vw]">
        <div className="w-[52%] h-full  max-sm:w-full max-md:w-[100%] space-y-[1.5vw] max-md:space-y-[3vw] max-sm:space-y-[4.5vw] flex flex-col justify-between gap-[6.5vw]">
          <div className="h-[35%]  space-y-[1.5vw] max-md:space-y-[5vw]">
            <HeadingAnim>
            <h2 className="w-[90%] text-76  font-head text-[#0A1B4B] leading-[1.2]">
             Have a specific request or question?
            </h2>
            </HeadingAnim>

            <div className="w-[60%] max-sm:w-[85%] max-md:w-[85%]">
              <Copy>
                <p className="text-30 font-normal">
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </p>
              </Copy>
            </div>
          </div>
          

          <div className="h-[40%] max-md:hidden flex flex-col justify-between  gap-[3vw]">
            <div className="space-y-[0.3vw] text-head text-white-300 font-normal fadeup">
              <p className="text-30 text-[#111111]">Phone:</p>
                <div  className="under-multi-parent w-fit">
            <a 
              href={`tel:+353894015233`} 
              className="under-multi text-30 text-[#111111] "
            >
              +353 89401 5233
            </a>
          </div>
          <div  className="under-multi-parent w-fit">
            <a 
              href={`tel:+919664056847`} 
              className="under-multi text-30 text-[#111111] "
            >
              +91 96640 56847
            </a>
          </div>
            </div>

            <div className="text-white-300 space-y-[0.3vw] fadeup">
              <p className="text-30 text-[#111111]">E-mail:</p>
              <div className="under-multi-parent w-fit text-30 text-[#111111]">
            <a 
              href={`mailto:contact@datasciencewizards.ai`} 
              className="under-multi "
            >
             contact@datasciencewizards.ai
            </a>
          </div>
            </div>

            <div className="text-white-300 space-y-[0.8vw] fadeup">
                <p className="text-30 text-[#111111]">Socials:</p>
              <div className="flex items-center gap-[1.5vw] mt-[1vw] max-sm:gap-[7vw] max-sm:w-full max-sm:justify-center max-sm:my-[10vw]">
                  {socialLinks.map((social, id) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    className={`w-auto h-[2.2vw] relative duration-500 transition-all hover:scale-[0.95] block max-sm:h-[10vw] text-[#111111] hover:text-[#1727ff]`}
                  >
                   {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] mt-[11vw] max-md:w-[100%] max-sm:w-full max-md:mt-0">
          {/* <ContactForm /> */}
        </div>

                <div className="hidden max-md:block">

              
          <div className="h-[40%] max-md:pt-[5vw] flex flex-col justify-between gap-[5vw] ">
            <div className="space-y-[0.3vw] text-head text-white-300 font-normal">
              <p>Phone:</p>

              <p className="underline cursor-pointer ">+353894015233</p>
              <p className="underline cursor-pointer">+919664056847</p>
            </div>

            <div className="text-white-300 space-y-[0.3vw]">
              <p>E-mail:</p>

              <p className="underline cursor-pointer">contact@datasciencewizards.ai</p>
            </div>

            <div className="text-white-300 space-y-[0.8vw]">
                <p>Socials:</p>
              <div className="flex items-center gap-[1.5vw] mt-[3vw] max-sm:gap-[7vw] max-sm:w-full max-sm:justify-center max-sm:my-[10vw]">
                  {socialLinks.map((social, id) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    className={`w-auto h-[2.2vw] relative duration-500 transition-all hover:scale-[0.95] block max-sm:h-[10vw] text-[#111111] hover:text-[#1727ff]`}
                  >
                   {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
            </div>
      </div>
    </section>
  );
};

export default Form;

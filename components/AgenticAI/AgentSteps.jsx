'use client'
import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CircleBg } from '../Svg/Lines/DottedCircle';
import { Insurance } from '@/components/Svg/Insurance';
import { Bank } from '../Svg/Bank';
import { Roadmap } from '../Svg/Roadmap';
import HeadingAnim from '../Animations/HeadingAnim';

const AgenticSteps = () => {
  const [isHovered1, setIsHovered1] = React.useState(false);
  const [isHovered2, setIsHovered2] = React.useState(false);
  const [isHovered3, setIsHovered3] = React.useState(false);
  
  const circleRef1 = React.useRef(null);
  const circleRef2 = React.useRef(null);
  const circleRef3 = React.useRef(null);

  useGSAP(() => {
    if (isHovered1) {
      gsap.to(circleRef1.current, {
        rotation: '+=360',
        duration: 4,
        ease: 'none',
        repeat: -1
      });
    } else {
      gsap.killTweensOf(circleRef1.current);
    }
  }, [isHovered1]);

  useGSAP(() => {
    if (isHovered2) {
      gsap.to(circleRef2.current, {
        rotation: '+=360',
        duration: 4,
        ease: 'none',
        repeat: -1
      });
    } else {
      gsap.killTweensOf(circleRef2.current);
    }
  }, [isHovered2]);

  useGSAP(() => {
    if (isHovered3) {
      gsap.to(circleRef3.current, {
        rotation: '+=360',
        duration: 4,
        ease: 'none',
        repeat: -1
      });
    } else {
      gsap.killTweensOf(circleRef3.current);
    }
  }, [isHovered3]);

  return (
    <div className='py-[12%] bg-white  space-y-[2vw]'>

      <HeadingAnim>


      <h2 className='text-76 mx-auto w-fit'>
        BFSI use cases & vertical accelerators  
      </h2>
      </HeadingAnim>

      <div className="flex justify-between p-[4vw] ">
        
        {/* Card 1 - Insurance */}
        <div 
          className="relative fadeup bg-card-bg px-[3vw] pt-[1.5vw] pb-[3.5vw] w-[28.5vw] h-[36.5vw] overflow-hidden border-t-[0.4vw] border-primary-blue flex flex-col"
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          <div className="flex justify-between items-center mb-[2vw]">
            <h2 className="text-32 font-normal m-0 text-[#1a1a1a]">
              Insurance
            </h2>
            <span className="text-80 font-light text-primary-blue leading-none">
              1
            </span>
          </div>

          <div className=" w-full h-auto flex mb-[12vw] justify-center items-center ">
            <div ref={circleRef1} className='w-[28vw] z-10 h-auto absolute top-60'>
              <CircleBg 
                className='h-full scale-[1.4] w-full origin-center duration-1000 ease-in-out'
              />
            </div>
            
            <div className="w-[6vw] h-[6vw] rounded-full bg-white flex justify-center items-center z-10">
              <Insurance className='h-full w-full p-[1vw]' />
            </div>
          </div>

          <p className="text-24 leading-[1.2] m-0 ">
            Purpose-built for insurers: claims orchestration, fraud triage, underwriting augmentation and customer engagement automation.
          </p>
        </div>

        {/* Card 2 - Banks */}
        <div 
          className="relative fadeup bg-card-bg px-[3vw] pt-[1.5vw] pb-[3.5vw] w-[28.5vw] h-[36.5vw] overflow-hidden border-t-[0.4vw] border-primary-blue flex flex-col"
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
        >
          <div className="flex justify-between items-center mb-[2vw]">
            <h2 className="text-32 font-normal m-0 text-[#1a1a1a]">
              Banks
            </h2>
            <span className="text-80 font-light text-primary-blue leading-none">
              2
            </span>
          </div>

          <div className=" w-full h-auto flex mb-[12vw] justify-center items-center ">
            <div ref={circleRef2} className='w-[28vw] z-10 h-auto absolute top-60'>
              <CircleBg 
                className='h-full scale-[1.4] w-full origin-center duration-1000 ease-in-out'
              />
            </div>
            
            <div className="w-[6vw] h-[6vw] rounded-full bg-white flex justify-center items-center z-10">
              <Bank className='h-full w-full p-[1vw]' />
            </div>
          </div>

          <p className="text-24 leading-[1.2] m-0 ">
            For banks & financial institutions: lending decision support, compliance automation, fraud monitoring and risk remediation.
          </p>
        </div>

        {/* Card 3 - Roadmap */}
        <div 
          className="relative bg-card-bg px-[3vw] pt-[1.5vw] pb-[3.5vw] w-[28.5vw] h-[36.5vw] overflow-hidden border-t-[0.4vw] border-primary-blue fadeup flex flex-col"
          onMouseEnter={() => setIsHovered3(true)}
          onMouseLeave={() => setIsHovered3(false)}
        >
          <div className="flex justify-between items-center mb-[2vw]">
            <h2 className="text-32 font-normal m-0 text-[#1a1a1a]">
              Roadmap
            </h2>
            <span className="text-80 font-light text-primary-blue leading-none">
              3
            </span>
          </div>

          <div className=" w-full h-auto flex mb-[12vw] justify-center items-center ">
            <div ref={circleRef3} className='w-[28vw] z-10 h-auto absolute top-60'>
              <CircleBg 
                className='h-full scale-[1.4] w-full origin-center duration-1000 ease-in-out'
              />
            </div>
            
            <div className="w-[6vw] h-[6vw] rounded-full bg-white flex justify-center items-center z-10">
              <Roadmap className='h-full w-full p-[1vw]' />
            </div>
          </div>

          <p className="text-24 leading-[1.2] m-0 ">
            Next: telecom, healthcare and other regulated industries where auditability and governance are critical.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AgenticSteps;
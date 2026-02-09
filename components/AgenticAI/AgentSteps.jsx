import React from 'react';
import { CircleBg } from '../Svg/Lines/DottedCircle';
import { Insurance } from '@/components/Svg/Insurance';
import { Bank } from '../Svg/Bank';
import { Roadmap } from '../Svg/Roadmap';

const AgenticSteps = () => {
  const cardsData = [
    {
      id: 1,
      title: "Insurance",
      number: "1",
      description: "Purpose-built for insurers: claims orchestration, fraud triage, underwriting augmentation and customer engagement automation.",
      icon: Insurance
    },
    {
      id: 2,
      title: "Banks",
      number: "2",
      description: "For banks & financial institutions: lending decision support, compliance automation, fraud monitoring and risk remediation.",
      icon: Bank
    },
    {
      id: 3,
      title: "Roadmap",
      number: "3",
      description: "Next: telecom, healthcare and other regulated industries where auditability and governance are critical.",
      icon: Roadmap
    }
  ];

  

  const Card = ({ title, number, description, icon: Icon }) => {
    return (
      <div className="relative bg-card-bg px-[3vw] pt-[1.5vw] pb-[3.5vw] w-[30vw] h-[36.5vw] overflow-hidden border-t-[0.4vw] border-primary-blue flex flex-col ">
        
        
        <div className="flex justify-between items-center mb-[2vw]">
          <h2 className="text-32 font-normal m-0 text-[#1a1a1a]">
            {title}
          </h2>
          <span className="text-[4.5vw] font-light text-primary-blue leading-none">
            {number}
          </span>
        </div>

        <div className=" w-full h-auto flex mb-[12vw] justify-center items-center ">

            <div className='w-[28vw] z-10 h-auto absolute top-60'>

         <CircleBg className='h-full scale-[1.4] w-full origin-center hover:rotate-45 duration-1000 ease-in-out'/>
            </div>

          
          <div className="w-[6vw] h-[6vw] rounded-full bg-white flex justify-center items-center z-10">

            <Icon className='h-full w-full p-[1vw]' />
          </div>
        </div>

        <p className="text-24 leading-[1.2] m-0 ">
          {description}
        </p>
      </div>
    );
  };

  return (
    <div className='py-[12%] bg-white  space-y-[2vw]'>

      <h2 className='text-76 mx-auto w-fit'>
        BFSI use cases & vertical accelerators  
      </h2>

    <div className="flex gap-[2vw] p-[4vw]  font-sans">
      {cardsData.map((card) => (
        <Card
        key={card.id}
        title={card.title}
        number={card.number}
        description={card.description}
        icon={card.icon}
        />
      ))}
    </div>
      </div>
  );
};

export default AgenticSteps;
import HeadingAnim from '@/components/Animations/HeadingAnim'
import React from 'react'

const UseCases = () => {
    return (
        <section className='w-full h-full px-[5vw] pb-[10%] max-sm:py-[15%] max-md:py-[10%]' id='usecases'>
            <div className='flex flex-col items-center justify-center space-y-[4vw] max-sm:space-y-[12vw]'>
                <HeadingAnim>
                    <h2 className='text-76 text-[#0A1B4B] max-md:text-center max-sm:w-[90%] max-md:w-[80%]'>Supercharge Your AI /ML Use Cases</h2>
                </HeadingAnim>

                <div className=' w-full'>
                    <div className="relative fadeup space-y-[4vw] max-sm:space-y-[10vw] max-md:space-y-[4vw]">
                        {content.map((item, index) => (
                            <div key={index} className="relative bg-white hover:border-primary-blue  hover:shadow-lg hover:drop-shadow-lg duration-300 ease-in-out w-full h-full px-[2vw] py-[2.5vw] pb-[3vw] max-sm:p-[6vw] max-sm:pb-[10vw] max-md:p-[4vw] max-sm:w-full max-sm:h-auto border border-[#CCCCCC] flex flex-col justify-between max-md:gap-[7vw] max-sm:gap-[5vw]">
                                <CornerDecorations />
                                <div className='w-1/3 max-sm:w-full max-md:w-[60%] space-y-[2vw] max-sm:space-y-[6vw] max-md:space-y-[3vw]'>
                                    <h3 className='text-44  text-[#0A1B4B] font-medium'>
                                        {item.heading}
                                    </h3>
                                    <p className='text-30 text-[#333333]'>
                                        {item.para}
                                    </p>
                                </div>

                                {/* Bottom Right - Pointers */}
                                <div className='w-full flex justify-end'>
                                    <div className='w-[65%] max-sm:w-full flex flex-wrap max-sm:flex-col gap-[3vw] max-sm:gap-[6vw] max-sm:mt-[6vw]'>
                                        {item.features.map((feature, index) => (
                                            <div key={index} className='flex gap-3 w-[45%] max-md:w-full'>
                                                <span className='h-full w-0.5 bg-[#0205FA] block'></span>
                                                <p className='text-24 flex-1 text-[#333333] max-sm:opacity-80'>{feature}</p>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default UseCases


const content = [
    {
        heading: "UnifyAI",
        para: "Build, test, deploy, and monitor AI/ML models with lightning speed using accelerated workflows:",
        features: [
            "400+ pre-built connectors for seamless data ingestion and transformation",
            "Real-time monitoring with performance, drift, and anomaly tracking",
            "Core AI/ML runtime engine with built-in model selection and evaluation",
            "One-click deployment to production environments"
        ]
    },
    {
        heading: "Unified Ops",
        para: "One OS. One Centralized AI/ML ecosystem. Total Control.",
        features: [
            "Centralized observability across models and agents",
            "Built-in compliance - ISO 42001, SOC 2, ISO 27001, HIPAA, GDPR",
            "Full traceability with logs, alerts, and audit trails",
        ]
    }
]



function CornerDecorations({
}) {
  const line = `
    w-[5px] h-[1px]
    duration-300 ease-in-out
  `;

  return (
    <>
      {/* Top Left */}
      <div className="absolute -top-[0.25%] -left-[0.05%] w-fit h-fit group-hover:-top-[3%] group-hover:-left-[3%] duration-300 ease-in-out max-sm:-left-[0.08%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2.2px] -left-1/2`}
        />
      </div>

      {/* Top Right */}
      <div className="absolute top-[0.25%] -right-[0.22%] w-fit h-fit rotate-90 group-hover:-top-[2.2%] group-hover:-right-[4.5%] duration-300 ease-in-out max-sm:top-[0.3%] max-sm:-right-[0.8%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-[0.25%] -left-[0.25%] w-fit h-fit -rotate-90 group-hover:-bottom-[2.2%] group-hover:-left-[4.5%] duration-300 ease-in-out max-sm:-left-[0.8%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>

      {/* Bottom Right */}
      <div className="absolute -bottom-[0.2%] -right-[0.05%] w-fit h-fit rotate-180 group-hover:-bottom-[3%] group-hover:-right-[3%] duration-300 ease-in-out max-sm:-bottom-[0.1%] max-sm:-right-[0.08%]">
        <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
        <div
          className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
        />
      </div>
    </>
  );
}
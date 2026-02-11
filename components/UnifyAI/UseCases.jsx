import HeadingAnim from '@/components/Animations/HeadingAnim'
import CornerDecorations from '@/components/CornerDecorations'
import React from 'react'

const UseCases = () => {
    return (
        <section className='w-full h-full px-[5vw] py-[7%] max-sm:py-[15%]' id='usecases'>
            <div className='flex flex-col items-center justify-center space-y-[4vw] max-sm:space-y-[12vw]'>
                <HeadingAnim>
                    <h2 className='text-76 text-[#0A1B4B] max-sm:text-center max-sm:w-[90%]'>Supercharge Your AI /ML Use Cases</h2>
                </HeadingAnim>

                <div className=' w-full'>
                    <div className="relative fadeup space-y-[4vw] max-sm:space-y-[10vw]">
                        {content.map((item, index) => (
                            <div key={index} className="relative bg-white hover:border-primary-blue group hover:shadow-lg hover:drop-shadow-lg duration-300 ease-in-out w-full h-full px-[2vw] py-[2.5vw] pb-[3vw] max-sm:p-[6vw] max-sm:w-full max-sm:h-auto border border-border-color flex flex-col justify-between">
                                <CornerDecorations />


                                <div className='w-1/3 max-sm:w-full space-y-[2vw] max-sm:space-y-[6vw]'>
                                    <h3 className='text-44  '>
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
                                            <div key={index} className='flex gap-3 w-[45%] max-sm:w-full'>
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
        para: "One OS. One Centralized AI/ML ecosystem. Total Control",
        features: [
            "Centralized observability across models and agents",
            "Built-in compliance - ISO 42001, SOC 2, ISO 27001, HIPAA, GDPR",
            "Full traceability with logs, alerts, and audit trails",
        ]
    }
]




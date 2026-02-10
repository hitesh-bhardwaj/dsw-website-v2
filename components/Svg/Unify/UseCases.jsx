import HeadingAnim from '@/components/Animations/HeadingAnim'
import CornerDecorations from '@/components/CornerDecorations'
import React from 'react'

const UseCases = () => {
  return (
    <section className='w-full h-full px-[5vw] py-[7%]'>
        <div className='flex flex-col items-center justify-center space-y-[4vw]'>
            <HeadingAnim>
                <h2 className='text-76'>Supercharge Your AI/ML Use Cases</h2>
            </HeadingAnim>


            <div className='space-y-[3vw] w-full '>
                 <div className="relative fadeup">
    <div className="relative bg-white hover:border-primary-blue group hover:shadow-lg hover:drop-shadow-lg duration-300 ease-in-out w-full h-[35vw] px-[1vw] py-[1.5vw] max-sm:p-[6vw] max-sm:w-full max-sm:h-auto border border-border-color flex flex-col">
        <CornerDecorations />
        
        {/* Main Container - Header Left, Features Bottom Right */}
        <div className="flex flex-col h-full">
            {/* Header Section - Top Left */}
            <div className="mb-auto max-sm:mb-[6vw]">
                <h2 className="font-sans text-32 max-sm:text-24 font-semibold mb-[0.5vw] max-sm:mb-[2vw]">
                    Unified Ops
                </h2>
                <p className="font-sans text-18 max-sm:text-16 text-gray-700 leading-[1.3]">
                    One OS. One Centralized AI/ML<br />ecosystem. Total Control
                </p>
            </div>

            {/* Features Section - Bottom Right */}
            <div className="flex justify-end max-sm:justify-start">
                <div className="flex flex-col gap-[1.5vw] max-sm:gap-[4vw] w-[60%] max-sm:w-full">
                    {/* Feature 1 */}
                    <div className="flex items-start gap-[0.5vw]">
                        <div className="w-[0.3vw] min-h-[3vw] bg-primary-blue max-sm:w-[1vw] max-sm:min-h-[8vw]" />
                        <p className="font-sans text-16 max-sm:text-14 leading-[1.4]">
                            Centralized observability across models and agents
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-start gap-[0.5vw]">
                        <div className="w-[0.3vw] min-h-[3vw] bg-primary-blue max-sm:w-[1vw] max-sm:min-h-[8vw]" />
                        <p className="font-sans text-16 max-sm:text-14 leading-[1.4]">
                            Built-in compliance - ISO 42001, SOC 2, ISO 27001, HIPAA, GDPR
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-start gap-[0.5vw]">
                        <div className="w-[0.3vw] min-h-[3vw] bg-primary-blue max-sm:w-[1vw] max-sm:min-h-[8vw]" />
                        <p className="font-sans text-16 max-sm:text-14 leading-[1.4]">
                            Full traceability with logs, alerts, and audit trails
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


            </div>
        </div>

    </section>
  )
}

export default UseCases




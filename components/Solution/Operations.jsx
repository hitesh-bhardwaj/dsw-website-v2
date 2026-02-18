import React from 'react'
import HeadingAnim from '../Animations/HeadingAnim'

const Operations = () => {
  return (
    <section
      className="w-full px-[5vw] py-[7%] max-sm:px-[7vw] max-sm:py-[15%]"
      id="operations"
    >
        <div className="w-full h-full gap-y-[2vw] flex flex-col items-center text-center">
          <HeadingAnim>
            <h2 className=' text-76 text-[#0A1B4B] mx-auto w-[85%]'>
                Kernel-governed execution across underwriting, claims, and operations
            </h2>
          </HeadingAnim>
        </div>
    </section>
  )
}

export default Operations

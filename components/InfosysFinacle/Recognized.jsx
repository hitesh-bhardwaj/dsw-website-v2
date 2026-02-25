import React from 'react'
import Image from 'next/image'
import Copy from '../Animations/Copy'

const Recognized = () => {
  return (
   <section className='h-full w-screen py-[7%] px-[5vw] max-sm:py-[15%] max-md:py-[10%]  max-md:px-[6vw] max-sm:px-[7vw]' id='careers'>
    <div className='h-full w-full flex items-start justify-between max-sm:flex-col max-md:gap-[5vw] max-sm:gap-[10vw]'>
       
        <div className='w-[50%]  max-sm:w-full max-sm:space-y-[5vw] max-md:my-auto max-sm:my-0 max-md:items-start max-sm:text-center'>
          <Copy>
        <h2 className='text-56 leading-[1.2] max-sm:text-76 text-[#0A1B4B]'>Recognized Excellence: Infosys Finacle Open-Source Services Partner 2025</h2>
        </Copy>
        </div>
       

        <div className='h-[35%] max-md:h-[45vw]  w-[38%] max-sm:w-full max-md:w-[70%] rounded-[2.5vw] max-md:rounded-[5vw] max-sm:rounded-[7vw] overflow-hidden max-sm:h-[45vh]    fadeup'>
        <Image src={"/assets/infosys-finacle/recognized.png"} quality={50} height={501} width={543} alt='Careers' className='h-full w-full '/>
        </div>
        

    </div>

   </section>
  )
}

export default Recognized
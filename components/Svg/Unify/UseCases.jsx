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


            <div className='space-y-[3vw] w-full'>
                 <div className="relative fadeup">
    <div className="relative bg-white hover:border-primary-blue group hover:shadow-lg hover:drop-shadow-lg duration-300 ease-in-out w-full h-[35vw] px-[1vw] py-[1.5vw] max-sm:p-[6vw] max-sm:w-full max-sm:h-auto border border-border-color flex flex-col">
        <CornerDecorations />
    
       <div>
        
       </div>
    </div>
</div>


            </div>
        </div>

    </section>
  )
}

export default UseCases




import React from 'react'
import HeadingAnim from '../Animations/HeadingAnim'
import Copy from '../Animations/Copy'
import Image from 'next/image';


const layers = [
  { src: "/assets/homepage/unified-layer-1.png", top: "0%", z: 6 },
  { src: "/assets/homepage/unified-layer-2.png", top: "10%", z: 5 },
  { src: "/assets/homepage/unified-layer-3.png", top: "20%", z: 4 },
  { src: "/assets/homepage/unified-layer-4.png", top: "30%", z: 3 },
  { src: "/assets/homepage/unified-layer-5.png", top: "40%", z: 2 },
  { src: "/assets/homepage/unified-layer-6.png", top: "55%", z: 1 },
];

const Diagram=()=>{
  return(
    <>
    <div className="w-full flex justify-between h-fit items-center max-sm:flex-col max-sm:gap-[15vw]">
        <div className="w-[30%] flex flex-col gap-[2vw] max-sm:w-full">
          <HeadingAnim>
          <h3 className="text-56 max-sm:w-[70%] ">Hardware / Cloud Infrastructure</h3>
          </HeadingAnim>
          <Copy>
          <div className="flex items-center  gap-2">
            <div className="w-1 h-1  bg-white rounded-full inline-block " />{" "}
            Servers, Storage, Network, Accelerators
          </div>
          </Copy>
        </div>
        <div className="w-[50%] h-[48vw] relative max-sm:w-full max-sm:h-[100vw]">
          {layers.map((layer, index) => (
            <div
              key={index}
              className="w-[35vw] h-auto absolute right-0 fadeup max-sm:w-full"
              style={{
                top: layer.top,
                zIndex: layer.z,
              }}
            >
              <Image
                src={layer.src}
                alt="unified-layer"
                width={300}
                height={200}
                className="w-full h-full"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Diagram
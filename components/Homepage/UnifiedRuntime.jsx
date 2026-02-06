import Image from "next/image";

const layers = [
  { src: "/assets/homepage/unified-layer-1.png", top: "0%", z: 6 },
  { src: "/assets/homepage/unified-layer-2.png", top: "10%", z: 5 },
  { src: "/assets/homepage/unified-layer-3.png", top: "20%", z: 4 },
  { src: "/assets/homepage/unified-layer-4.png", top: "30%", z: 3 },
  { src: "/assets/homepage/unified-layer-5.png", top: "40%", z: 2 },
  { src: "/assets/homepage/unified-layer-6.png", top: "55%", z: 1 },
];

export default function UnifiedRuntime() {
  return (
    <section
      className="py-[7%] px-[5vw] text-white bg-radial-night space-y-[9vw]"
      id="unified-runtime"
    >
      <h2 className="text-76  w-[60%] text-center mx-auto leading-[1.4]">
        From Fragmented AI to One Governed Runtime
      </h2>
      <div className="w-full flex justify-between">
        <div className="w-[30%]">
          <h3 className="text-56 ">Build a Unified AI Ecosystem</h3>
        </div>
        <div className="w-[40%] space-y-[1vw] text-24 ">
          <p>
            Unify models, agents, tools, and workflows under a single governed
            runtime designed for production-ready AI.
          </p>
          <p>
            Replace fragmented platforms with one operational foundation that
            enforces control, governance, and accountability as AI runs.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between h-fit items-center">
        <div className="w-[30%] flex flex-col gap-[2vw]">
          <h3 className="text-56 ">
            Hardware / Cloud Infrastructure
          </h3>
          <p className="flex items-center gap-2">
            <span className="w-1 h-1 bg-white rounded-full inline-block" />{" "}
            Servers, Storage, Network, Accelerators
          </p>
        </div>
        <div className="w-[50%] h-[48vw] relative">
          {layers.map((layer, index) => (
            <div
              key={index}
              className="w-[35vw] h-auto absolute right-0"
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
    </section>
  );
}

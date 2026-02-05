import Image from 'next/image';

export default function CoreEnterpriseSystem() {
    return (
        <section className="relative w-full bg-white py-[10.42vw] overflow-hidden">
            {/* Circular Decoration Background */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[74.58vw] h-[74.58vw]">
                <div className="relative w-full h-full">
                    <Image
                        src="/circle-deco.svg"
                        alt=""
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-[3.91vw]">
                {/* Main Heading */}
                <h2 className="text-[3.96vw] font-heading leading-none tracking-[0.079vw] text-[#111] mb-[17.19vw]">
                    Run AI as a Core Enterprise System
                </h2>

                {/* Feature Title */}
                <h3 className="text-[2.29vw] font-heading font-medium leading-[3.23vw] tracking-[0.046vw] text-[#111] mb-[2.6vw]">
                    Runtime Governance, Enforced by the Kernel
                </h3>

                {/* Description */}
                <p className="text-[1.56vw] font-sans leading-[2.29vw] tracking-[0.031vw] text-[#111] max-w-[54.43vw] mx-auto mb-[5.73vw]">
                    Governance is enforced in real time as AI executes, ensuring policies,
                    validations, and approvals cannot be bypassed.
                </p>

                {/* Pagination */}
                <p className="text-[1.67vw] font-sans leading-[2.34vw] text-[#0205fa]">
                    1 / 4
                </p>
            </div>
        </section>
    );
}

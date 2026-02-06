import Image from 'next/image';

export default function Clients() {
    const clients = [
        {
            name: "CIEK",
            logo: "/client-ciek.png",
            width: 172,
            height: 54,
            opacity: 60,
        },
        {
            name: "Bonprix",
            logo: "/client-bonprix.png",
            width: 92,
            height: 85,
            opacity: 80,
        },
        {
            name: "Edgeverve",
            logo: "/client-edgeverve.png",
            width: 218,
            height: 59,
            opacity: 80,
        },
        {
            name: "Manipal Cigna",
            logo: "/client-manipal.png",
            width: 234,
            height: 123,
            opacity: 80,
        },
        {
            name: "Sodexo",
            logo: "/client-sodexo.png",
            width: 176,
            height: 56,
            opacity: 90,
        },
        {
            name: "Client 6",
            logo: "/client-6.png",
            width: 196,
            height: 59,
            opacity: 80,
        },
    ];

    return (
        <section className="relative w-full py-[5.21vw] px-[3.91vw]">
            {/* Heading */}
            <h2 className="text-[3.96vw] font-heading leading-[5vw] tracking-[0.079vw] text-[#111] text-center mb-[8.33vw]">
                Trusted by Enterprises<br />
                Operating AI at Scale
            </h2>

            {/* Client Logos Grid */}
            <div className="flex justify-start gap-[1.88vw] overflow-x-auto">
                {clients.map((client, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-[16.67vw] h-[13.54vw] bg-white border border-[#1727ff] rounded-[0.52vw] flex items-center justify-center shadow-[0_0.52vw_1.04vw_rgba(0,0,0,0.08)]"
                    >
                        <div className="relative" style={{
                            width: `${(client.width / 1920) * 100}vw`,
                            height: `${(client.height / 1920) * 100}vw`,
                            opacity: client.opacity / 100
                        }}>
                            <Image
                                src={client.logo}
                                alt={client.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

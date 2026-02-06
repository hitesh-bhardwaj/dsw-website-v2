import Image from 'next/image';

export default function Clients() {
    return (
        <section className="relative w-full py-[5.21vw] px-[3.91vw] space-y-[5vw]">
            {/* Heading */}
            <h2 className="text-76 text-[#0A1B4B] font-extralight leading-[1.2] w-[60%] text-center mx-auto">
                Trusted by Enterprises
                Operating AI at Scale
            </h2>

            {/* Client Logos Grid */}
            <div className="flex justify-start gap-[1.88vw] overflow-x-auto">
                {clients.map((client, index) => (
                    <div
                        key={index}
                        className="shrink-0 w-[16.67vw] h-[13.54vw] bg-black/30 border border-[#1727ff] rounded-[0.52vw] flex items-center justify-center drop-shadow-xl"
                    >
                        <div className="relative">
                            <Image
                                src={client.logo}
                                alt={client.name}
                                height={200}
                                width={200}
                                className="object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


const clients = [
        {
            name: "Bonprix",
            logo: "/assets/clients/bon-prix.png",
        },
        {
            name: "Canara HSBC",
            logo: "/assets/clients/canara-hsbc.png",
        },
        {
            name: "Castler",
            logo: "/assets/clients/castler.png",
        },
        {
            name: "Ciek",
            logo: "/assets/clients/ciek.png",
        },
        {
            name: "Craft Silicon",
            logo: "/assets/clients/craft-silicon.png",
        },
        {
            name: "Earc",
            logo: "/assets/clients/earc.png",
        },
        {
            name: "Tokio",
            logo: "/assets/clients/edelweiss-tokio-life.png",
        },
        {
            name: "Edgeverve",
            logo: "/assets/clients/edge-verve.png",
        },
        {
            name: "IIFL",
            logo: "/assets/clients/iifl-capital.png",
        },
        {
            name: "Kelmac",
            logo: "/assets/clients/kelmac-grop.png",
        },
        {
            name: "Manipal",
            logo: "/assets/clients/manipal-cigna.png",
        },
        {
            name: "oxsde",
            logo: "/assets/clients/oxsde.png",
        },
        {
            name: "Sodexo",
            logo: "/assets/clients/sodexo.png",
        },
    ];
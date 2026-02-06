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
            <div className='clients-marquee'>
            <div className="flex justify-start gap-[1.88vw]  clients-marquee__track">
                {clients.map((client, index) => (
                    <div
                        key={index}
                        className="shrink-0 w-[16.67vw] clients-logo h-[13.54vw] border border-[#1727ff] rounded-[0.52vw] flex items-center justify-center"
                    >
                        <div className="relative">
                            <Image
                                src={client.logo}
                                alt={client.name}
                                height={200}
                                width={200}
                                className="object-contain z-10 "
                            />
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </section>
    );
}


const clients = [
        {
            name: "Bonprix",
            logo: "/assets/clients/bon-prix-color.png",
        },
        {
            name: "Canara HSBC",
            logo: "/assets/clients/canara-hsbc-color.png",
        },
        {
            name: "Ciek",
            logo: "/assets/clients/ciek-color.png",
        },
        {
            name: "Craft Silicon",
            logo: "/assets/clients/craft-silicon-color.png",
        },
        {
            name: "Earc",
            logo: "/assets/clients/earc-color.png",
        },
        {
            name: "Tokio",
            logo: "/assets/clients/edelweiss-tokio-life-color.png",
        },
        {
            name: "Edgeverve",
            logo: "/assets/clients/edge-verve-color.png",
        },
        {
            name: "IIFL",
            logo: "/assets/clients/iifl-capital-color.png",
        },
        {
            name: "Kelmac",
            logo: "/assets/clients/kelmac-group-color.png",
        },
        {
            name: "Manipal",
            logo: "/assets/clients/manipal-cigna-color.png",
        },
        {
            name: "oxsde",
            logo: "/assets/clients/oxsde-color.png",
        },
        {
            name: "Sodexo",
            logo: "/assets/clients/sodexo-color.png",
        },
    ];
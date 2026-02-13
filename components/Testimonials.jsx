import Image from "next/image";
import HeadingAnim from "./Animations/HeadingAnim";
import Copy from "./Animations/Copy";

const TESTIMONIALS = [
  {
    type: "stat",
    text: (
      <>
        Canara HSBC achieves{" "}
        <span className="text-[#ff5f00]">faster deployment</span> on persistency
        prediction and customer retention
      </>
    ),
  },
  {
    type: "image",
    src: "/assets/homepage/testimonials/testimonial-1.png",
    alt: "Token Usage Over Time",
  },
  {
    type: "testimonial",
    quote:
      "With DSW's insurance-specific solutions on top of its robust AI platform, we've been able to move use cases into production quickly.",
    name: "Ritesh Rathod",
    title: "Chief Strategy and Data Officer, Canara HSBC",
    avatar: "/profile-ritesh.png",
  },
  {
    type: "image",
    src: "/assets/homepage/testimonials/testimonial-2.png",
    alt: "Error Distribution",
  },
  {
    type: "testimonial",
    quote:
      "DSW UnifyAI simplified our data-driven approach, enabling easy development of AI-powered use cases.",
    name: "Stefano Bonfa",
    title: "Director, OxSDE, Europe",
    avatar: "/profile-stefano.png",
  },
  {
    type: "stat",
    text: (
      <>
        <span className="text-[#ff5f00]">Customers In Production</span> – Canara
        HSBC, Manipal Cigna, Mahindra, Castler, Wealthright, FSS
      </>
    ),
  },
  {
    type: "testimonial",
    quote:
      "With advanced capabilities of the platform's AgenticAI, Castler's escrow services became smarter, more efficient - enabling faster, secure, scalable solutions for our BFSI clients.",
    name: "Ritesh Tiwari",
    title: "Chief Product Officer, Castler",
    avatar: "/profile-ritesh-t.png",
  },
  {
    type: "stat",
    text: (
      <>
        Manipal Health Cigna in production with{" "}
        <span className="text-[#ff5f00]">over 5 use cases</span> of AI/ML and
        GenAI
      </>
    ),
  },
  {
    type: "image",
    src: "/assets/homepage/testimonials/testimonial-3.png",
    alt: "Latency Chart",
  },
];

export default function Testimonials() {
  return (
    <section className="relative w-full pb-[7%] px-[3.91vw] space-y-[8vw] max-sm:px-[7vw] max-sm:py-[15%] max-sm:space-y-[15vw]">
      {/* Heading */}
      <div className="text-center space-y-[2vw] max-sm:space-y-[7vw]">
        <HeadingAnim>
          <h2 className="text-76 font-heading text-[#0A1B4B] leading-[1.2]">
            Trusted by Leaders
            <br />
            in BFSI and Beyond
          </h2>
        </HeadingAnim>
        <Copy>
          <p className="text-30 w-[45%] max-sm:w-full mx-auto">
            Explore how we've helped businesses like yours achieve success with
            innovative technology solutions.
          </p>
        </Copy>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-[2.2vw] mx-auto fadeup max-sm:flex max-sm:flex-col max-sm:gap-[5vw]">
        {TESTIMONIALS.map((item, i) => {
          // STAT CARD
          if (item.type === "stat") {
            return (
              <div
                key={i}
                className="bg-white border-[0.078vw] border-[#0205fa] rounded-[1.3vw] p-[1.48vw] h-[17.71vw] flex items-end max-sm:p-[5vw] max-sm:h-[60vw] max-sm:rounded-[4vw]"
              >
                <p className="text-30">{item.text}</p>
              </div>
            );
          }

          // IMAGE CARD
          if (item.type === "image") {
            return (
              <div
                key={i}
                className="bg-[#030a25] border-[0.078vw] border-[#0205fa] rounded-[1.3vw] overflow-hidden h-[17.71vw] relative group transition-all duration-500 ease-out max-sm:h-[60vw] max-sm:rounded-[4vw]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover h-full w-full scale-[1.1] group-hover:scale-[1.05] transition-all duration-500 ease-out"
                />
              </div>
            );
          }

          // TESTIMONIAL CARD
          return (
            <div
              key={i}
              className="bg-white border-[0.078vw] border-[#0205fa] rounded-[1.3vw] py-[1.5vw] px-[1.5vw] h-[17.71vw] flex flex-col justify-between max-sm:p-[5vw] max-sm:h-[70vw] max-sm:rounded-[4vw]"
            >
              <p className="text-24 font-sans leading-[1.2] px-[0.5vw] font-light">
                {item.quote}
              </p>
              <div className="flex items-center gap-[1vw] max-sm:gap-[5vw] ">
                <div className="relative w-[4vw] h-[4vw] flex items-center justify-center p-1 rounded-full border border-black/30 overflow-hidden flex-shrink-0 max-sm:w-[15vw] max-sm:h-[15vw]">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    height={100}
                    width={100}
                    className="object-contain"
                  />
                </div>
                <div className="space-y-[0.5vw] max-sm:space-y-[3vw]">
                  <p className="text-24 font-sans font-medium text-[#14100e] leading-[1.2]">
                    {item.name}
                  </p>
                  <p className="text-20 font-sans text-[#645f5d] leading-[1.2]">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

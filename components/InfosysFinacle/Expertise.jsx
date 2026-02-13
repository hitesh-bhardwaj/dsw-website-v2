"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from "@gsap/react";
import HeadingAnim from "../Animations/HeadingAnim";

const AwardItem = ({ img }) => {
  return (
    <>
      <div className="flex-shrink-0 flex items-center justify-center gap-[1vw] w-[15vw] max-md:!w-[25vw] max-sm:!w-[30vw]  max-md:gap-[2vw]">
        <div className="w-[12vw] h-auto max-md:w-[18vw] max-sm:!w-[30vw]">
          <Image
            src={img}
            height={130}
            width={190}
            alt={"open source"}
            className="h-full w-full"
          />
        </div>
      </div>
    </>
  );
};

const Expertise = () => {
  const firstHalfAwards = awards.slice(0, Math.ceil(awards.length / 2));
  const secondHalfAwards = awards.slice(Math.ceil(awards.length / 2));

  const marqueeRef1 = useRef(null);
  const marqueeRef2 = useRef(null);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(
    () => {
      // First marquee - left to right
      if (marqueeRef1.current) {
        const track = marqueeRef1.current;
        const trackWidth = track.scrollWidth / 3; 

        gsap.to(track, {
          x: -trackWidth,
          duration: 25,
          ease: "none",
          repeat: -1,
        });
      }

      // Second marquee - right to left (reverse)
      if (marqueeRef2.current) {
        const track = marqueeRef2.current;
        const trackWidth = track.scrollWidth / 3; 

        gsap.fromTo(
          track,
          {
            x: -trackWidth,
          },
          {
            x: 0,
            duration: 25,
            ease: "none",
            repeat: -1,
          }
        );
      }
    },
    { dependencies: [isMobile] }
  );

  return (
    <section
      className="min-h-screen max-sm:min-h-full max-sm:py-[15%]  w-screen overflow-hidden h-fit flex flex-col items-center justify-center relative container  !py-[7%]"
    >
      <div className="w-full h-full flex flex-col items-center justify-center gap-32 relative z-[2] max-sm:gap-20">
        <div className=" w-fit px-[5vw] max-sm:px-[7vw]">
            <HeadingAnim>
          <h2 className="text-76  text-[#0A1B4B] text-center mx-auto">
           Core Open-Source Expertise
          </h2>
          </HeadingAnim>
        </div>

        <div className="space-y-28 max-sm:!space-y-15">
          <div className=" fadeup max-md:my-[7vw] w-fit">
            <div
              ref={marqueeRef1}
              className="flex  space-x-1  max-md:space-x-[7vw] max-sm:space-x-[5vw]"
            >
              {firstHalfAwards.map((item, index) => (
                <AwardItem key={index} img={item.img} />
              ))}
              {firstHalfAwards.map((item, index) => (
                <AwardItem key={`duplicate-${index}`} img={item.img} />
              ))}
              {firstHalfAwards.map((item, index) => (
                <AwardItem key={`duplicate-${index}`} img={item.img} />
              ))}
            </div>
          </div>

          <div className="fadeup max-md:my-[7vw] max-sm:space-x-[5vw] w-fit">
            <div
              ref={marqueeRef2}
              className="flex opens-source max-md:space-x-[7vw] max-sm:space-x-[10vw]"
            >
              {secondHalfAwards.map((item, index) => (
                <AwardItem key={index} img={item.img} />
              ))}
              {secondHalfAwards.map((item, index) => (
                <AwardItem key={`duplicate-${index}`} img={item.img} />
              ))}
              {secondHalfAwards.map((item, index) => (
                <AwardItem key={`duplicate-${index}`} img={item.img} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;

const awards = [
  {
    img: "/assets/infosys-finacle/open-source/Apache_Tomcat_logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Apache-Flink-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/cordova-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/docker-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/elasticsearch-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/fluentbit-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/graylog-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Haproxy-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/HDFS-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/iReport-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Istio-bluelogo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Jaeger-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/JBoss_logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/jQuery-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Kafka_logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Kibana.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Kubernetes_logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/mongodb_logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/nginx_logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/nodejs_logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Postgresql_elephant.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Python-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/rabbitmq-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Red_Hat_logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Redis_logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Spinnaker-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Spring_Boot.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Spring-boot-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Spring-Cloud-Stream-logo.png",
  },
  {
    img: "/assets/infosys-finacle/open-source/Zookeeper_logo.png",
  },
];

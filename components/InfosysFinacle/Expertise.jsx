"use client";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from "@gsap/react";
import HeadingAnim from "../Animations/HeadingAnim";

const AwardItem = ({ img, label }) => {
  return (
    <div className="flex-shrink-0 h-[13vw] flex flex-col items-center justify-center gap-[1vw] w-[15vw] max-md:!w-[25vw] max-sm:!w-[30vw] max-md:gap-[2vw] border border-primary-blue/50 rounded-lg bg-white py-[2vw] shadow-sm drop-shadow-lg">
      <div className="w-[10vw] h-auto max-md:w-[18vw] max-sm:!w-[30vw]">
        <Image
          src={img}
          height={130}
          width={190}
          alt={label}
          className="h-full w-full object-contain"
        />
      </div>

      <p className="text-center font-heading! text-24 max-md:text-[2vw] max-sm:text-[3vw]">
        {label}
      </p>
    </div>
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

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // FIRST MARQUEE
      if (marqueeRef1.current) {
        const track = marqueeRef1.current;

        gsap.set(track, { willChange: "transform" });

        gsap.to(track, {
          xPercent: -33.3333, // because you're duplicating 3 times
          duration: 25,
          ease: "none",
          repeat: -1,
          force3D: true,
        });
      }

      // SECOND MARQUEE
      if (marqueeRef2.current) {
        const track = marqueeRef2.current;

        gsap.set(track, { willChange: "transform" });

        gsap.fromTo(
          track,
          { xPercent: -33.3333 },
          {
            xPercent: 0,
            duration: 25,
            ease: "none",
            repeat: -1,
            force3D: true,
          },
        );
      }
    });

    return () => ctx.revert(); // cleanup properly
  }, []);

  return (
    <section className="min-h-screen  max-md:min-h-full max-sm:py-[15%]  w-screen overflow-x-hidden h-fit flex flex-col items-center justify-center relative py-[7%] max-md:py-[18%]">
      <div className="w-full h-full flex flex-col items-center justify-center gap-16 relative z-[2] max-sm:gap-20">
        <div className=" w-fit px-[5vw] max-sm:px-[7vw]">
          <HeadingAnim>
            <h2 className="text-76  text-[#0A1B4B] text-center mx-auto">
              Core Open - Source Expertise
            </h2>
          </HeadingAnim>
        </div>

        <div className="space-y-12 max-sm:!space-y-10">
          <div className=" fadeup max-md:my-[7vw] ">
            <div
              ref={marqueeRef1}
              className="flex  space-x-4  max-md:space-x-[3vw] max-sm:space-x-[5vw]"
            >
              {firstHalfAwards.map((item, index) => (
                <AwardItem key={index} img={item.img} label={item.label} />
              ))}
              {firstHalfAwards.map((item, index) => (
                <AwardItem key={index} img={item.img} label={item.label} />
              ))}
              {firstHalfAwards.map((item, index) => (
                <AwardItem key={index} img={item.img} label={item.label} />
              ))}
            </div>
          </div>

          <div className="fadeup max-md:my-[10vw] max-sm:my-[7vw] max-sm:space-x-[5vw] ">
            <div
              ref={marqueeRef2}
              className="flex space-x-4 max-md:space-x-[3vw] max-sm:space-x-[5vw]"
            >
              {secondHalfAwards.map((item, index) => (
                <AwardItem key={index} img={item.img} label={item.label} />
              ))}
              {secondHalfAwards.map((item, index) => (
                <AwardItem key={index} img={item.img} label={item.label} />
              ))}
              {secondHalfAwards.map((item, index) => (
                <AwardItem key={index} img={item.img} label={item.label} />
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
    label: "Apache Tomcat",
  },
  {
    img: "/assets/infosys-finacle/open-source/Apache-Flink-logo.png",
    label: "Apache Flink",
  },
  {
    img: "/assets/infosys-finacle/open-source/cordova-logo.png",
    label: "Apache Cordova",
  },
  {
    img: "/assets/infosys-finacle/open-source/docker-logo.png",
    label: "Docker",
  },
  {
    img: "/assets/infosys-finacle/open-source/elasticsearch-logo.png",
    label: "Elasticsearch",
  },
  {
    img: "/assets/infosys-finacle/open-source/fluentbit-logo.png",
    label: "Fluent Bit",
  },
  {
    img: "/assets/infosys-finacle/open-source/graylog-logo.png",
    label: "Graylog",
  },
  {
    img: "/assets/infosys-finacle/open-source/Haproxy-logo.png",
    label: "HAProxy",
  },
  {
    img: "/assets/infosys-finacle/open-source/HDFS-logo.png",
    label: "HDFS",
  },
  {
    img: "/assets/infosys-finacle/open-source/iReport-logo.png",
    label: "iReport",
  },
  {
    img: "/assets/infosys-finacle/open-source/Istio-bluelogo.png",
    label: "Istio",
  },
  {
    img: "/assets/infosys-finacle/open-source/Jaeger-logo.png",
    label: "Jaeger",
  },
  {
    img: "/assets/infosys-finacle/open-source/JBoss_logo.png",
    label: "JBoss",
  },
  {
    img: "/assets/infosys-finacle/open-source/jQuery-logo.png",
    label: "jQuery",
  },
  {
    img: "/assets/infosys-finacle/open-source/Kafka_logo.png",
    label: "Apache Kafka",
  },
  {
    img: "/assets/infosys-finacle/open-source/Kibana.png",
    label: "Kibana",
  },
  {
    img: "/assets/infosys-finacle/open-source/Kubernetes_logo.png",
    label: "Kubernetes",
  },
  {
    img: "/assets/infosys-finacle/open-source/mongodb_logo.png",
    label: "MongoDB",
  },
  {
    img: "/assets/infosys-finacle/open-source/nginx_logo.png",
    label: "NGINX",
  },
  {
    img: "/assets/infosys-finacle/open-source/nodejs_logo.png",
    label: "Node.js",
  },
  {
    img: "/assets/infosys-finacle/open-source/Postgresql_elephant.png",
    label: "PostgreSQL",
  },
  {
    img: "/assets/infosys-finacle/open-source/Python-logo.png",
    label: "Python",
  },
  {
    img: "/assets/infosys-finacle/open-source/rabbitmq-logo.png",
    label: "RabbitMQ",
  },
  {
    img: "/assets/infosys-finacle/open-source/Red_Hat_logo.png",
    label: "Red Hat",
  },
  {
    img: "/assets/infosys-finacle/open-source/Redis_logo.png",
    label: "Redis",
  },
  {
    img: "/assets/infosys-finacle/open-source/Spinnaker-logo.png",
    label: "Spinnaker",
  },
  {
    img: "/assets/infosys-finacle/open-source/Spring_Boot.png",
    label: "Spring Boot",
  },
  {
    img: "/assets/infosys-finacle/open-source/Spring-boot-logo.png",
    label: "Spring Boot",
  },
  {
    img: "/assets/infosys-finacle/open-source/Spring-Cloud-Stream-logo.png",
    label: "Spring Cloud Stream",
  },
  {
    img: "/assets/infosys-finacle/open-source/Zookeeper_logo.png",
    label: "Apache Zookeeper",
  },
];

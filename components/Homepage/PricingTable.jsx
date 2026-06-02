"use client";

import React from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

const CheckIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto h-[2.3vw] w-[2.3vw] max-md:h-[4vw] max-md:w-[4vw] max-sm:h-[6vw] max-sm:w-[6vw]"
  >
    <path
      d="M9 17.5L14.3 22.8L25.5 11.5"
      stroke="#0205FA"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RobotIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-[2.5vw] w-[2.5vw] max-md:h-[5vw] max-md:w-[5vw] max-sm:h-[7vw] max-sm:w-[7vw]">
    <rect x="9" y="16" width="30" height="22" rx="3" stroke="#0205FA" strokeWidth="2.6" />
    <path d="M24 16V9" stroke="#0205FA" strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="24" cy="7" r="2.5" stroke="#0205FA" strokeWidth="2.2" />
    <circle cx="18" cy="27" r="2" fill="#0205FA" />
    <circle cx="30" cy="27" r="2" fill="#0205FA" />
    <path d="M4 24H9" stroke="#0205FA" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M39 24H44" stroke="#0205FA" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

const CurrencyIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-[2.5vw] w-[2.5vw] max-md:h-[5vw] max-md:w-[5vw] max-sm:h-[7vw] max-sm:w-[7vw]">
    <circle cx="24" cy="24" r="18" stroke="#0205FA" strokeWidth="2.6" />
    <path d="M17 15H31" stroke="#0205FA" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M17 21H31" stroke="#0205FA" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M20 15C27 15 29 21 23 25L18 25L29 34" stroke="#0205FA" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-[2.5vw] w-[2.5vw] max-md:h-[5vw] max-md:w-[5vw] max-sm:h-[7vw] max-sm:w-[7vw]">
    <path d="M28 8C34 8 39 9 40 10C39 19 35 26 28 31L18 21C21 14 24 10 28 8Z" stroke="#0205FA" strokeWidth="2.6" strokeLinejoin="round" />
    <circle cx="30" cy="18" r="3.5" stroke="#0205FA" strokeWidth="2.4" />
    <path d="M18 21L10 23L16 29" stroke="#0205FA" strokeWidth="2.6" strokeLinejoin="round" />
    <path d="M28 31L25 39L19 33" stroke="#0205FA" strokeWidth="2.6" strokeLinejoin="round" />
    <path d="M15 33L9 39" stroke="#0205FA" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M20 36L17 42" stroke="#0205FA" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M12 28L6 31" stroke="#0205FA" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

const SupportIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-[2.5vw] w-[2.5vw] max-md:h-[5vw] max-md:w-[5vw] max-sm:h-[7vw] max-sm:w-[7vw]">
    <path d="M12 27V22C12 15 17 10 24 10C31 10 36 15 36 22V27" stroke="#0205FA" strokeWidth="2.6" strokeLinecap="round" />
    <rect x="8" y="25" width="7" height="10" rx="3" stroke="#0205FA" strokeWidth="2.6" />
    <rect x="33" y="25" width="7" height="10" rx="3" stroke="#0205FA" strokeWidth="2.6" />
    <path d="M36 35C36 39 32 41 27 41" stroke="#0205FA" strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="24" cy="41" r="2.2" stroke="#0205FA" strokeWidth="2.2" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-[2.5vw] w-[2.5vw] max-md:h-[5vw] max-md:w-[5vw] max-sm:h-[7vw] max-sm:w-[7vw]">
    <circle cx="24" cy="24" r="18" stroke="#0205FA" strokeWidth="2.6" />
    <circle cx="24" cy="19" r="6" stroke="#0205FA" strokeWidth="2.6" />
    <path d="M13 36C15.5 30.5 19 28 24 28C29 28 32.5 30.5 35 36" stroke="#0205FA" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-[2.5vw] w-[2.5vw] max-md:h-[5vw] max-md:w-[5vw] max-sm:h-[7vw] max-sm:w-[7vw]">
    <path d="M24 7L38 13V23C38 33 32 39 24 42C16 39 10 33 10 23V13L24 7Z" stroke="#0205FA" strokeWidth="2.6" strokeLinejoin="round" />
    <path d="M18 24L22 28L31 19" stroke="#0205FA" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PricingTable = ({ region = "IN" }) => {
  const pricingByRegion = {
    IN: {
      currencyLabel: "INR",
      pricePrefix: "₹",
      plans: [
        {
          name: "Starter",
          useCases: "Upto 5 Use Cases",
          price: "45,00,000",
        },
        {
          name: "Growth",
          useCases: "Upto 15 Use Cases",
          price: "85,00,000",
          popular: true,
        },
        {
          name: "Scale",
          useCases: "Upto 40 Use Cases",
          price: "1,50,00,000",
        },
        {
          name: "Enterprise Edition",
          useCases: "Unlimited Use Cases",
          price: "Contact Sales",
          isContact: true,
        },
      ],
    },
    US: {
      currencyLabel: "USD",
      pricePrefix: "$",
      plans: [
        {
          name: "Starter",
          useCases: "Upto 5 Use Cases",
          price: "50,000",
        },
        {
          name: "Growth",
          useCases: "Upto 15 Use Cases",
          price: "95,000",
          popular: true,
        },
        {
          name: "Scale",
          useCases: "Upto 40 Use Cases",
          price: "1,50,000",
        },
        {
          name: "Enterprise Edition",
          useCases: "Unlimited Use Cases",
          price: "Contact Sales",
          isContact: true,
        },
      ],
    },
  };

  const activePricing = pricingByRegion[region] || pricingByRegion.IN;

  const inclusions = [
    {
      icon: <RobotIcon />,
      label: "AI-ML / Agentic AI Use Cases",
    },
    {
      icon: <CurrencyIcon />,
      label: `Annual Subscription (${activePricing.currencyLabel})`,
    },
    {
      icon: <RocketIcon />,
      label: "Deployment & Activation",
    },
    {
      icon: <SupportIcon />,
      label: "24*7 Enterprise Support",
    },
    {
      icon: <UserIcon />,
      label: "Dedicated Technical Success Manager (TSM)",
    },
    {
      icon: <ShieldIcon />,
      label: "Enterprise Ownership (No Vendor Lock-in)",
    },
  ];

  const getPrice = (plan) => {
    if (plan.isContact) return plan.price;

    if (activePricing.currencyLabel === "USD") {
      return `${activePricing.pricePrefix}${plan.price}`;
    }

    return `${activePricing.pricePrefix} ${plan.price}`;
  };

  return (
    <section className="w-full  px-[5vw] pb-[5vw] py-[7%] relative z-100 bg-white max-md:py-[15%] max-md:px-0">
      <HeadingAnim>
        <h2 className="text-center mx-auto text-[#071B52] w-[85%] text-76 leading-[1.2] mb-8 font-normal max-md:text-[5vw] max-md:mb-[8vw] max-sm:text-[9vw] max-sm:mb-[10vw]">
          Scale your AI. Not Cost.
        </h2>
      </HeadingAnim>
      <div className=" mb-[7vw] space-y-[1vw] max-sm:space-y-[4vw]">
        <Copy>
          <p className="w-[70%] mx-auto text-24 text-center max-md:w-[90%] ">
            Most AI vendors charge more every time you add a model, deploy an agent, expand a workflow, or launch a new use case. What begins as a pilot often becomes a growing collection of licenses, subscriptions, and usage-based costs.

          </p>
        </Copy>
        <Copy>
          <p className="w-[70%] mx-auto text-24 text-center max-md:w-[90%] ">
            DSW UnifyAI OS changes that model entirely.
          </p>
        </Copy>
        <Copy>
          <p className="w-[70%] mx-auto text-24 text-center max-md:w-[90%] ">
            With a single subscription and one governed runtime, enterprises can build, deploy, govern, and operate unlimited AI and Agentic AI use cases across the organization. No per-model pricing. No per-agent pricing. No penalties for scaling innovation.

          </p>
        </Copy>
        <Copy>
          <p className="w-[70%] mx-auto text-24 text-center max-md:w-[90%] ">
            Because enterprise AI should scale outcomes, not costs.

          </p>
        </Copy>

      </div>

      <div className="w-full max-md:overflow-x-auto max-sm:pb-[8vw] mobile-scrollbar max-md:px-[7vw] max-md:py-[10vw] fadeup">
        <div className="grid grid-cols-[2.05fr_repeat(4,1fr)] gap-[1vw] max-md:min-w-[200vw] max-sm:min-w-[345vw] max-md:gap-[2vw] max-sm:gap-[4vw]">
          <div className="overflow-hidden rounded-[1vw] border border-[#D9D9D9] bg-[#EAF4FF] max-md:rounded-[2vw] max-sm:rounded-[4vw]">
            <div className="h-[4.5vw] bg-[#0205FA] flex items-center px-[2vw] max-md:h-[8vw] max-sm:h-[14vw] max-sm:px-[5vw]">
              <h3 className="text-white text-[1.35vw] font-medium max-md:text-[2.5vw] max-sm:text-[5vw]">
                Inclusions
              </h3>
            </div>

            <div>
              {inclusions.map((item, index) => (
                <div
                  key={index}
                  className="h-[5.25vw] flex items-center gap-[1.6vw] px-[2vw] border-b border-[#D9D9D9] last:border-b-0 max-md:h-[9vw] max-md:gap-[3vw] max-sm:h-[17vw] max-sm:gap-[5vw] max-sm:px-[5vw]"
                >
                  <div className="shrink-0">{item.icon}</div>

                  <p className="text-[#111111] text-[1.25vw] leading-[1.15] max-md:text-[2.6vw] max-sm:text-[5vw]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {activePricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[1vw] pointer-events-none bg-white border overflow-visible max-md:rounded-[2vw] max-sm:rounded-[4vw] border-[#D9D9D9]`}
            >
              {plan.popular && (
                <div className="w-[105%] h-[110%] rounded-[1vw] border border-[#0205FA] absolute top-[-5%] left-[-2.5%] z-2 max-sm:rounded-[4vw]">

                  <div className="absolute top-[-2%] left-1/2 -translate-x-1/2 z-10 h-[1.8vw] min-w-[9.6vw] rounded-full border border-[#0205FA] bg-white flex items-center justify-center px-[1.2vw] max-md:top-[-1.7vw] max-md:h-[3.4vw] max-md:min-w-[17vw] max-sm:top-[-3.5vw] max-sm:h-[7vw] max-sm:min-w-[35vw]">
                    <span className="text-[#0205FA] text-[1vw] font-medium leading-none max-md:text-[2vw] max-sm:text-[4vw]">
                      Most Popular
                    </span>
                  </div>
                </div>
              )}

              <div className="overflow-hidden rounded-[0.85vw] max-md:rounded-[1.8vw] max-sm:rounded-[3.6vw]">
                <div className="h-[4.5vw] bg-[#0205FA] flex items-center justify-center px-[1vw] max-md:h-[8vw] max-sm:h-[14vw]">
                  <h3 className="text-white text-center text-[1.35vw] font-medium leading-[1.1] max-md:text-[2.5vw] max-sm:text-[4.8vw]">
                    {plan.name}
                  </h3>
                </div>

                <div>
                  <div className="h-[5.25vw] flex items-center justify-center px-[1vw] border-b border-[#D9D9D9] max-md:h-[9vw] max-sm:h-[17vw]">
                    <p className="text-[#111111] text-center text-[1.25vw] leading-[1.15] font-semibold max-md:text-[2.5vw] max-sm:text-[4.6vw]">
                      {plan.useCases}
                    </p>
                  </div>

                  <div className="h-[5.25vw] flex items-center justify-center px-[1vw] border-b border-[#D9D9D9] max-md:h-[9vw] max-sm:h-[17vw]">
                    <p className="text-[#111111] text-center text-[1.25vw] leading-[1.15] max-md:text-[2.5vw] max-sm:text-[4.6vw]">
                      {getPrice(plan)}
                    </p>
                  </div>

                  {[0, 1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-[5.25vw] flex items-center justify-center px-[1vw] border-b border-[#D9D9D9] last:border-b-0 max-md:h-[9vw] max-sm:h-[17vw]"
                    >
                      <CheckIcon />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Copy>
        <div className="mt-[3vw] text-[#111111] text-[1.35vw] leading-[1.6] max-md:text-[2.5vw] max-md:mt-[5vw] max-sm:text-[4.6vw] max-sm:px-[5vw] max-sm:mt-[6vw] max-md:px-[7vw]">
          <p>* All prices are exclusive of applicable taxes</p>
          <p>* No separate installation or activation charges</p>
        </div>

      </Copy>
    </section>
  );
};

export default PricingTable;
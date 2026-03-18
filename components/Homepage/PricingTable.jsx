"use client";

import React from "react";

const PricingTable = ({ region = "IN" }) => {
  const pricingByRegion = {
    IN: {
      currencySymbol: "INR",
      slabs: [
        {
          capability: "Starter",
          delivers: "Up to 5 Use Cases",
          price: "45,00,000",
        },
        {
          capability: "Growth",
          delivers: "Up to 15 Use Cases",
          price: "85,00,000",
        },
        {
          capability: "Scale",
          delivers: "Up to 40 Use Cases",
          price: "1,50,00,000",
        },
        {
          capability: "Enterprise Edition",
          delivers: "Unlimited Use Cases",
          price: "3,50,00,000",
        },
      ],
    },
    US: {
      currencySymbol: "USD",
      slabs: [
        {
          capability: "Starter",
          delivers: "Up to 5 Use Cases",
          price: "54,000",
        },
        {
          capability: "Growth",
          delivers: "Up to 15 Use Cases",
          price: "102,000",
        },
        {
          capability: "Scale",
          delivers: "Up to 40 Use Cases",
          price: "180,000",
        },
        {
          capability: "Enterprise Edition",
          delivers: "Unlimited Use Cases",
          price: "420,000",
        },
      ],
    },
    EU: {
      currencySymbol: "EUR",
      slabs: [
        {
          capability: "Starter",
          delivers: "Up to 5 Use Cases",
          price: "50,000",
        },
        {
          capability: "Growth",
          delivers: "Up to 15 Use Cases",
          price: "95,000",
        },
        {
          capability: "Scale",
          delivers: "Up to 40 Use Cases",
          price: "168,000",
        },
        {
          capability: "Enterprise Edition",
          delivers: "Unlimited Use Cases",
          price: "392,000",
        },
      ],
    },
  };

  const activePricing = pricingByRegion[region] || pricingByRegion.IN;
  const capabilities = activePricing.slabs;

  const line = `
    w-[5px] h-[1px]
    duration-300 ease-in-out
  `;

  return (
    <div className="w-[65%] max-sm:overflow-y-hidden max-sm:w-screen max-sm:overflow-x-hidden mx-auto relative max-md:w-[85%] pb-[7%] max-md:pb-[10%] max-sm:pb-[15%] max-sm:mt-[-20vw] max-md:-mt-[10vw]">
      <div className="w-full max-sm:overflow-x-scroll mobile-scrollbar max-sm:pb-[8vw] max-sm:overflow-y-hidden max-sm:px-[5vw] max-sm:mx-0 relative">
        <div className="w-full max-sm:w-[150%] mx-auto relative">
          <div>
            <div className="absolute z-10 w-fit h-fit group-hover:-top-[3%] group-hover:-left-[3%] duration-300 ease-in-out ">
              <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
              <div
                className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2.2px] -left-1/2`}
              />
            </div>

            <div className="absolute z-10 top-[0.6%] right-[-0.2%] w-fit h-fit rotate-90 group-hover:-top-[2.2%] group-hover:-right-[4.5%] duration-300 ease-in-out max-sm:right-[-0.4%]">
              <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
              <div
                className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
              />
            </div>

            <div className="absolute bottom-[0.55%] z-10 left-[-0.2%] w-fit h-fit -rotate-90 group-hover:-bottom-[2.2%] group-hover:-left-[4.5%] duration-300 ease-in-out max-sm:-left-[0.4%]">
              <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
              <div
                className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
              />
            </div>

            <div className="absolute -bottom-0 z-10 right-[0.05%] w-fit h-fit rotate-180 group-hover:-bottom-[3%] group-hover:-right-[3%] duration-300 ease-in-out max-sm:right-[0.1%]">
              <div className={`${line} bg-black group-hover:bg-[#0205fa]`} />
              <div
                className={`${line} bg-black group-hover:bg-[#0205fa] rotate-90 absolute top-[2px] -left-1/2`}
              />
            </div>
          </div>
          <table className="border-collapse w-full h-full border border-[#D9D9D9]">
            <thead>
              <tr className="bg-white">
                <th className="border border-[#D9D9D9] text-foreground max-sm:text-[5vw]! px-6 py-6 text-left text-44 font-medium font-heading">
                  Slab
                </th>
                <th className="border border-[#D9D9D9] max-sm:text-[5vw]! px-6 py-6 text-left text-44 font-medium font-heading text-primary-blue">
                  AI Use Case Capacity (Self-built)
                </th>
                <th className="border border-[#D9D9D9] max-sm:text-[5vw]! px-6 py-6 text-left text-44 font-medium font-heading text-primary-blue">
                  Annual Subscription
                </th>
              </tr>
            </thead>
            <tbody>
              {capabilities.map((item, index) => (
                <tr key={index} className="bg-white">
                  <td className="border border-[#D9D9D9] max-sm:pl-[8vw] px-6 py-5 text-30 text-foreground">
                    {item.capability}
                  </td>
                  <td className="border border-[#D9D9D9] px-6 py-5 text-24 text-[#333333]">
                    {item.delivers}
                  </td>
                  <td className="border border-[#D9D9D9] px-6 py-5 text-24 text-[#333333] font-medium">
                    {activePricing.currencySymbol} {item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;

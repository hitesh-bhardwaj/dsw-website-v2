import Link from "next/link";
import React from "react";

export default function TechnologyMenu({ data }) {
  if (!data) return null;

  return (
    <div className="w-full h-full flex">
      {data.children.map((column, columnIndex) => (
        <div key={column.id} className="w-[40vw] flex justify-between">
          <div
            className={`flex justify-between w-full ${
              columnIndex !== 0 ? "pl-[2vw]" : ""
            }`}
          >
            <div className="flex flex-col space-y-[1.5vw] w-[75%] py-[3vw]">
              <Link
                href={column.href}
                className="ahLink text-32 font-light text-foreground hover:text-primary-blue duration-500 ease-out"
              >
                <span className="ahLink__mask h-[2.2vw]">
                  <span className="ahLink__line">{column.label}</span>
                  <span className="ahLink__line buttonTextShadow text-primary-blue">
                    {column.label}
                  </span>
                </span>
              </Link>

              <p className="text-[#333333]">{column.description}</p>
            </div>

            <div
              className={`w-[1px] h-full bg-black/20 ${
                columnIndex === data.children.length - 1 ? "hidden" : ""
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
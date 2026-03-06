import Link from "next/link";
import React from "react";

export default function ResourcesMenu({ data }) {
  if (!data) return null;

  const groups = data.megaMenu?.groups || [];

  return (
    <div className="w-full h-full flex">
      {groups.map((group, columnIndex) => {
        const items = data.children.filter((item) => item.group === group);

        return (
          <div
            key={group}
            className={`w-[33%] flex justify-between ${
              columnIndex !== 0 ? "pl-[2vw]" : ""
            }`}
          >
            <div className="flex flex-col gap-[2vw] w-[80%]">
              <h4 className="text-primary-blue text-24 font-medium">
                {group}
              </h4>

              {items.map((item) => (
                <div key={item.id} className="gap-[0.5vw] flex flex-col">
                  <Link
                    href={item.href}
                    className="ahLink text-32 font-light w-fit text-foreground hover:text-primary-blue duration-500 ease-out"
                  >
                    <span className="ahLink__mask h-[2.2vw]">
                      <span className="ahLink__line">{item.label}</span>
                      <span className="ahLink__line buttonTextShadow text-primary-blue">
                        {item.label}
                      </span>
                    </span>
                  </Link>

                  <p className="text-[#333333]">{item.description}</p>
                </div>
              ))}
            </div>

            {columnIndex !== groups.length - 1 && (
              <div className="w-[1px] h-full bg-black/20" />
            )}
          </div>
        );
      })}
    </div>
  );
}
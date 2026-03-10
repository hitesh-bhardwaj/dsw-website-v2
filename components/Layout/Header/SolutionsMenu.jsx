"use client";

import Link from "next/link";
import Image from "next/image";

export default function SolutionsMenu({ data }) {
  if (!data) return null;

  const itemsMap = new Map(data.children.map((item) => [item.id, item]));
  const columns = data.megaMenu?.columns || [];
  const stories = data.megaMenu?.stories || [];

  return (
    <div className="w-full h-full flex justify-between solutions-menu">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="w-[33%] flex justify-between">
          <div className="flex flex-col gap-[2vw] w-[70%]">
            {column.map((itemId) => {
              const item = itemsMap.get(itemId);
              if (!item) return null;

              return (
                <div key={item.id} className="gap-[0.5vw] flex flex-col">
                  <Link
                    href={item.href}
                    className="ahLink text-30 font-heading! w-fit text-foreground hover:text-primary-blue duration-500 ease-out"
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
              );
            })}
          </div>

          {columnIndex === 1 && <div className="w-[1px] h-full bg-black/20" />}
        </div>
      ))}

      <div className="w-[33%] h-full flex gap-[1.5vw] justify-end">
        <div className="flex w-fit flex-col gap-[1.5vw]">
          <p className="text-30 font-heading!">Customer Stories</p>

          {stories.map((story) => (
            <div
              key={story.name}
              className="w-[22vw] h-[13vw] border border-primary-blue rounded-[1.2vw] p-[1.2vw] flex flex-col justify-between hover:bg-white hover:drop-shadow-lg duration-500 ease-in-out"
            >
              <p className="text-20">{story.quote}</p>

              <div className="flex gap-[1.5vw]">
                <div className="size-[3vw] rounded-full overflow-hidden bg-white border border-black/20">
                  <Image
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-contain"
                    width={30}
                    height={30}
                  />
                </div>

                <div className="w-[70%]">
                  <p>{story.name}</p>
                  <p className="text-20">{story.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
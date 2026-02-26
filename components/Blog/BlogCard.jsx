import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../../lib/datetime";

const BlogCard = ({ title, date, slug, featuredImage }) => {

  return (
    <>
      <Link href={slug}>
        <div className="rounded-3xl fadeup relative group border border-primary-blue h-[33vw]  background-glass space-y-[1.5vw] max-sm:space-y-[5vw] overflow-hidden group cursor-pointer max-sm:pb-0 max-sm:h-[110vw] max-md:h-[70vw] max-md:rounded-[2.5vw] max-sm:rounded-[6vw] max-md:space-y-[2vw]">
          <div className="w-full h-[64%] max-md:h-[60%] overflow-hidden max-sm:rounded-3xl rounded-[1.8vw] relative ">
            <div className="absolute top-[1vw] right-[1vw] size-[3vw] max-sm:size-[10vw] max-md:top-[3vw] max-md:right-[3vw] max-md:size-[7vw] bg-white/10 rounded-full z-10 max-sm:backdrop-blur-xs">
              <svg
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <circle cx="30" cy="30" r="29" stroke="#fff" strokeWidth="1" fill="none" />
                <path
                  d="M22 38L38 22M38 22H26M38 22V34"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {featuredImage && (
              <Image
                src={featuredImage.sourceUrl}
                width={531}
                height={510}
                alt={title}
                className="object-cover h-full w-full group-hover:scale-[1.1] duration-700 ease-in-out transition-all max-sm:w-full max-sm:h-full "
              />
            )}
          </div>
          <div className="space-y-[1vw]  h-[28%] max-sm:space-y-[4.5vw] px-5 max-sm:px-[5vw] max-md:w-full max-md:px-[2.5vw] max-md:space-y-[2vw] flex flex-col max-sm:pb-[4vw] max-sm:pr-[10vw]">
            <h4 className="text-foreground h-auto text-24 w-5/6 leading-normal  max-md:w-full max-md:text-[3vw] max-sm:text-[4.7vw] max-sm:leading-[1.4]">
              {title}
            </h4>
            <p className="text-16 text-gray-1 mt-auto  ">
              {formatDate(date)}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
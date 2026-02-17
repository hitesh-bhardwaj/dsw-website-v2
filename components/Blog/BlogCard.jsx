import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../../lib/datetime";

const BlogCard = ({ title, date, slug, featuredImage }) => {

  return (
    <>
      <Link href={slug}>
        <div className="rounded-[1.8vw] fadeup relative group border-[0.25px] border-primary-blue h-[33vw]  background-glass space-y-[2vw] max-sm:space-y-[8vw] overflow-hidden group cursor-pointer max-sm:pb-0 max-sm:h-[110vw] max-md:h-[80vw] max-md:rounded-[4vw] max-sm:rounded-[6vw] max-md:space-y-[5vw]">
          <div className="w-full h-[64%] max-sm:h-[60%] overflow-hidden max-sm:rounded-3xl rounded-[1.8vw] relative">
            <div className="absolute top-[1vw] right-[1vw] size-[3vw] max-sm:size-[10vw] max-sm:top-[3vw] max-sm:right-[3vw] bg-white/10 rounded-full z-10">
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
          <div className="space-y-[1vw] max-sm:space-y-[4vw] px-5 max-md:w-full max-sm:w-full max-md:px-[2.5vw] max-md:space-y-[2vw]">
            <h4 className="text-foreground h-auto text-24 w-5/6 leading-normal max-md:w-[80%] max-sm:w-full max-md:text-[3vw] max-sm:text-[4.5vw]">
              {title}
            </h4>
            <p className="text-20 text-gray-1 mt-auto max-md:text-[2vw] max-sm:text-[3.5vw] ">
              {formatDate(date)}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
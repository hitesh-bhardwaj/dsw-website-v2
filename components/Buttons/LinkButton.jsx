import Link from "next/link";

const LinkButton = ({ href, text, className = "" }) => {
  return (
    <Link
      href={href}
      className={`text-primary-blue w-fit pt-[1vw] text-24 group max-md:order-4 ${className}`}
    >
      <span className="before:absolute before:block relative before:w-0 before:h-px before:bottom-0 before:left-0 before:bg-primary-blue group-hover:before:w-full before:duration-300">
        {text}
      </span>
    </Link>
  );
};

export default LinkButton;
 
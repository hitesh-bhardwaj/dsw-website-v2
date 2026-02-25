import Link from "next/link";

const LinkButton = ({ href, text, className = "" }) => {
  return (
    <Link
      href={href}
      className={`text-24! max-sm:text-24 max-md:text-[2.8vw] cursor-pointer text-primary-blue font-medium hover:underline transition duration-100 pl-0 ml-0 ${className}`}
    >
      <span className="before:absolute before:block relative before:w-0 before:h-px before:bottom-0 before:left-0 before:bg-primary-blue group-hover:before:w-full before:duration-300">
        {text}
      </span>
    </Link>
  );
};

export default LinkButton;

import Link from "next/link";

const LinkButton = ({ href, text, className = "" }) => {
  return (
    <Link
      href={href}
      className={`text-24! cursor-pointer text-primary-blue font-medium hover:underline transition duration-100 pl-0 ml-0 ${className}`}
    >
      {text}
    </Link>
  );
};

export default LinkButton;

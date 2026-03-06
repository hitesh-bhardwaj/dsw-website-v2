import Link from "next/link";

export default function AnimatedHoverLink({
  href = "#",
  children,
  className = "",
  maskClassName = "",
  bottomClassName = "buttonTextShadow",
  prefetch = false,
  ...props
}) {
  return (
    <Link
      prefetch={prefetch}
      href={href}
      {...props}
      className={`ahLink ${className}`}
    >
      <span className={`ahLink__mask ${maskClassName} `}>
        <span className="ahLink__line ahLink__line--top">{children}</span>
        <span className={`ahLink__line ahLink__line--bottom ${bottomClassName}`}>
          {children}
        </span>
      </span>
    </Link>
  );
}
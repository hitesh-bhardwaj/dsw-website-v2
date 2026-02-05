import Link from "next/link";
import Image from "next/image";
import PrimaryButton from "../Buttons/PrimaryButton";
import { ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { label: "About Us", href: "#", drop: false },
  { label: "Technology", href: "#", drop: true },
  { label: "Solutions", href: "#", drop: true },
  { label: "Pilot Program", href: "#", drop: false },
  { label: "Resources", href: "#", drop: true },
];

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-6">
      {/* Logo */}
      <div className="flex items-center gap-2 w-[12%]">
        <Link href="/" className="flex items-center">
          <Image
            src="/dsw-logo.svg"
            alt="DSW Logo"
            width={150}
            height={50}
            className="h-12 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="flex items-center gap-8 text-md font-medium w-fit">
        {NAV_LINKS.map(({ label, href, drop }) => (
          <Link key={label} href={href} className="flex gap-2">
            <p>{label}</p>
            {drop && (
              <div className="w-4">
                <ChevronDown className="w-full h-full" />
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-6">
        <PrimaryButton text="Contact Us" href="#" />
      </div>
    </nav>
  );
}

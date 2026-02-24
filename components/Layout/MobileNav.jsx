"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { Facebook, Insta, LinkedIn, Twitter, Youtube } from "../Svg/Icons";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NAV_LINKS = [
  { id: "about", label: "About Us", href: "/about", drop: false },
  {
    id: "technology",
    label: "Technology",
    href: "#",
    drop: true,
    children: [
      { id: "tech-1", label: "AIOS Technical", href: "/aios-technical" },
      { id: "tech-2", label: "AI/ML Runtime", href: "/unifyai" },
      { id: "tech-3", label: "AgenticAI Runtime", href: "/agentic-ai" },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    href: "#",
    drop: true,
    children: [
     { id: "sol-1", label: "Insurance", href: "/solutions/insurance" },
      { id: "sol-2", label: "Banking", href: "/solutions/banking" },
       { id: "sol-3", label: "Retail", href: "/solutions/retail" },
      { id: "sol-4", label: "Healthcare", href: "/solutions/healthcare" },
       { id: "sol-5", label: "Manufacturing", href: "/solutions/manufacturing" },
      { id: "sol-6", label: "Telecom", href: "/solutions/telecom" },
      {id:"sol-7", label:"Financial Services", href:"/solutions/financial-services"}
    ],
  },
  // { id: "pilot", label: "Pilot Program", href: "#", drop: false },
  { id: "opensource", label: "Open Source", href: "/infosys-finacle", drop: false },
  {
    id: "resources",
    label: "Resources",
    href: "#",
    drop: true,
    children: [
      { id: "res-1", label: "Case Studies", href: "#" },
      { id: "res-2", label: "In the News", href: "/news" },
      { id: "res-3", label: "Blogs", href: "/blogs" },
      { id: "res-4", label: "Events", href: "/webinars-and-events" },
      { id: "res-5", label: "Videos", href: "/product-videos" },
      { id: "res-6", label: "Whitepapers", href: "#" },
      { id: "res-7", label: "Workshops", href: "/ai-insurance-workshops" },
      { id: "res-8", label: "Masterclass", href: "/dsw-workshop-deeptech-ai-genai-hands-on-masterclass" },
    ],
  },
  { id: "contact", label: "Contact Us", href: "/contact-us", drop: false },
];

const SOCIAL_LINKS = [
  { id: "linkedin", href: "https://www.linkedin.com/company/data-science-wizards/", icon: <LinkedIn /> },
  { id: "instagram", href: "https://www.instagram.com/datasciencewizards/", icon: <Insta /> },
  { id: "facebook", href: "https://www.facebook.com/datasciencewizards/", icon: <Facebook /> },
  { id: "twitter", href: "https://x.com/dswizards", icon: <Twitter /> },
  { id: "youtube", href: "https://www.youtube.com/@DataScienceWizards", icon: <Youtube /> },
];

export default function MobileNav({ isOpen, onClose }) {
  const [expandedItem, setExpandedItem] = useState(null);
  const menuRef = useRef(null);
  const lenis = useLenis();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isOpen, lenis]);

  // GSAP animation for menu
  useGSAP(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleLinkClick = () => {
    onClose();
    setExpandedItem(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 md:hidden bg-white/80">
      {/* Menu Card */}
      <div
        data-lenis-prevent
        ref={menuRef}
        className="absolute top-[5vw] left-[5vw] right-[5vw] bottom-[5vw] border backdrop-blur-xl border-[#d4d4d4] rounded-[8vw] overflow-hidden flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[4vw] right-[4vw] w-[12vw] h-[12vw] bg-primary rounded-full flex items-center justify-center z-10"
          aria-label="Close menu"
        >
          <X className="w-[6vw] h-[6vw] text-white" strokeWidth={2} />
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-[6vw] pt-[18vw] pb-[4vw]">
          <ul className="space-y-0">
            {NAV_LINKS.map((link) => {
              const hasChildren = Array.isArray(link.children) && link.children.length > 0;
              const isExpanded = expandedItem === link.id;

              return (
                <li key={link.id} className="border-b border-primary-blue">
                  {hasChildren ? (
                    <>
                      {/* Expandable Item */}
                      <button
                        onClick={() => toggleExpand(link.id)}
                        className="w-full flex items-center justify-between py-[5vw] pr-[2vw]"
                      >
                        <span className={`text-[4.5vw] tracking-[0.02em] transition-all duration-300 ease-in font-normal ${isExpanded ? "text-primary-blue font-normal" : "text-foreground font-light"}`}>
                          {link.label}
                        </span>
                        <ChevronDown
                          className={`w-[4vw] h-[4vw] text-primary-blue transition-transform duration-500 ${isExpanded ? "rotate-180" : "-rotate-90"}`}
                        />
                      </button>

                      {/* Sub Items */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-[75vw] pb-[8vw]" : "max-h-0"}`}
                      >
                        <ul className="space-y-[3vw] pl-[1vw]">
                          {link.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={child.href}
                                onClick={handleLinkClick}
                                className="text-[4vw] text-foreground font-light tracking-[0.02em] block"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    /* Simple Link */
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className="block py-[5vw] text-[4.5vw] text-foreground font-normal tracking-[0.02em]"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="px-[6vw] pb-[8vw]">
          <p className="text-[4vw] text-foreground font-light tracking-[0.02em] mb-[4vw]">
            Connect With Us
          </p>
          <div className="flex items-center gap-[5vw]">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[8vw] flex items-center justify-center text-foreground hover:text-primary-blue transition-colors"
                aria-label={social.id}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

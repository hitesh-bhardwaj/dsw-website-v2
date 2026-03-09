"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { SOCIAL_LINKS } from "./nav-data";

export default function MobileNav({ isOpen, onClose, navLinks = [] }) {
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleLinkClick = () => {
    onClose();
    setExpandedItem(null);
  };

  return (
    <div
      className={`fixed inset-0 z-999 md:hidden bg-white/80 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute max-sm:top-[5vw] max-sm:left-[5vw] max-sm:right-[5vw] max-sm:bottom-[5vw] max-md:left-[17vw] max-md:bottom-[5vw] max-md:top-[4vw] max-md:right-[3vw] border backdrop-blur-xl border-[#d4d4d4] rounded-[8vw] overflow-hidden flex flex-col transition-all duration-500 ease-out ${
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute max-md:top-[4vw] max-md:right-[4vw] max-sm:top-[4vw] max-sm:right-[4vw] max-md:w-[8vw] max-md:h-[8vw] max-sm:w-[12vw] max-sm:h-[12vw] bg-primary rounded-full flex items-center justify-center z-10"
          aria-label="Close menu"
        >
          <X
            className="max-sm:w-[6vw] max-sm:h-[6vw] max-md:h-[5vw] max-md:w-[5vw] text-white"
            strokeWidth={2}
          />
        </button>

        <nav className="flex-1 overflow-y-auto px-[6vw] max-sm:pt-[18vw] max-md:pt-[16vw] pb-[4vw]">
          <ul className="space-y-0">
            {navLinks.map((link) => {
              const hasChildren =
                Array.isArray(link.children) && link.children.length > 0;
              const isExpanded = expandedItem === link.id;

              return (
                <li key={link.id} className="border-b border-primary-blue">
                  {hasChildren ? (
                    <>
                      <button
                        onClick={() => toggleExpand(link.id)}
                        className="w-full flex items-center justify-between max-sm:py-[5vw] max-md:py-[2.5vw] pr-[2vw]"
                      >
                        <span
                          className={`max-sm:text-[4.5vw] max-md:text-[3.5vw] tracking-[0.02em] transition-all duration-300 ease-in font-normal ${
                            isExpanded
                              ? "text-primary-blue font-normal"
                              : "text-foreground font-light"
                          }`}
                        >
                          {link.label}
                        </span>
                        <ChevronDown
                          className={`w-[4vw] h-[4vw] text-primary-blue transition-transform duration-500 ${
                            isExpanded ? "rotate-180" : "-rotate-90"
                          }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          isExpanded
                            ? "max-h-[75vw] max-md:pb-[5vw] max-sm:pb-[8vw]"
                            : "max-h-0"
                        }`}
                      >
                        <ul className="max-sm:space-y-[3vw] max-md:space-y-[1.5vw] pl-[1vw]">
                          {link.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                prefetch={false}
                                href={child.href}
                                onClick={handleLinkClick}
                                className="max-sm:text-[4vw] max-md:text-[2.8vw] text-foreground font-light tracking-[0.02em] block"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      prefetch={false}
                      href={link.href}
                      onClick={handleLinkClick}
                      className="block max-sm:py-[5vw] max-md:py-[2.5vw] max-sm:text-[4.5vw] max-md:text-[3.5vw] text-foreground font-normal tracking-[0.02em]"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-[6vw] pb-[8vw]">
          <p className="max-sm:text-[4vw] max-md:text-[3vw] text-foreground font-light tracking-[0.02em] mb-[4vw]">
            Connect With Us
          </p>
          <div className="flex items-center gap-[5vw]">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="max-sm:h-[8vw] max-md:h-[6vw] flex items-center justify-center text-foreground hover:text-primary-blue transition-colors"
                aria-label={social.id}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
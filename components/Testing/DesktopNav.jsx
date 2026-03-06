"use client";

import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import AnimatedHoverLink from "../Layout/AnimatedHoverLink";

/**
 * Separated Desktop Navigation Component
 *
 * Benefits:
 * - Cleaner code separation
 * - Not loaded on mobile (tree-shaking)
 * - Easier to test and maintain
 */

export const NAV_LINKS = [
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
      { id: "sol-7", label: "Financial Services", href: "/solutions/financial-services" },
    ],
  },
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
    id: "opensource",
    label: "Open Source",
    href: "/infosys-finacle",
    drop: false,
  },
  {
    id: "resources",
    label: "Resources",
    href: "#",
    drop: true,
    children: [
      { id: "res-1", label: "Case Studies", href: "/casestudies" },
      { id: "res-2", label: "In the News", href: "/news" },
      { id: "res-3", label: "Blogs", href: "/blogs" },
      { id: "res-4", label: "Events", href: "/webinars-and-events" },
      { id: "res-5", label: "Videos", href: "/product-videos" },
      { id: "res-6", label: "Whitepapers", href: "#" },
      { id: "res-7", label: "Workshops", href: "/ai-insurance-workshops" },
      { id: "res-8", label: "Masterclass", href: "/dsw-workshop-deeptech-ai-genai-hands-on-masterclass" },
    ],
  },
  { id: "about", label: "About Us", href: "/about", drop: false },
];

const isPathActive = (pathname, href) => {
  if (!href || !pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
};

export default function DesktopNav({ openDropdown, onDropdownEnter, onDropdownLeave }) {
  const pathname = usePathname();

  return (
    <div className="rounded-full max-md:hidden relative z-10">
      <ul className="flex items-center justify-between px-[2.5vw] py-[1.5vw] gap-[3vw] text-[1vw]">
        {NAV_LINKS.map((link) => {
          const hasChildren = Array.isArray(link.children) && link.children.length > 0;
          const isActive =
            isPathActive(pathname, link.href) ||
            (hasChildren && link.children.some((child) => isPathActive(pathname, child.href)));

          return (
            <li
              key={link.id}
              className="relative text-black dropdown-links"
              onMouseEnter={() => onDropdownEnter(link.id)}
              onMouseLeave={onDropdownLeave}
            >
              <div className="flex items-center gap-[0.5vw] relative z-10 navlinks group overflow-clip">
                <AnimatedHoverLink
                  prefetch={false}
                  href={link.href}
                  maskClassName="h-[1.5vw]"
                  aria-current={isActive ? "page" : undefined}
                  aria-haspopup={hasChildren ? "menu" : undefined}
                  aria-expanded={hasChildren ? String(openDropdown === link.id) : undefined}
                  className={`${hasChildren ? "cursor-pointer" : ""} ${
                    !isActive
                      ? "text-22 duration-500 transition-color ease-out font-medium text-foreground group-hover:text-primary-blue"
                      : "text-22 font-medium text-primary-blue"
                  }`}
                  onClick={(e) => {
                    if (hasChildren) e.preventDefault();
                  }}
                >
                  {link.label}
                </AnimatedHoverLink>

                {hasChildren && (
                  <div className="w-fit">
                    <div
                      className={`text-[#CACACA] flex items-center justify-center gap-0 w-[0.8vw] mt-[-0.1vw] h-full max-sm:w-[3vw] transition-transform duration-300 ${
                        openDropdown === link.id ? "translate-y-[25%] scale-[1.05]" : ""
                      }`}
                    >
                      <div className="w-[2.8vw] h-auto">
                        <ChevronDown
                          className={`w-[1.2vw] h-full duration-300 transition-all ease-in ${
                            isActive
                              ? "stroke-primary-blue group-hover:stroke-primary-blue"
                              : "stroke-[#111111] group-hover:stroke-primary-blue"
                          }`}
                        />
                      </div>
                    </div>

                    <span
                      className={`block w-full absolute left-0 top-[60%] z-[-1] bg-transparent ${
                        openDropdown === link.id ? "h-[8vw]" : "h-0"
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* Dropdown menu */}
              {hasChildren && (
                <div
                  className={`absolute top-[260%] left-[-5%] w-fit h-fit bg-white/85 shadow-sm rounded-[0.8vw] border border-black/5 transition-opacity duration-300  ${
                    openDropdown === link.id ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  onMouseEnter={() => onDropdownEnter(link.id)}
                  onMouseLeave={onDropdownLeave}
                >
                  <ul className="py-[1.8vw] px-[1.5vw] min-w-[10vw] space-y-[1vw]">
                    {link.children.map((child) => {
                      const childActive = isPathActive(pathname, child.href);

                      return (
                        <li key={child.id} className="overflow-clip">
                          <AnimatedHoverLink
                            maskClassName="h-[1.5vw]"
                            prefetch={false}
                            href={child.href}
                            aria-current={childActive ? "page" : undefined}
                            className="block text-22 transition-colors whitespace-nowrap text-foreground hover:text-primary-blue"
                          >
                            {child.label}
                          </AnimatedHoverLink>
                        </li>
                      );
                    })}
                  </ul>

                  <span className="w-full h-15 absolute bottom-full left-0 z-20" />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

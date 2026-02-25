"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import Link from "next/link";
import Image from "next/image";
import PrimaryButton from "../Buttons/PrimaryButton";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import MobileNav from "./MobileNav";

gsap.registerPlugin(SplitText);

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
      { id: "sol-7", label: "Financial Services", href: "/solutions/financial-services" }

    ],
  },
  // { id: "opensource", label: "Open Source", href: "/infosys-finacle", drop:false},

  { id: "opensource", label: "Open source", href: "/infosys-finacle", drop: false },
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

const isPathActive = (pathname, href) => {
  if (!href || !pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
};

// Animated link with SplitText hover animation
function AnimatedNavLink({ href, children, className = "", onClick, ...props }) {
  const elRef = useRef(null);
  const splitRef = useRef(null);

  useGSAP(
    () => {
      if (!elRef.current) return;
      splitRef.current = new SplitText(elRef.current, { type: "chars" });
      gsap.set(splitRef.current.chars, { yPercent: 0 });

      return () => {
        splitRef.current?.revert();
        splitRef.current = null;
      };
    },
    { scope: elRef }
  );

  const animateTo = (y) => {
    const chars = splitRef.current?.chars;
    if (!chars) return;
    gsap.killTweensOf(chars);
    gsap.to(chars, {
      yPercent: y,
      stagger: 0.008,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <Link
      href={href}
      ref={elRef}
      onMouseEnter={() => animateTo(-100)}
      onMouseLeave={() => animateTo(0)}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [isHoveringHeader, setIsHoveringHeader] = useState(false);
  const [mob, setMob] = useState(false);

  const headerRef = useRef(null);
  const headerWrapRef = useRef(null);
  const lenis = useLenis();
  const pathname = usePathname();
  const [isInverted, setIsInverted] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setMob(globalThis.innerWidth <= 1024);
    check();
    globalThis.addEventListener("resize", check, { passive: true });
    return () => globalThis.removeEventListener("resize", check);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpenMobileMenu(false);
  }, [pathname]);

  // Reset scroll on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [lenis, pathname]);

  // Show/hide header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isHoveringHeader || openMobileMenu) {
        setIsHidden(false);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isHoveringHeader, openMobileMenu]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        ref={headerWrapRef}
        id="header"
        onMouseEnter={() => setIsHoveringHeader(true)}
        onMouseLeave={() => setIsHoveringHeader(false)}
        className="text-white w-screen fixed top-0 left-0 z-900 pointer-events-none"
      >
        <nav
          className={`relative flex items-center justify-between px-12 py-3 w-full transition-transform duration-500 bg-white/75 pointer-events-auto max-sm:px-[7vw] max-md:px-[5vw] max-md:py-[4vw] max-sm:py-[3vw] max-sm:pt-[5vw] max-md:backdrop-blur-md  ${isHidden ? "-translate-y-full" : "translate-y-0"
            }`}
          ref={headerRef}
        >
          <span className={`h-full w-full block absolute top-0 left-0 z-1 ${isScrolled ? " backdrop-blur-md" : ""}`} />

          {/* Logo */}
          <div className="flex items-center gap-2 w-[12%] max-md:w-[30%] max-sm:w-[36%] z-10 relative">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/dsw-logo.svg"
                alt="DSW Logo"
                width={150}
                height={50}
                className={`max-sm:h-7 max-md:w-full max-md:object-cover max-md:h-full   max-sm:w-auto`}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!mob ? (
            <div className="rounded-full max-md:hidden relative z-10">
              <div className="w-full h-full absolute top-0 left-0" />
              <ul className="flex items-center justify-between px-[2.5vw] py-[1.5vw] gap-[3vw] text-[1vw]">
                {NAV_LINKS.filter(link => link.id !== "contact").map((link) => {
                  const hasChildren =
                    Array.isArray(link.children) && link.children.length > 0;

                  const isActive =
                    isPathActive(pathname, link.href) ||
                    (hasChildren &&
                      link.children.some((child) =>
                        isPathActive(pathname, child.href)
                      ));

                  return (
                    <li
                      key={link.id}
                      className="relative text-black dropdown-links"
                      onMouseEnter={() => setOpenDropdown(link.id)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {/* Top-level link */}
                      <div className="flex items-center gap-[0.5vw] relative z-[10] navlinks group overflow-clip">
                        <AnimatedNavLink
                          href={link.href}
                          aria-current={isActive ? "page" : undefined}
                          aria-haspopup={hasChildren ? "menu" : undefined}
                          aria-expanded={
                            hasChildren
                              ? String(openDropdown === link.id)
                              : undefined
                          }
                          className={`${hasChildren ? "cursor-pointer" : ""} ${!isActive
                              ? " text-22 duration-500 transition-color ease-out font-medium"
                              : " text-22 font-medium text-primary-blue"
                            } buttonTextShadow ${isInverted ? "text-white group-hover:text-primary-white!" : "text-foreground group-hover:text-primary-blue!"
                            }`}
                          onClick={(e) => {
                            if (hasChildren) e.preventDefault();
                          }}
                        >
                          {link.label}
                        </AnimatedNavLink>

                        {hasChildren && (
                          <div className="w-fit">
                            <div
                              className={`text-[#CACACA] flex items-center justify-center gap-0 w-[0.8vw] mt-[-0.1vw] h-full max-sm:w-[3vw] transition-transform duration-300 ${openDropdown === link.id
                                  ? "translate-y-[25%] scale-[1.05]"
                                  : ""
                                }`}
                            >
                              <div className="w-[2.8vw] h-auto">
                                <ChevronDown className={`w-[1.2vw] h-full duration-300 transition-all ease-in ${isInverted
                                    ? "stroke-white group-hover:stroke-white"
                                    : isActive
                                      ? "stroke-primary-blue group-hover:stroke-primary-blue"
                                      : "stroke-[#111111] group-hover:stroke-primary-blue"
                                  }`} />
                              </div>
                            </div>

                            <span
                              className={`block w-full absolute left-0 top-[60%] z-[-1] bg-transparent ${openDropdown === link.id ? "h-[8vw]" : "h-0"
                                }`}
                            />
                          </div>
                        )}
                      </div>

                      {/* Submenu */}
                      {hasChildren && (
                        <div
                          className={`absolute top-[260%] left-[-5%] w-fit h-fit bg-white/75 shadow-sm rounded-[0.8vw] border border-black/5 transition-opacity duration-300 backdrop-blur-md ${openDropdown === link.id
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none"
                            }`}
                          onMouseEnter={() => setOpenDropdown(link.id)}
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          <ul className="py-[1.8vw] px-[1.5vw] min-w-[10vw] space-y-[1vw]">
                            {link.children.map((child) => {
                              const childActive = isPathActive(
                                pathname,
                                child.href
                              );

                              return (
                                <li key={child.id} className="overflow-clip">
                                  <AnimatedNavLink
                                    href={child.href}
                                    aria-current={
                                      childActive ? "page" : undefined
                                    }
                                    className={`block text-22 transition-colors whitespace-nowrap buttonTextShadow ${isInverted ? "text-white group-hover:text-primary-white!" : "text-foreground group-hover:text-primary-blue!"
                                      }`}
                                  >
                                    {child.label}
                                  </AnimatedNavLink>
                                </li>
                              );
                            })}
                          </ul>

                          <span className="w-full h-[60px] absolute bottom-full left-0 z-[20]" />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="flex items-center justify-between transition-transform duration-500 pointer-events-auto">
              {/* Hamburger */}
              <button
                className="hidden max-sm:flex max-sm:flex-col gap-[1.5vw] w-[8vw] relative z-[150] max-md:flex max-md:flex-col max-md:w-[6vw] max-md:gap-[1vw] max-sm:w-[7vw]"
                onClick={() => setOpenMobileMenu((prev) => !prev)}
                aria-label="Toggle menu"
                aria-expanded={openMobileMenu}
              >
                <div className={`w-full h-[2.5px] rounded-full transition-all duration-500 origin-center bg-black ${openMobileMenu ? "rotate-45 translate-y-[2vw]" : ""}`} />
                <div className={`w-full h-[2.5px] rounded-full transition-all duration-500 bg-black ${openMobileMenu ? "opacity-0" : ""}`} />
                <div className={`w-full h-[2.5px] rounded-full transition-all duration-500 origin-center bg-black ${openMobileMenu ? "-rotate-45 max-sm:-translate-y-[2vw] max-md:-translate-y-[0.7vw]" : ""}`} />
              </button>
            </div>
          )}

          {/* CTA */}
          {!mob && (
            <div className="flex items-center gap-6 max-md:hidden relative z-[10]">
              <PrimaryButton text="Contact Us" href="/contact-us" />
            </div>
          )}
        </nav>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={openMobileMenu}
        onClose={() => setOpenMobileMenu(false)}
      />
    </>
  );
}

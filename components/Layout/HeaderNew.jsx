"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import MobileNav from "./MobileNav";
import { Logo } from "../Svg/Logo";
import AnimatedHoverLink from "./AnimatedHoverLink";
import Search from "../Svg/Search";
import SolutionsMenu from "./SolutionsMenu";
import TechnologyMenu from "./TechnologyMenu";
import ResourcesMenu from "./ResourcesMenu";
import { NAV_LINKS } from "./nav-data";
import SearchModal from "./Search/SearchModal";

const MEGA_MENU_IDS = ["solutions", "technology", "resources"];

const isPathActive = (pathname, href) => {
  if (!href || !pathname || href === "#") return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
};

function MegaMenuShell({ isOpen, onEnter, onLeave, children }) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`fixed top-[6.1vw] left-0 z-[850] w-screen h-fit bg-white/75 px-[5vw] pb-[4vw] pt-[2vw] text-foreground backdrop-blur-lg sub-menu-container transition-all duration-500 ease-out ${
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto visible"
          : "opacity-0 pointer-events-none invisible"
      }`}
    >
      {children}
    </div>
  );
}

export default function HeaderNew() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [isHoveringHeader, setIsHoveringHeader] = useState(false);
  const [mob, setMob] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInverted] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const headerRef = useRef(null);
  const headerWrapRef = useRef(null);

  const lenis = useLenis();
  const pathname = usePathname();

  const solutionsLink = NAV_LINKS.find((item) => item.id === "solutions");
  const technologyLink = NAV_LINKS.find((item) => item.id === "technology");
  const resourcesLink = NAV_LINKS.find((item) => item.id === "resources");

  useEffect(() => {
    const check = () => setMob(globalThis.innerWidth <= 1024);
    check();
    globalThis.addEventListener("resize", check, { passive: true });
    return () => globalThis.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setOpenMobileMenu(false);
    setOpenDropdown(null);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [lenis, pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isHoveringHeader || openMobileMenu || isSearchOpen) {
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
  }, [lastScrollY, isHoveringHeader, openMobileMenu, isSearchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="header">
        <header
          ref={headerWrapRef}
          id="header"
          onMouseEnter={() => setIsHoveringHeader(true)}
          onMouseLeave={() => {
            setIsHoveringHeader(false);
            setOpenDropdown(null);
          }}
          className="header fixed top-0 left-0 z-900 w-screen text-white pointer-events-none"
        >
          <nav
            ref={headerRef}
            className={`relative flex items-center justify-between w-full px-12 py-3 bg-white/75 pointer-events-auto transition-transform duration-500 max-md:px-[3vw] max-md:py-[4vw] max-md:backdrop-blur-md max-sm:px-[7vw] max-sm:py-[3vw] max-sm:pt-[5vw] ${
              isHidden ? "-translate-y-full" : "translate-y-0"
            }`}
          >
            <span
              className={`absolute top-0 left-0 z-[1] block h-full w-full ${
                isScrolled ? "backdrop-blur-md" : ""
              }`}
            />

            <div className="relative z-10 flex items-center gap-2 w-[12%] max-md:w-[35%] max-sm:w-[36%]">
              <Link prefetch={false} href="/" className="flex items-center">
                <Logo
                  className="h-7 w-auto max-md:h-10 max-md:w-full max-sm:h-7"
                  aria-hidden="true"
                />
                <span className="sr-only">Data Science Wizards Home</span>
              </Link>
            </div>

            {!mob ? (
              <div className="relative z-10 rounded-full max-md:hidden">
                <div className="absolute top-0 left-0 h-full w-full" />
                <ul className="flex items-center justify-between gap-[3vw] px-[2.5vw] py-[1.5vw] text-[1vw]">
                  {NAV_LINKS.filter((l) => l.id !== "contact" && l.id !== "live-demo").map((link) => {
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
                        className="dropdown-links relative text-black"
                        onMouseEnter={() => setOpenDropdown(link.id)}
                        onMouseLeave={() => {
                          if (!MEGA_MENU_IDS.includes(link.id)) {
                            setOpenDropdown(null);
                          }
                        }}
                      >
                        <div className="navlinks group relative z-10 flex items-center gap-[0.5vw] overflow-clip">
                          <AnimatedHoverLink
                            prefetch={false}
                            href={hasChildren ? "#" : link.href}
                            maskClassName="h-[1.5vw]"
                            aria-current={isActive ? "page" : undefined}
                            aria-haspopup={hasChildren ? "menu" : undefined}
                            aria-expanded={
                              hasChildren
                                ? String(openDropdown === link.id)
                                : undefined
                            }
                            className={`${hasChildren ? "cursor-pointer" : ""} ${
                              !isActive
                                ? "text-22 font-medium duration-500 transition-color ease-out"
                                : "text-22 font-medium text-primary-blue"
                            } ${
                              isInverted
                                ? "text-white group-hover:text-primary-white!"
                                : "text-foreground group-hover:text-primary-blue!"
                            }`}
                            onClick={(e) => {
                              if (hasChildren) e.preventDefault();
                            }}
                          >
                            {link.label}
                          </AnimatedHoverLink>

                          {hasChildren && (
                            <div className="w-full">
                              <div
                                className={`flex h-full w-[0.8vw] items-center justify-center gap-0 mt-[-0.1vw] text-[#CACACA] transition-transform duration-300 max-sm:w-[3vw] ${
                                  openDropdown === link.id
                                    ? "translate-y-[25%] scale-[1.05]"
                                    : ""
                                }`}
                              >
                                <div className="h-auto w-[2.8vw]">
                                  <ChevronDown
                                    className={`h-full w-[1.2vw] transition-all duration-300 ease-in ${
                                      isInverted
                                        ? "stroke-white group-hover:stroke-white"
                                        : isActive
                                        ? "stroke-primary-blue group-hover:stroke-primary-blue"
                                        : "stroke-[#111111] group-hover:stroke-primary-blue"
                                    }`}
                                  />
                                </div>
                              </div>

                              <span
                                className={`absolute left-0 top-[60%] z-[-1] block w-full bg-transparent ${
                                  openDropdown === link.id ? "h-[8vw]" : "h-0"
                                }`}
                              />
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className="pointer-events-auto flex gap-[4vw] items-center justify-between transition-transform duration-500 relative z-[200]">
                <button
                  type="button"
                  aria-label="Search website"
                  onClick={() => setIsSearchOpen(true)}
                  className="mr-[2vw] flex size-[4.5vw] items-center justify-center cursor-pointer text-foreground duration-500 hover:scale-[0.95] hover:text-primary-blue"
                >
                  <Search />
                </button>
                <button
                  className="relative z-[150] hidden w-[8vw] max-sm:flex-col max-sm:w-[7vw] gap-[1.5vw] max-md:flex max-md:w-[6vw] max-md:flex-col max-md:gap-[1vw]"
                  onClick={() => setOpenMobileMenu((prev) => !prev)}
                  aria-label="Toggle menu"
                  aria-expanded={openMobileMenu}
                  type="button"
                >
                  <div
                    className={`h-[2.5px] w-full rounded-full bg-black transition-all duration-500 origin-center ${
                      openMobileMenu ? "translate-y-[2vw] rotate-45" : ""
                    }`}
                  />
                  <div
                    className={`h-[2.5px] w-full rounded-full bg-black transition-all duration-500 ${
                      openMobileMenu ? "opacity-0" : ""
                    }`}
                  />
                  <div
                    className={`h-[2.5px] w-full rounded-full bg-black transition-all duration-500 origin-center ${
                      openMobileMenu
                        ? "-rotate-45 max-sm:-translate-y-[2vw] max-md:-translate-y-[0.7vw]"
                        : ""
                    }`}
                  />
                </button>
              </div>
            )}

            {!mob && (
              <div className="relative z-10 flex items-center gap-2 max-md:hidden">
                <button
                  type="button"
                  aria-label="Search website"
                  onClick={() => setIsSearchOpen(true)}
                  className="mr-[2vw] flex size-[1.5vw] items-center justify-center cursor-pointer text-foreground duration-500 hover:scale-[0.95] hover:text-primary-blue"
                >
                  <Search />
                </button>

                <SecondaryButton text="Contact Us" href="/contact-us" />
                <PrimaryButton
                  text="Join a Live Demo"
                  href="/live-demo"
                  className="px-[1.7vw]!"
                />
              </div>
            )}

            {!mob && (
              <>
                <MegaMenuShell
                  isOpen={openDropdown === "solutions"}
                  onEnter={() => setOpenDropdown("solutions")}
                  onLeave={() => setOpenDropdown(null)}
                >
                  <SolutionsMenu data={solutionsLink} />
                </MegaMenuShell>

                <MegaMenuShell
                  isOpen={openDropdown === "technology"}
                  onEnter={() => setOpenDropdown("technology")}
                  onLeave={() => setOpenDropdown(null)}
                >
                  <TechnologyMenu data={technologyLink} />
                </MegaMenuShell>

                <MegaMenuShell
                  isOpen={openDropdown === "resources"}
                  onEnter={() => setOpenDropdown("resources")}
                  onLeave={() => setOpenDropdown(null)}
                >
                  <ResourcesMenu data={resourcesLink} />
                </MegaMenuShell>
              </>
            )}
          </nav>
        </header>
      </div>

      <MobileNav
        isOpen={openMobileMenu}
        onClose={() => setOpenMobileMenu(false)}
        navLinks={NAV_LINKS}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        query={searchQuery}
        setQuery={setSearchQuery}
        // blogs={blogs}
        // news={news}
        onSelectResult={() => {
          setIsSearchOpen(false);
          setSearchQuery("");
        }}
      />
    </>
  );
}
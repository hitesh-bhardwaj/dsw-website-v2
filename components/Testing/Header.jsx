"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import PrimaryButton from "../Buttons/PrimaryButton";
import { Logo } from "../Svg/Logo";
import DesktopNav from "./DesktopNav";

// ✅ Dynamic import - only loads when mobile menu is first opened
const MobileNav = dynamic(() => import("../Layout/MobileNav"), {
  ssr: false,
  loading: () => null,
});

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [isHoveringHeader, setIsHoveringHeader] = useState(false);
  const [mob, setMob] = useState(false);

  const lastScrollY = useRef(0);
  const rafId = useRef(null);
  const headerRef = useRef(null);
  const headerWrapRef = useRef(null);

  const lenis = useLenis();
  const pathname = usePathname();

  // Mobile detection
  useEffect(() => {
    const check = () => setMob(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [lenis, pathname]);

  // ✅ Optimized scroll handler - single listener with RAF throttling
  useEffect(() => {
    const handleScroll = () => {
      // Cancel previous RAF if still pending
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Throttle to 60fps
      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Update isScrolled state (for backdrop blur)
        setIsScrolled(currentScrollY > 150);

        // Hide/show header logic
        if (isHoveringHeader || openMobileMenu) {
          setIsHidden(false);
        } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }

        lastScrollY.current = currentScrollY;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isHoveringHeader, openMobileMenu]);

  // ✅ Memoized handlers to prevent unnecessary re-renders
  const handleDropdownEnter = useCallback((linkId) => {
    setOpenDropdown(linkId);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  const handleMobileToggle = useCallback(() => {
    setOpenMobileMenu((prev) => !prev);
  }, []);

  const handleMobileClose = useCallback(() => {
    setOpenMobileMenu(false);
  }, []);

  return (
    <>
      <div className="header">
        <header
          ref={headerWrapRef}
          id="header"
          onMouseEnter={() => setIsHoveringHeader(true)}
          onMouseLeave={() => setIsHoveringHeader(false)}
          className="text-white w-screen fixed top-0 left-0 z-900 pointer-events-none"
        >
          <nav
            className={`relative flex items-center justify-between px-12 py-3 w-full transition-transform duration-500 bg-white/75 pointer-events-auto max-sm:px-[7vw] max-md:px-[3vw] max-md:py-[4vw] max-sm:py-[3vw] max-sm:pt-[5vw] max-md:backdrop-blur-md ${isHidden ? "-translate-y-full" : "translate-y-0"
              }`}
            ref={headerRef}
          >
            {/* Backdrop blur overlay */}
            <span
              className={`h-full w-full block absolute top-0 left-0 z-1 transition-opacity duration-300 ${isScrolled ? "backdrop-blur-md" : ""
                }`}
            />

            {/* Logo */}
            <div className="flex items-center gap-2 w-[12%] max-md:w-[35%] max-sm:w-[36%] z-10 relative">
              <Link prefetch={false} href="/" className="flex items-center">
                <Logo
                  className="h-7 max-md:h-10 max-sm:h-7 max-md:w-full w-auto"
                  aria-hidden="true"
                />
                <span className="sr-only">Data Science Wizards Home</span>
              </Link>
            </div>

            {/* ✅ Desktop Navigation - Separated Component */}
            {!mob ? (
              <DesktopNav
                openDropdown={openDropdown}
                onDropdownEnter={handleDropdownEnter}
                onDropdownLeave={handleDropdownLeave}
              />
            ) : (
              // Mobile menu button
              <div className="flex items-center justify-between transition-transform duration-500 pointer-events-auto">
                <button
                  className="hidden max-sm:flex-col gap-[1.5vw] w-[8vw] relative z-150 max-md:flex max-md:flex-col max-md:w-[6vw] max-md:gap-[1vw] max-sm:w-[7vw]"
                  onClick={handleMobileToggle}
                  aria-label="Toggle menu"
                  aria-expanded={openMobileMenu}
                >
                  <div
                    className={`w-full h-[2.5px] rounded-full transition-all duration-500 origin-center bg-black ${openMobileMenu ? "rotate-45 translate-y-[2vw]" : ""
                      }`}
                  />
                  <div
                    className={`w-full h-[2.5px] rounded-full transition-all duration-500 bg-black ${openMobileMenu ? "opacity-0" : ""
                      }`}
                  />
                  <div
                    className={`w-full h-[2.5px] rounded-full transition-all duration-500 origin-center bg-black ${openMobileMenu ? "-rotate-45 max-sm:-translate-y-[2vw] max-md:-translate-y-[0.7vw]" : ""
                      }`}
                  />
                </button>
              </div>
            )}

            {/* CTA */}
            {!mob && (
              <div className="flex items-center gap-6 max-md:hidden relative z-10">
                <PrimaryButton text="Contact Us" href="/contact-us" />
              </div>
            )}
          </nav>
        </header>
      </div>

      {/* ✅ Dynamic MobileNav - only loads when opened, key resets on route change */}
      <MobileNav
        key={pathname}
        isOpen={openMobileMenu}
        onClose={handleMobileClose}
      />
    </>
  );
}

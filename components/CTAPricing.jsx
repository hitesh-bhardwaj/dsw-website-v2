"use client";
import PrimaryButton from "./Buttons/PrimaryButton";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import HeadingAnim from "./Animations/HeadingAnim";

gsap.registerPlugin(MotionPathPlugin);

export default function CTAPricing() {
  return (
    <section className="relative w-full h-fit bg-white pt-[7%] px-[5vw] overflow-hidden mb-[-5vw] max-sm:px-[7vw] max-sm:h-fit max-sm:py-[15%]">
      {/* Content */}
      <div className="relative z-20 text-center">
        {/* Heading */}
        <HeadingAnim>
          <h2 className="text-80 font-heading leading-[1.2] text-[#0A1B4B] ">
            One Subscription,
            <br />
            <span className="font-medium">Unlimited Scale.</span>
          </h2>
        </HeadingAnim>
      </div>

      {/* Decorative Lines Background - Simplified */}

      <div className="relative inset-0 w-screen h-screen ml-[-8vw] mt-[-17vw] max-sm:h-[70vh] max-sm:pt-[33vh] fadeup">
        <Background />
        <div className="absolute left-[46%] z-[2] top-[50%] -translate-y-1/2 max-sm:top-[100%] max-sm:left-[18%]">
          <PrimaryButton href="#" text={"Discuss Pricing"} />
        </div>
        <div className="w-full h-[10vh] max-sm:block absolute from-white via-white/90 bg-gradient-to-b to-white/0 hidden top-[10%]"/>
        <div className="w-full h-[10vh] max-sm:block absolute bg-white hidden top-[100%]"/>
      </div>
    </section>
  );
}

const Background = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // refs we will clean up
    let running = true;
    let nextCall = null;
    const activeCurrencyTls = new Set();
    const gradientTls = [];

    const ctx = gsap.context(() => {
      // ---------- helpers ----------
      const setOnPathStart = ({
        sel,
        path,
        start,
        autoRotate = true,
        opacity = 0,
      }) => {
        gsap.set(sel, {
          opacity,
          rotation: 0,
          transformOrigin: "50% 50%",
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate,
            start,
            end: start,
          },
        });
      };

      const loopMover = ({
        sel,
        path,
        start,
        end,
        min = 3.5,
        maxExtra = 2.5,
        maxDelay = 2.5,
      }) => {
        const duration = min + Math.random() * maxExtra;
        const delay = Math.random() * maxDelay;

        // ✅ gradients must be visible
        setOnPathStart({ sel, path, start, autoRotate: true, opacity: 1 });

        return gsap.timeline({ repeat: -1, delay }).to(sel, {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start,
            end,
          },
          duration,
          ease: "power3.out",
          immediateRender: false,
        });
      };

      // ---------- gradients ----------
      const gradientItems = [
        {
          sel: 'path[fill="url(#paint0_linear_29_2)"]',
          path: "#path-left-center",
          start: 0,
          end: 1,
        },
        {
          sel: 'path[fill="url(#paint1_linear_29_2)"]',
          path: "#path-left-center",
          start: 0,
          end: 1,
        },

        {
          sel: 'path[fill="url(#paint2_linear_29_2)"]',
          path: "#path-right-top",
          start: 0,
          end: 1,
        },
        {
          sel: 'path[fill="url(#paint3_linear_29_2)"]',
          path: "#path-right-top",
          start: 0,
          end: 1,
        },

        {
          sel: 'path[fill="url(#paint4_linear_29_2)"]',
          path: "#path-right-center",
          start: 0,
          end: 1,
        },
        {
          sel: 'path[fill="url(#paint5_linear_29_2)"]',
          path: "#path-right-center",
          start: 0,
          end: 1,
        },

        {
          sel: 'path[fill="url(#paint6_linear_29_2)"]',
          path: "#path-right-bottom",
          start: 1,
          end: 0,
        },
        {
          sel: 'path[fill="url(#paint7_linear_29_2)"]',
          path: "#path-right-bottom",
          start: 1,
          end: 0,
        },

        {
          sel: 'path[fill="url(#paint8_linear_29_2)"]',
          path: "#path-left-bottom",
          start: 1,
          end: 0,
        },
        {
          sel: 'path[fill="url(#paint9_linear_29_2)"]',
          path: "#path-left-bottom",
          start: 1,
          end: 0,
        },

        {
          sel: 'path[fill="url(#paint10_linear_29_2)"]',
          path: "#path-left-top",
          start: 0,
          end: 1,
        },
        {
          sel: 'path[fill="url(#paint11_linear_29_2)"]',
          path: "#path-left-top",
          start: 0,
          end: 1,
        },
      ];

      gradientItems.forEach((item) => {
        gradientTls.push(loopMover(item));
      });

      // ---------- currencies ----------
      // ---------- currencies (random, overlap WITHOUT mid-path fade) ----------
      const currencyGroups = [
        {
          sel: "#right-center-group",
          path: "#path-right-center",
          start: 0,
          end: 1,
          autoRotate: true,
        },
        {
          sel: "#right-top-group",
          path: "#path-right-top",
          start: 0,
          end: 1,
          autoRotate: false,
        },
        {
          sel: "#right-bottom-group",
          path: "#path-right-bottom",
          start: 1,
          end: 0,
          autoRotate: false,
        },
        {
          sel: "#left-top-group",
          path: "#path-left-top",
          start: 0,
          end: 1,
          autoRotate: true,
        },
        {
          sel: "#left-bottom-group",
          path: "#path-left-bottom",
          start: 1,
          end: 0,
          autoRotate: true,
        },
        {
          sel: "#left-center-group",
          path: "#path-left-center",
          start: 0,
          end: 1,
          autoRotate: true,
        },
      ];

      currencyGroups.forEach((g) => gsap.set(g.sel, { opacity: 0 }));

      const fadeIn = 0.25;
      const fadeOut = 0.25;
      const minTravel = 3;
      const maxTravelExtra = 1.2;
      const overlapLead = 2;
      const busy = new Map(currencyGroups.map((g) => [g.sel, false]));

      let lastIndex = -1;

      const pickNext = () => {
        for (let tries = 0; tries < 20; tries++) {
          const i = Math.floor(Math.random() * currencyGroups.length);
          if (i === lastIndex) continue;
          const g = currencyGroups[i];
          if (busy.get(g.sel)) continue;
          lastIndex = i;
          return g;
        }
        const fallback =
          currencyGroups.find((g) => !busy.get(g.sel)) || currencyGroups[0];
        lastIndex = currencyGroups.indexOf(fallback);
        return fallback;
      };

      const playCurrency = () => {
        if (!running) return;

        const g = pickNext();
        const duration = minTravel + Math.random() * maxTravelExtra;

        busy.set(g.sel, true);
        gsap.killTweensOf(g.sel);

        // start at path start, hidden
        gsap.set(g.sel, {
          opacity: 0,
          rotation: 0,
          transformOrigin: "50% 50%",
          motionPath: {
            path: g.path,
            align: g.path,
            alignOrigin: [0.5, 0.5],
            autoRotate: g.autoRotate,
            start: g.start,
            end: g.start,
          },
        });

        const tl = gsap.timeline({
          onComplete: () => {
            busy.set(g.sel, false);
            activeCurrencyTls.delete(tl);
          },
        });
        activeCurrencyTls.add(tl);

        tl.to(g.sel, { opacity: 1, duration: fadeIn, ease: "power3.inOut" })
          .to(g.sel, {
            motionPath: {
              path: g.path,
              align: g.path,
              alignOrigin: [0.5, 0.5],
              autoRotate: g.autoRotate,
              start: g.start,
              end: g.end,
            },
            duration,
            ease: "power2.out",
          })
          .to(g.sel, { opacity: 0, duration: fadeOut, ease: "power3.inOut" });

        if (nextCall) nextCall.kill();
        nextCall = gsap.delayedCall(
          Math.max(0, duration - overlapLead),
          playCurrency,
        );
      };

      playCurrency();
    }, svgRef);

    return () => {
      running = false;

      if (nextCall) nextCall.kill();
      activeCurrencyTls.forEach((tl) => tl.kill());
      gradientTls.forEach((tl) => tl.kill());

      // revert context (kills scoped tweens too)
      ctx.revert();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="w-[105%] h-full max-sm:rotate-90 max-sm:w-[300%] max-sm:ml-[-100%] max-sm:mt-[50%]"
      width="2466"
      height="679"
      viewBox="0 0 2466 679"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ---- Tracks (give them IDs so motionPath can target them) ---- */}
      <path
        id="path-left-bottom"
        d="M1226.58 340.986H1092.4C608.776 340.986 700.553 664.046 115.66 664.046H22"
        stroke="#999999"
        strokeWidth="1.338"
      />
      <path
        id="path-left-top"
        d="M22 17.9257H115.66C715.025 17.9257 609.224 340.986 1092.4 340.986H1226.58"
        stroke="#999999"
        strokeWidth="1.338"
      />
      <path
        id="path-right-top"
        d="M2431.58 17.9257H2337.92C1738.55 17.9257 1844.35 340.986 1361.18 340.986H1227"
        stroke="#999999"
        strokeWidth="1.338"
      />
      <path
        id="path-right-bottom"
        d="M1227 340.986H1361.18C1844.8 340.986 1753.02 664.046 2337.92 664.046H2431.58"
        stroke="#999999"
        strokeWidth="1.338"
      />
      <path
        id="path-left-center"
        d="M22 340.986H1092.4H1226.58"
        stroke="#999999"
        strokeWidth="1.338"
      />
      <path
        id="path-right-center"
        d="M2431.16 340.986H1360.76H1226.58"
        stroke="#999999"
        strokeWidth="1.338"
      />

      {/* dashed decorative paths (not used for motion) */}
      <path
        d="M2431.16 502.148H2337.5C1828.3 502.148 1828.3 340.986 1360.76 340.986H1226.58"
        stroke="#999999"
        strokeWidth="1.338"
        strokeDasharray="1.34 6.69"
      />
      <path
        d="M2431.16 179.824H2337.5C1828.3 179.824 1828.3 340.986 1360.76 340.986H1226.58"
        stroke="#999999"
        strokeWidth="1.338"
        strokeDasharray="1.34 6.69"
      />
      <path
        d="M22 502.148H115.66C605.814 502.148 605.813 340.986 1092.4 340.986H1226.58"
        stroke="#999999"
        strokeWidth="1.338"
        strokeDasharray="1.34 6.69"
      />
      <path
        d="M22 179.824H115.66C605.814 179.824 605.814 340.986 1092.4 340.986H1226.58"
        stroke="#999999"
        strokeWidth="1.338"
        strokeDasharray="1.34 6.69"
      />

      {/* ---- Currency groups (wrapped into g with IDs) ---- */}
      <g id="right-center-group">
        <path
          d="M2316.14 324.486V356.192M2324.07 333.734C2324.07 330.088 2320.52 327.128 2316.14 327.128C2311.77 327.128 2308.22 330.088 2308.22 333.734C2308.22 337.38 2311.77 340.339 2316.14 340.339C2320.52 340.339 2324.07 343.299 2324.07 346.945C2324.07 350.591 2320.52 353.55 2316.14 353.55C2311.77 353.55 2308.22 350.591 2308.22 346.945"
          stroke="#002AFF"
          strokeWidth="3.96327"
          strokeLinecap="round"
        />
        <path
          d="M2341.74 340.247C2341.74 343.631 2341.07 346.98 2339.78 350.106C2338.48 353.231 2336.59 356.071 2334.2 358.463C2331.8 360.856 2328.96 362.753 2325.84 364.048C2322.71 365.342 2319.36 366.009 2315.98 366.009C2312.6 366.009 2309.25 365.342 2306.12 364.048C2303 362.753 2300.16 360.856 2297.76 358.463C2295.37 356.071 2293.47 353.231 2292.18 350.106C2290.88 346.98 2290.22 343.631 2290.22 340.247C2290.22 333.415 2292.93 326.863 2297.76 322.032C2302.59 317.2 2309.15 314.486 2315.98 314.486C2322.81 314.486 2329.36 317.2 2334.2 322.032C2339.03 326.863 2341.74 333.415 2341.74 340.247Z"
          stroke="#0205FA"
          strokeWidth="2.97245"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g id="left-top-group">
        <path
          d="M281.144 11.4862V43.1924M289.071 20.7339C289.071 17.0876 285.522 14.1284 281.144 14.1284C276.766 14.1284 273.218 17.0876 273.218 20.7339C273.218 24.3801 276.766 27.3393 281.144 27.3393C285.522 27.3393 289.071 30.2986 289.071 33.9448C289.071 37.591 285.522 40.5502 281.144 40.5502C276.766 40.5502 273.218 37.591 273.218 33.9448"
          stroke="#002AFF"
          strokeWidth="3.96327"
          strokeLinecap="round"
        />
        <path
          d="M306.74 27.2475C306.74 30.6305 306.074 33.9804 304.779 37.1059C303.485 40.2314 301.587 43.0713 299.195 45.4634C296.803 47.8556 293.963 49.7532 290.837 51.0478C287.712 52.3424 284.362 53.0087 280.979 53.0087C277.596 53.0087 274.246 52.3424 271.121 51.0478C267.995 49.7532 265.155 47.8556 262.763 45.4634C260.371 43.0713 258.473 40.2314 257.179 37.1059C255.884 33.9804 255.218 30.6305 255.218 27.2475C255.218 20.4152 257.932 13.8627 262.763 9.03152C267.594 4.20035 274.147 1.48623 280.979 1.48623C287.811 1.48623 294.364 4.20035 299.195 9.03152C304.026 13.8627 306.74 20.4152 306.74 27.2475Z"
          stroke="#0205FA"
          strokeWidth="2.97245"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g id="left-bottom-group">
        <path
          d="M418.74 627.247C418.74 630.631 418.074 633.98 416.779 637.106C415.485 640.231 413.587 643.071 411.195 645.463C408.803 647.856 405.963 649.753 402.837 651.048C399.712 652.342 396.362 653.009 392.979 653.009C389.596 653.009 386.246 652.342 383.121 651.048C379.995 649.753 377.155 647.856 374.763 645.463C372.371 643.071 370.473 640.231 369.179 637.106C367.884 633.98 367.218 630.631 367.218 627.247C367.218 620.415 369.932 613.863 374.763 609.032C379.594 604.2 386.147 601.486 392.979 601.486C399.811 601.486 406.364 604.2 411.195 609.032C416.026 613.863 418.74 620.415 418.74 627.247Z"
          stroke="#0205FA"
          strokeWidth="2.97245"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M384.392 614.367H401.566M384.392 622.318H401.566M396.557 642.99L384.392 630.27H388.686C398.229 630.27 398.229 614.367 388.686 614.367"
          stroke="#0205FA"
          strokeWidth="2.97245"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g id="right-top-group">
        <path
          d="M2106.74 43.2475C2106.74 46.6305 2106.07 49.9804 2104.78 53.1059C2103.48 56.2314 2101.59 59.0713 2099.2 61.4634C2096.8 63.8556 2093.96 65.7532 2090.84 67.0478C2087.71 68.3424 2084.36 69.0087 2080.98 69.0087C2077.6 69.0087 2074.25 68.3424 2071.12 67.0478C2068 65.7532 2065.16 63.8556 2062.76 61.4634C2060.37 59.0713 2058.47 56.2314 2057.18 53.1059C2055.88 49.9804 2055.22 46.6305 2055.22 43.2475C2055.22 36.4152 2057.93 29.8627 2062.76 25.0315C2067.59 20.2004 2074.15 17.4862 2080.98 17.4862C2087.81 17.4862 2094.36 20.2004 2099.2 25.0315C2104.03 29.8627 2106.74 36.4152 2106.74 43.2475Z"
          stroke="#0205FA"
          strokeWidth="2.97245"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2072.39 30.3669H2089.57M2072.39 38.3185H2089.57M2084.56 58.9905L2072.39 46.2702H2076.69C2086.23 46.2702 2086.23 30.3669 2076.69 30.3669"
          stroke="#0205FA"
          strokeWidth="2.97245"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g id="right-bottom-group">
        <path
          d="M2163.52 667.083C2158.17 667.083 2153.85 662.724 2153.85 657.413V645.087C2153.85 639.737 2158.21 635.417 2163.52 635.417C2168.83 635.417 2173.19 639.776 2173.19 645.087C2173.19 646.197 2172.32 647.069 2171.21 647.069C2170.1 647.069 2169.23 646.197 2169.23 645.087C2169.23 641.917 2166.65 639.38 2163.52 639.38C2160.39 639.38 2157.82 641.956 2157.82 645.087V657.413C2157.82 660.584 2160.39 663.12 2163.52 663.12C2166.65 663.12 2169.23 660.544 2169.23 657.413C2169.23 656.303 2170.1 655.431 2171.21 655.431C2172.32 655.431 2173.19 656.303 2173.19 657.413C2173.19 662.763 2168.83 667.083 2163.52 667.083Z"
          fill="#0205FA"
        />
        <path
          d="M2161.98 649.248H2152.74C2151.63 649.248 2150.76 648.376 2150.76 647.266C2150.76 646.156 2151.63 645.284 2152.74 645.284H2161.98C2163.09 645.284 2163.96 646.156 2163.96 647.266C2163.96 648.376 2163.09 649.248 2161.98 649.248ZM2161.98 657.174H2152.74C2151.63 657.174 2150.76 656.302 2150.76 655.192C2150.76 654.083 2151.63 653.211 2152.74 653.211H2161.98C2163.09 653.211 2163.96 654.083 2163.96 655.192C2163.96 656.302 2163.09 657.174 2161.98 657.174Z"
          fill="#0205FA"
        />
        <path
          d="M2189.74 651.247C2189.74 654.631 2189.07 657.98 2187.78 661.106C2186.48 664.231 2184.59 667.071 2182.2 669.463C2179.8 671.856 2176.96 673.753 2173.84 675.048C2170.71 676.342 2167.36 677.009 2163.98 677.009C2160.6 677.009 2157.25 676.342 2154.12 675.048C2151 673.753 2148.16 671.856 2145.76 669.463C2143.37 667.071 2141.47 664.231 2140.18 661.106C2138.88 657.98 2138.22 654.631 2138.22 651.247C2138.22 644.415 2140.93 637.863 2145.76 633.032C2150.59 628.2 2157.15 625.486 2163.98 625.486C2170.81 625.486 2177.36 628.2 2182.2 633.032C2187.03 637.863 2189.74 644.415 2189.74 651.247Z"
          stroke="#0205FA"
          strokeWidth="2.97245"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g id="left-center-group">
        <path
          d="M156.74 340.247C156.74 343.631 156.074 346.98 154.779 350.106C153.485 353.231 151.587 356.071 149.195 358.463C146.803 360.856 143.963 362.753 140.837 364.048C137.712 365.342 134.362 366.009 130.979 366.009C127.596 366.009 124.246 365.342 121.121 364.048C117.995 362.753 115.155 360.856 112.763 358.463C110.371 356.071 108.473 353.231 107.179 350.106C105.884 346.98 105.218 343.631 105.218 340.247C105.218 333.415 107.932 326.863 112.763 322.032C117.594 317.2 124.147 314.486 130.979 314.486C137.811 314.486 144.364 317.2 149.195 322.032C154.026 326.863 156.74 333.415 156.74 340.247Z"
          stroke="#0205FA"
          strokeWidth="2.97245"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M131.524 356.083C126.173 356.083 121.853 351.724 121.853 346.413V334.087C121.853 328.737 126.213 324.417 131.524 324.417C136.834 324.417 141.194 328.776 141.194 334.087C141.194 335.197 140.322 336.069 139.212 336.069C138.103 336.069 137.231 335.197 137.231 334.087C137.231 330.916 134.655 328.38 131.524 328.38C128.393 328.38 125.816 330.956 125.816 334.087V346.413C125.816 349.583 128.393 352.12 131.524 352.12C134.655 352.12 137.231 349.544 137.231 346.413C137.231 345.303 138.103 344.431 139.212 344.431C140.322 344.431 141.194 345.303 141.194 346.413C141.194 351.763 136.834 356.083 131.524 356.083Z"
          fill="#0205FA"
        />
        <path
          d="M129.979 338.247H120.744C119.635 338.247 118.763 337.376 118.763 336.266C118.763 335.156 119.635 334.284 120.744 334.284H129.979C131.088 334.284 131.96 335.156 131.96 336.266C131.96 337.376 131.088 338.247 129.979 338.247ZM129.979 346.174H120.744C119.635 346.174 118.763 345.302 118.763 344.192C118.763 343.083 119.635 342.211 120.744 342.211H129.979C131.088 342.211 131.96 343.083 131.96 344.192C131.96 345.302 131.088 346.174 129.979 346.174Z"
          fill="#0205FA"
        />
      </g>

      {/* ---- Gradient movers (these get animated along tracks) ---- */}
      <path
        d="M559.878 340.986C559.878 341.356 560.178 341.656 560.548 341.656C560.918 341.656 561.218 341.356 561.218 340.986C561.218 340.616 560.918 340.316 560.548 340.316C560.178 340.316 559.878 340.616 559.878 340.986Z"
        fill="url(#paint0_linear_29_2)"
      />
      <path
        d="M424.559 340.317C424.552 340.706 424.548 341.096 424.548 341.486C424.548 341.543 424.549 341.599 424.549 341.655H560.547C560.547 341.599 560.548 341.986 560.548 341.486C560.548 340.986 560.543 340.706 560.537 340.317H424.559Z"
        fill="url(#paint1_linear_29_2)"
      />

      <path
        d="M2313.34 18.1562C2313.34 18.5263 2313.04 18.8262 2312.67 18.8262C2312.3 18.8262 2312 18.5263 2312 18.1562C2312 17.7862 2312.3 17.4862 2312.67 17.4862C2313.04 17.4862 2313.34 17.7862 2313.34 18.1562Z"
        fill="url(#paint2_linear_29_2)"
      />
      <path
        d="M2448.66 17.4873C2448.67 17.8762 2448.67 18.2658 2448.67 18.6562C2448.67 18.7126 2448.67 18.7689 2448.67 18.8252H2312.67C2312.67 18.7689 2312.67 19.1562 2312.67 18.6562C2312.67 18.1562 2312.67 17.8762 2312.68 17.4873H2448.66Z"
        fill="url(#paint3_linear_29_2)"
      />

      <path
        d="M1890.89 340.986C1890.89 341.356 1890.59 341.656 1890.22 341.656C1889.85 341.656 1889.55 341.356 1889.55 340.986C1889.55 340.616 1889.85 340.316 1890.22 340.316C1890.59 340.316 1890.89 340.616 1890.89 340.986Z"
        fill="url(#paint4_linear_29_2)"
      />
      <path
        d="M2026.21 340.317C2026.21 340.706 2026.22 341.096 2026.22 341.486C2026.22 341.543 2026.22 341.599 2026.22 341.655H1890.22C1890.22 341.599 1890.22 341.986 1890.22 341.486C1890.22 340.986 1890.22 340.706 1890.23 340.317H2026.21Z"
        fill="url(#paint5_linear_29_2)"
      />

      <path
        d="M2330.34 664.156C2330.34 664.526 2330.04 664.826 2329.67 664.826C2329.3 664.826 2329 664.526 2329 664.156C2329 663.786 2329.3 663.486 2329.67 663.486C2330.04 663.486 2330.34 663.786 2330.34 664.156Z"
        fill="url(#paint6_linear_29_2)"
      />
      <path
        d="M2465.66 663.487C2465.67 663.876 2465.67 664.266 2465.67 664.656C2465.67 664.713 2465.67 664.769 2465.67 664.825H2329.67C2329.67 664.769 2329.67 665.156 2329.67 664.656C2329.67 664.156 2329.67 663.876 2329.68 663.487H2465.66Z"
        fill="url(#paint7_linear_29_2)"
      />

      <path
        d="M145.33 664.156C145.33 664.526 145.63 664.826 146 664.826C146.37 664.826 146.67 664.526 146.67 664.156C146.67 663.786 146.37 663.486 146 663.486C145.63 663.486 145.33 663.786 145.33 664.156Z"
        fill="url(#paint8_linear_29_2)"
      />
      <path
        d="M10.0107 663.487C10.0044 663.876 10 664.266 10 664.656C10 664.713 10.0008 664.769 10.001 664.825H145.999C145.999 664.769 146 665.156 146 664.656C146 664.156 145.996 663.876 145.989 663.487H10.0107Z"
        fill="url(#paint9_linear_29_2)"
      />

      <path
        d="M135.33 18.1562C135.33 18.5263 135.63 18.8262 136 18.8262C136.37 18.8262 136.67 18.5263 136.67 18.1562C136.67 17.7862 136.37 17.4862 136 17.4862C135.63 17.4862 135.33 17.7862 135.33 18.1562Z"
        fill="url(#paint10_linear_29_2)"
      />
      <path
        d="M0.0107422 17.4873C0.00437608 17.8762 0 18.2658 0 18.6562C0 18.7126 0.000843587 18.7689 0.000976562 18.8252H135.999C135.999 18.7689 136 19.1562 136 18.6562C136 18.1562 135.996 17.8762 135.989 17.4873H0.0107422Z"
        fill="url(#paint11_linear_29_2)"
      />

      {/* defs unchanged */}
      <defs>
        <linearGradient
          id="paint0_linear_29_2"
          x1="561.218"
          y1="341.031"
          x2="424.548"
          y2="341.031"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.51" stopColor="#1727FF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_29_2"
          x1="561.218"
          y1="341.031"
          x2="424.548"
          y2="341.031"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.51" stopColor="#1727FF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_29_2"
          x1="2448.67"
          y1="18.2009"
          x2="2312"
          y2="18.2009"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.51" stopColor="#1727FF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <linearGradient
          id="paint3_linear_29_2"
          x1="2448.67"
          y1="18.2009"
          x2="2312"
          y2="18.2009"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.51" stopColor="#1727FF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_29_2"
          x1="1889.55"
          y1="341.031"
          x2="2026.22"
          y2="341.031"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.51" stopColor="#1727FF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_29_2"
          x1="1889.55"
          y1="341.031"
          x2="2026.22"
          y2="341.031"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.51" stopColor="#1727FF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_29_2"
          x1="2465.67"
          y1="664.201"
          x2="2329"
          y2="664.201"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.51" stopColor="#1727FF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <linearGradient
          id="paint7_linear_29_2"
          x1="2465.67"
          y1="664.201"
          x2="2329"
          y2="664.201"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.51" stopColor="#1727FF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_29_2"
          x1="146.67"
          y1="664.201"
          x2="10"
          y2="664.201"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.51" stopColor="#1727FF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_29_2"
          x1="146.67"
          y1="664.201"
          x2="10"
          y2="664.201"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.51" stopColor="#1727FF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_29_2"
          x1="136.67"
          y1="18.2009"
          x2="0"
          y2="18.2009"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.51" stopColor="#1727FF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_29_2"
          x1="136.67"
          y1="18.2009"
          x2="0"
          y2="18.2009"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.51" stopColor="#1727FF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

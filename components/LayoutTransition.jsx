"use client";

import { AnimatePresence, domAnimation, LazyMotion } from "motion/react";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useEffect, useRef } from "react";
import * as m from "motion/react-m"

function usePreviousValue(value) {
    const prev = useRef();
    useEffect(() => {
        prev.current = value;
        return () => { prev.current = undefined };
    });
    return prev.current;
}

function FrozenRouter({ children }) {
    const context = useContext(LayoutRouterContext);
    const prevContext = usePreviousValue(context) || null;
    const segment = useSelectedLayoutSegment();
    const prevSegment = usePreviousValue(segment);
    const changed = segment !== prevSegment
        && segment !== undefined
        && prevSegment !== undefined;

    return (
        <LayoutRouterContext.Provider value={changed ? prevContext : context}>
            {children}
        </LayoutRouterContext.Provider>
    );
}

export default function LayoutTransition({ children }) {
    const segment = useSelectedLayoutSegment();

    const fadeVariants = {
        initial: { opacity: 0 },
        enter: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
        exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }
    };

    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence
                mode="wait"
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
            >
                <m.div
                    key={segment}
                    className="relative"
                    variants={fadeVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                >
                    <FrozenRouter>{children}</FrozenRouter>
                </m.div>
            </AnimatePresence>
        </LazyMotion>
    );
}

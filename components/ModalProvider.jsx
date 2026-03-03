"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  /* -------------------------
   * Existing modals
   * ------------------------- */
  const [open, setOpen] = useState(false);
  const [openWalkThrough, setOpenWalkThrough] = useState(false);
  // const [openWalkthroughIframe, setOpenWalkthroughIframe] = useState(false);

  /* -------------------------
   * Walkthrough state (BOTH)
   * ------------------------- */
  const [walkthroughTarget, setWalkthroughTarget] = useState(null); // "unify" | "agentic"

  const [walkthroughCompleted, setWalkthroughCompleted] = useState({
    unify: false,
    agentic: false,
  });

  /* Shared payload */
  const [payload, setPayload] = useState(null);

  /* Track if form was submitted */
  /* Track if form was submitted — persisted for the browser session */
const [formSubmitted, setFormSubmittedState] = useState(() => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("formSubmitted") === "true";
  }
  return false;
});

const setFormSubmitted = useCallback((value) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("formSubmitted", String(value));
  }
  setFormSubmittedState(value);
}, []);

  /* -------------------------
   * Existing helpers
   * ------------------------- */
  const openModal = useCallback(() => setOpen(true), []);

  const openWith = useCallback((p) => {
    setPayload(p || null);
    setOpen(true);
  }, []);

  const openWalkThroughModal = useCallback(() => {
    setOpenWalkThrough(true);
  }, []);

  const openWithWalkthrough = useCallback((p) => {
    setPayload(p || null);
    setOpenWalkThrough(true);
  }, []);

  // const openWalkthroughIframeModal = useCallback((p) => {
  //   setPayload(p || null);
  //   setOpenWalkthroughIframe(true);
  // }, []);

  /* -------------------------
   * SMART WALKTHROUGH OPENER
   * ------------------------- */
  // const openWalkthroughSmart = useCallback(
  //   (target) => {
  //     setWalkthroughTarget(target);
       
  //     if (walkthroughCompleted[target]) {
  //       setOpenWalkthroughIframe(true);
  //     } else {
  //       setOpenWalkThrough(true);
  //     }
  //   },
  //   [walkthroughCompleted]
  // );
  const openWalkthroughSmart = useCallback((target) => {
  setWalkthroughTarget(target);

  // Always open normal walkthrough only
  // setOpenWalkthroughIframe(false); // make sure iframe is closed
  setOpenWalkThrough(true);
}, []);

  /* -------------------------
   * Mark walkthrough completed
   * ------------------------- */
  const markWalkthroughCompleted = useCallback((target) => {
    setWalkthroughCompleted((prev) => ({
      ...prev,
      [target]: true,
    }));
  }, []);

  /* -------------------------
   * openByKey (extended safely)
   * ------------------------- */
  const openByKey = useCallback(
    (key, p) => {
      if (p !== undefined) setPayload(p || null);

      switch (key) {
        case "demo":
          setOpen(true);
          break;

        case "walkthrough":
          setOpenWalkThrough(true);
          break;

        // case "walkthrough-iframe":
        //   setOpenWalkthroughIframe(true);
        //   break;

        default:
          break;
      }
    },
    []
  );

  const value = useMemo(
    () => ({
      open,
      setOpen,
      openModal,
      openWith,

      openWalkThrough,
      setOpenWalkThrough,
      openWalkThroughModal,
      openWithWalkthrough,

      // openWalkthroughIframe,
      // setOpenWalkthroughIframe,
      // openWalkthroughIframeModal,

      walkthroughTarget,
      setWalkthroughTarget,

      walkthroughCompleted,
      markWalkthroughCompleted,

      openWalkthroughSmart,

      payload,
      setPayload,

      formSubmitted,
      setFormSubmitted,

      openByKey,
    }),
    [
      open,
      openWalkThrough,
      // openWalkthroughIframe,
      walkthroughTarget,
      walkthroughCompleted,
      payload,
      formSubmitted,
      openModal,
      openWith,
      openWalkThroughModal,
      openWithWalkthrough,
      // openWalkthroughIframeModal,
      openWalkthroughSmart,
      markWalkthroughCompleted,
      openByKey,
    ]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}

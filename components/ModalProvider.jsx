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
  const [open, setOpen] = useState(false);
  const [openWalkThrough, setOpenWalkThrough] = useState(false);
  const [openPricing, setOpenPricing] = useState(false);
  const [openPdfModal, setOpenPdfModal] = useState(false);

  const [walkthroughTarget, setWalkthroughTarget] = useState(null);

  const [walkthroughCompleted, setWalkthroughCompleted] = useState({
    unify: false,
    agentic: false,
  });

  const [payload, setPayload] = useState(null);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);

  const openWith = useCallback((p) => {
    setPayload(p || null);
    setOpen(true);
  }, []);

  const openPdf = useCallback((p) => {
    setPayload(p || null);
    setOpenPdfModal(true);
  }, []);

  const openWalkThroughModal = useCallback(() => {
    setOpenWalkThrough(true);
  }, []);

  const openWithWalkthrough = useCallback((p) => {
    setPayload(p || null);
    setOpenWalkThrough(true);
  }, []);

  const openPricingModal = useCallback(() => {
    setOpenPricing(true);
  }, []);

  const openWithPricing = useCallback((p) => {
    setPayload(p || null);
    setOpenPricing(true);
  }, []);

  const openWalkthroughSmart = useCallback((target) => {
    setWalkthroughTarget(target);
    setOpenWalkThrough(true);
  }, []);

  const markWalkthroughCompleted = useCallback((target) => {
    setWalkthroughCompleted((prev) => ({
      ...prev,
      [target]: true,
    }));
  }, []);

  const openByKey = useCallback((key, p) => {
    if (p !== undefined) setPayload(p || null);

    switch (key) {
      case "demo":
        setOpen(true);
        break;

      case "walkthrough":
        setOpenWalkThrough(true);
        break;

      case "pricing":
        setOpenPricing(true);
        break;

      case "pdf":
        setOpenPdfModal(true);
        break;

      default:
        break;
    }
  }, []);

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

      openPricing,
      setOpenPricing,
      openPricingModal,
      openWithPricing,

      openPdfModal,
      setOpenPdfModal,
      openPdf,

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
      openPricing,
      openPdfModal,
      walkthroughTarget,
      walkthroughCompleted,
      payload,
      formSubmitted,
      openModal,
      openWith,
      openWalkThroughModal,
      openWithWalkthrough,
      openPricingModal,
      openWithPricing,
      openPdf,
      openWalkthroughSmart,
      markWalkthroughCompleted,
      openByKey,
    ]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
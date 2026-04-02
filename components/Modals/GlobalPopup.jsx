"use client";

import React from "react";
import { useModal } from "../ModalProvider";
import PopupModal from "./PopopModal";

export default function GlobalPopup() {
  const { open, setOpen } = useModal();
  return <PopupModal modalOpen={open} setModalOpen={setOpen} />;
}
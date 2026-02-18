"use client"
import React from 'react'
import Header from './Header'
import FooterNew from './Footer'
import { ModalProvider, useModal } from '../ModalProvider'
import WalkthroughPopup from '../Modals/WalkthroughPopup'
import WalkthroughIframePopup from '../Modals/WalkthroughIframePopup'
import { ImageObjectJsonLd, LocalBusiness, OrganizationJsonLd, WebsiteJsonLd } from '@/lib/json-ld'
import PopupModal from '../PopopModal'


function GlobalPopup() {
  const { open, setOpen } = useModal();
  return <PopupModal modalOpen={open} setModalOpen={setOpen} />;
}
const Layout = ({ children }) => {
  return (
    <>
      <ModalProvider>
        <OrganizationJsonLd/>
        <LocalBusiness/>
        <ImageObjectJsonLd/>
        <WebsiteJsonLd/>
        <Header />
        {children}
        <FooterNew />
        <GlobalPopup/>
        <WalkthroughPopup />
        <WalkthroughIframePopup />
      </ModalProvider>
    </>
  )
}

export default Layout
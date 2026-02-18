import React from 'react'
import Header from './Header'
import FooterNew from './Footer'
import { ModalProvider } from '../ModalProvider'
import WalkthroughPopup from '../Modals/WalkthroughPopup'
import WalkthroughIframePopup from '../Modals/WalkthroughIframePopup'
import { ImageObjectJsonLd, LocalBusiness, OrganizationJsonLd, WebsiteJsonLd } from '@/lib/json-ld'

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
        <WalkthroughPopup />
        <WalkthroughIframePopup />
      </ModalProvider>
    </>
  )
}

export default Layout
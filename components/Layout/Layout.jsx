import React from 'react'
import Header from './Header'
import FooterNew from './Footer'
import { ModalProvider } from '../ModalProvider'
import WalkthroughPopup from '../Modals/WalkthroughPopup'
import WalkthroughIframePopup from '../Modals/WalkthroughIframePopup'

const Layout = ({ children }) => {
  return (
    <>
      <ModalProvider>
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
import React from 'react'
import Header from './Header'
import FooterNew from './Footer'
import { ModalProvider } from '../ModalProvider'
import WalkthroughPopup from '../Modals/WalkthroughPopup'

const Layout = ({children}) => {
  return (
   <>
   <ModalProvider>
   <Header/>
   {children}
   <FooterNew/>
   <WalkthroughPopup/>
   </ModalProvider>
   </>
  )
}

export default Layout
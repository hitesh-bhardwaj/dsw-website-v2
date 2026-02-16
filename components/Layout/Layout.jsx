import React from 'react'
import Header from './Header'
import FooterNew from './Footer'

const Layout = ({children}) => {
  return (
   <>
   <Header/>
   {children}
   <FooterNew/>
   </>
  )
}

export default Layout
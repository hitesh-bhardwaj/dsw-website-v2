import React from 'react'
import Header from './Header'
import FooterNew from '../FooterNew'

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
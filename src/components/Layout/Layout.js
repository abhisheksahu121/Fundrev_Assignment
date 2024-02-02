import React from 'react'
import Footer from './Footer';
import Header from './Header';
import {Toaster} from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children}) => {
  return (
    <div>
    <Header></Header>
    <main style={{minHeight: "80vh"}}>
    <Toaster />
    {children}
    </main>
    <Footer></Footer>
    </div>
  )
}

export default Layout;

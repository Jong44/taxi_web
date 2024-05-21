import React from 'react'
import Footer from './footer'
import Header from './header'
import Sidebar from './sidebar'

const AdminLayout = ({children}) => {
  return (
    <>
        <Header />
        <div className="flex">
            <div className="sidebar h-[90vh] w-[15%]">
                <Sidebar />
            </div>
            <div className="content bg-[#EAEEF3] flex-1">
                {children}
            </div>
        </div>
        <Footer />
    </>
  )
}

export default AdminLayout
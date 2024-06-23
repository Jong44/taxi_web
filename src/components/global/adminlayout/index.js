import React, { useEffect, useState } from 'react'
import Footer from './footer'
import Header from './header'
import Sidebar from './sidebar'
import { useRouter } from 'next/router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from '@/config/firebase'

const AdminLayout = ({children}) => {
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  const auth = getAuth(app)

  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/auth/login')
      } else {
        user.getIdToken().then((token) => {
          if (token === JSON.parse(localStorage.getItem('token'))) {
            setLoading(false)
          }else{
            router.push('/auth/login')
          }
        })
      }
    });

  }



  useEffect(() => {
    checkUser()
  }, [])
  

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
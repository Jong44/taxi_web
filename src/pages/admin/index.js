import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/global/adminlayout'
import CardStatus from '@/components/global/cardstatus'
import { useRouter } from 'next/router'
import { getAuth } from 'firebase/auth'
import app from '@/config/firebase'


const Admin = () => {
  const router = useRouter();

  const auth = getAuth(app)

  const checkUser = () => {
    const user = auth.currentUser
    if (user) {
      router.push('/admin/dashboard')
    } else {
      router.push('/auth/login')
    }
  }



  useEffect(() => {
    checkUser()
  }, [])

  return (
    <>
      
    </>
  )
}

export default Admin
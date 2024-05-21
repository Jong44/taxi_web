import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/global/adminlayout'
import CardStatus from '@/components/global/cardstatus'
import { useRouter } from 'next/router'


const Admin = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/admin/dashboard')
  }, [])

  return (
    <>
      
    </>
  )
}

export default Admin
import AdminLayout from '@/components/global/adminlayout'
import Head from 'next/head'
import React from 'react'

const Pengguna = () => {
  return (
    <>
        <Head>
           <title>Pengguna List</title> 
        </Head>
        <AdminLayout>
            <div>Pengguna</div>
        </AdminLayout>
    </>
  )
}

export default Pengguna
import React from 'react'
import Head from 'next/head'
import AdminLayout from '@/components/global/adminlayout'
import CardStatus from '@/components/global/cardstatus'
import { useState } from 'react'

const Index = () => {
    const [data, setData] = useState([
        {
            name: 'Pegguna',
            value: 100,
            color: "bg-gradient-to-tr from-[#834D9B] to-[#D04ED6]",
            width: 20
        },
        {
            name: "Dokter",
            value: 100,
            color: "bg-gradient-to-tr from-[#FC5286] to-[#FBAAA2]",
            width: 10
        },
        {
            name: "Member",
            value: 100,
            color: "bg-gradient-to-tr from-[#834D9B] to-[#D04ED6]",
            width: 25
        },
        {
            name: "Tes Kesehatan Mental",
            value: 100,
            color: "bg-gradient-to-tr from-[#FC5286] to-[#FBAAA2]",
            width: 45
        },
        {
            name: "Podcast",
            value: 100,
            color: "bg-gradient-to-tr from-[#56AB2F] to-[#A8E063]",
            width: 30
        },
        {
            name: "Artikel",
            value: 100,
            color: "bg-gradient-to-tr from-[#F7971E] to-[#FFD200]",
            width: 12
        },
        {
            name: "Meditasi",
            value: 100,
            color: "bg-gradient-to-tr from-[#56AB2F] to-[#A8E063]",
            width: 77
        },
        {
            name: "Transaksi",
            value: 100,
            color: "bg-gradient-to-tr from-[#F7971E] to-[#FFD200]",
            width: 17
        },
    ])
  return (
    <>
    <Head>
        <script src="https://kit.fontawesome.com/c3cf8af875.js" crossorigin="anonymous"></script>
        <title>Admin</title>
      </Head>
      <AdminLayout>
        <div className='py-8 px-7'>
          <h1 className='text-xl font-bold'>Dashboard</h1>
          <div className='grid grid-cols-4 gap-4 mt-5'>
            {data.map((item, index) => (
              <CardStatus key={index} title={item.name} value={item.value} color={item.color} width={item.width} />
            ))}
          </div>
          <div className='flex flex-wrap gap-4 mt-6'>
            {Array(3).fill(0).map((_, index) => (
              <div className='bg-white shadow-md rounded-md py-4 px-5 w-[400px] h-[350px]'>

              </div>
            ))}
          </div>
          <div className='w-full mt-6 bg-white px-6 py-4 rounded-md shadow-md'>
            <p className='text-[#3A405B] font-medium text-sm'>ADMIT DOKTER LIST</p>
          <table className='w-full mt-1 bg-white' border={1}>
            <thead>
              <tr className='text-sm border-b'>
                <th scope='col' className='text-left p-4'>No</th>
                <th scope='col' className='text-left'>Nama</th>
                <th scope='col' className='text-left'>Email</th>
                <th scope='col' className='text-left'>No HP</th>
                <th scope='col' className='text-left'>Lokasi Konseling</th>
                <th scope='col' className='text-left'>No SIP</th>
                <th scope='col' className='text-left'>Action</th>
                <th scope='col' className='text-left'>Detail</th>
              </tr>
              {
                Array.from({length: 10}).map((_, index) => (
                  <tr className='text-sm border-b'>
                <th scope='row' className='text-left p-4'>1</th>
                <td className='text-left'>Dr Humam</td>
                <td className='text-left'>humam@gmail.com</td>
                <td className='text-left'>08123456789</td>
                <td className='text-left'>Bandung</td>
                <td className='text-left'>123456789</td>
                <td className='text-left flex justify-left items-left gap-2 py-3'>
                  <button className='bg-gradient-to-tr from-[#2ED8B6] to-[#59E0C5] text-white text-xs py-1 px-2 rounded-md'><i class="fa-solid fa-check"></i></button>
                  <button className='bg-gradient-to-tr from-[#FF5370] to-[#FF869A] text-white py-1 px-2 rounded-md text-xs'><i class="fa-solid fa-xmark"></i></button>
                </td>
                <td className='text-left'>
                  <button className='bg-gradient-to-tr from-[#FFB64D] to-[#FFCB80] text-white text-xs py-1 px-2 rounded-md'><i class="fa-solid fa-user"></i></button>
                </td>
              </tr>
                ))
              }
            </thead>
            </table>  
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

export default Index
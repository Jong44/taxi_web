import AdminLayout from '@/components/global/adminlayout'
import Head from 'next/head'
import React from 'react'

const Dokter = () => {
  return (
    <>
      <Head>
        <title>Dokter List</title>
      </Head>
      <AdminLayout>
        <div className='w-auto m-6 bg-white px-6 py-4 rounded-md shadow-md'>
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
                <th scope='col' className='text-left'>Detail</th>
                <th scope='col' className='text-left'>Status</th>
                <th scope='col' className='text-left'>Action</th>
              </tr>
              {
                Array.from({ length: 10 }).map((_, index) => (
                  <tr className='text-sm border-b'>
                    <th scope='row' className='text-left p-4'>{index +1}</th>
                    <td className='text-left'>Dr Humam</td>
                    <td className='text-left'>humam@gmail.com</td>
                    <td className='text-left'>08123456789</td>
                    <td className='text-left'>Bandung</td>
                    <td className='text-left'>123456789</td>
                    <td className='text-left'>
                      <button className='bg-gradient-to-tr from-[#FFB64D] to-[#FFCB80] text-white text-xs py-1 px-2 rounded-md'><i class="fa-solid fa-user"></i></button>
                    </td>
                    <td>

                    </td>
                    <td className='text-left flex justify-left items-left gap-2 py-3'>
                      <button className='bg-gradient-to-tr from-[#2ED8B6] to-[#59E0C5] text-white text-xs py-1 px-2 rounded-md'><i class="fa-solid fa-check"></i></button>
                      <button className='bg-gradient-to-tr from-[#FF5370] to-[#FF869A] text-white py-1 px-2 rounded-md text-xs'><i class="fa-solid fa-xmark"></i></button>
                    </td>
                  </tr>
                ))
              }
            </thead>
          </table>
        </div>
      </AdminLayout>
    </>
  )
}

export default Dokter
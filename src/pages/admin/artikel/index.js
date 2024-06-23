import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/global/adminlayout'
import Head from 'next/head'
import Link from 'next/link'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import db from '@/config/firestore'
import formatDate from '@/utils/formatDate'
import Swal from 'sweetalert2'

const Artikel = () => {
  const [artikel, setArtikel] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchArtikel = async () => {
    try{
      const querySnapshot = await getDocs(collection(db, 'artikel'))
      setArtikel(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setLoading(false)
    }catch(e){
      console.error(e)
    }
  }

  const handleDelete = async (id) => {
    try{
      await deleteDoc(doc(db, 'artikel', id))
      alertSuccess()
      fetchArtikel()
    }catch(e){
      console.error(e)
    }
  }

  const alertSuccess = () => {
    Swal.fire({
        title: 'Success',
        text: 'Artikel berhasil dihapus',
        icon: 'success',
        confirmButtonText: 'Ok'
    });
  }

  const alertDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id)
      }
    });
  }



  useEffect(() => {
    fetchArtikel()
  }, [])

  if(loading){
    return <AdminLayout>
      <div className='flex justify-center items-center h-screen'>
      <div className="lds-facebook"><div></div><div></div><div></div></div>
    </div>
    </AdminLayout>
  }

  return (
    <>
      <Head>
        <title>Artikel List</title>
      </Head>
      <AdminLayout>
        <div className='px-6 py-2 pt-6'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2'>
              <Link href={'artikel/addArtikel'}  className='bg-gradient-to-tr from-[#FFB64D] to-[#FFCB80] text-white text-xs py-2 px-3 rounded-md'>Tambah Artikel</Link>
              <button className='bg-gradient-to-tr from-[#2ED8B6] to-[#59E0C5] text-white text-xs py-2 px-3 rounded-md'>Filter</button>
            </div>
            <div className='flex gap-2'>
              <input type='text' placeholder='Cari Artikel' className='border border-[#E0E0E0] rounded-md py-2 px-3 text-sm' />
            </div>
          </div>
        </div>

        <div className='w-auto mx-6 bg-white px-6 py-4 rounded-md shadow-md'>
          <p className='text-[#3A405B] font-medium text-sm'>ARTIKEL LIST</p>
          <table className='w-full mt-1 bg-white' border={1}>
            <thead>
              <tr className='text-sm border-b'>
                <th scope='col' className='text-left p-4'>No</th>
                <th scope='col' className='text-left'>Judul</th>
                <th scope='col' className='text-left'>Penulis</th>
                <th scope='col' className='text-left'>Kategori</th>
                <th scope='col' className='text-left'>Diupload pada</th>
                <th scope='col' className='text-left'>Status</th>
                <th scope='col' className='text-left'>Action</th>
              </tr>
              {
                artikel.map((item, index) => (
                  <tr className='text-sm border-b' key={index}>
                    <th scope='row' className='text-left p-4'>{index + 1}</th>
                    <td className='text-left'>{item.title}</td>
                    <td className='text-left'>{item.creator}</td>
                    <td className='text-left'>{item.category}</td>
                    <td className='text-left'>{formatDate(item.createdAt)}</td>
                    <td className='text-left'>
                      {item.published ? (
                        <span className='bg-green-700 text-white px-3 py-2 rounded-md w-10'>Published</span>
                      ) : (
                        <span className='bg-yellow-500 text-white px-3 py-2 rounded-md'>Draft</span>
                      )}
                    </td>
                    <td className='text-left flex justify-left items-left gap-2 py-3'>
                      <Link href={`artikel/${item.id}`} className='bg-gradient-to-tr from-[#FFB64D] to-[#FFCB80] text-white text-xs py-1 px-2 rounded-md'><i className="fa-regular fa-pen-to-square"></i></Link>
                      <button className='bg-gradient-to-tr from-[#FF5370] to-[#FF869A] text-white py-1 px-2 rounded-md text-xs' onClick={()=>alertDelete(item.id)}><i className="fa-regular fa-trash-can"></i></button>
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

export default Artikel
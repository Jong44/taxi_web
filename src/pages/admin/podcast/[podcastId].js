import db from '@/config/firestore'
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/global/adminlayout'
import Link from 'next/link'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import app from '@/config/firebase'
import Swal from 'sweetalert2'

const PodcastDetail = () => {
  const router = useRouter()
  const podcastId = router.query.podcastId
  const [podcast, setPodcast] = useState({})
  const [loading, setLoading] = useState(true)
  const [audio, setAudio] = useState(null)
  const [image, setImage] = useState(null)
  const [selectedCategoryActive, setSelectedCategoryActive] = useState(false)
  const [categoryDefault, setCategoryDefault] = useState([
    {
      "id": 1,
      "name": "Sunyi",
      "active": false
    },
    {
      "id": 2,
      "name": "Malam",
      "active": false
    },
    {
      "id": 3,
      "name": "Kesepian",
      "active": false
    },
    {
      "id": 4,
      "name": "Keluarga",
      "active": false
    },
    {
      "id": 5,
      "name": "Pendidikan",
      "active": false
    },
    {
      "id": 6,
      "name": "Hubungan",
      "active": false
    },
    {
      "id": 7,
      "name": "Meditasi",
      "active": false
    },
    {
      "id": 8,
      "name": "Trauma",
      "active": false
    }
  ])

  const handleChange = (e) => {
    setPodcast({ ...podcast, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    if (e.target.name === 'audio') {
      setAudio(e.target.files[0])
    } else {
      setImage(e.target.files[0])
    }
  }

  useEffect(() => {
    const getPodcast = async () => {
      try {
        const docRef = doc(db, 'podcasts', podcastId)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
          setPodcast(docSnap.data())
          setCategoryDefault(categoryDefault.map(category => ({ ...category, active: docSnap.data().category.includes(category.name) })))
          setLoading(false)
        }else{
          console.log('No such document!')
        }
      }catch(e){
        console.error(e)
      }
    }
    getPodcast()
  }, [podcastId])

  const handleActiveCategory = (category) => {
    setCategoryDefault(categoryDefault.map(item => item.id === category.id ? { ...item, active: !item.active } : item))
  }

  const upload = async (status) => {
    try{
      const storage = getStorage(app);
      if(audio){
        const httpRef = ref(storage, podcast.audio)
        deleteObject(httpRef).then(() => {
          console.log('deleted')
        }
        ).catch((error) => {
          console.error(error)
        })
        const storageRef = ref(storage, 'audio/' + audio.name)
        const uploadTask = uploadBytesResumable(storageRef, audio)
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              alertLoadingAudio(progress)
              break
          }
        }, (error) => {
          console.error(error)
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateImage(status, downloadURL)
          })
        })
      }else{
        updateImage(status, podcast.audio)
      }
    }catch(e){
      console.error(e)
    }
  }

  const updateImage = async (status, audioURL) => {
    try{
      const storage = getStorage(app)
      if(image){
        const httpRef = ref(storage, podcast.image)
        deleteObject(httpRef).then(() => {
          console.log('deleted')
        }
        ).catch((error) => {
          console.error(error)
        })
        const storageRef = ref(storage, 'images/podcast/' + image.name)
        const uploadTask = uploadBytesResumable(storageRef, image)
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              alertLoadingImage(progress)
              break
          }
        }, (error) => {
          console.error(error)
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURLImage) => {
            updatePodcast(status, audioURL, downloadURLImage)
          })
        })
      }else{
        updatePodcast(status, audioURL, podcast.image)
      }
    }catch(e){
      console.error(e)
    }
  }

  const updatePodcast = async (status, audioURL, imageURL) => {
    const category = categoryDefault.filter(item => item.active).map(item => item.name)
    try{
      await updateDoc(doc(db, 'podcasts', podcastId), {
        title: podcast.title,
        publisher: podcast.publisher,
        audio: audioURL ? audioURL : podcast.audio,
        image: imageURL ? imageURL : podcast.image,
        category: category,
        published: status,
        update_at: serverTimestamp()
      })
      successAlert()
      await router.push('/admin/podcast')
    }catch(e){
      console.error(e)
    }
  }



  const successAlert = () => {
    Swal.fire({
      title: 'Success',
      text: 'Podcast berhasil diupdate',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

    const alertLoadingAudio = (progress) => {
      Swal.fire({
          title: 'Uploading Audio',
          html: `<div class="lds-facebook"><div></div><div></div><div></div></div>`,
          showConfirmButton: false,
          allowOutsideClick: false
      });
  }

  const alertLoadingImage = (progress) => {
    Swal.fire({
        title: 'Uploading Image',
        html: `<div class="lds-facebook"><div></div><div></div><div></div></div>`,
        showConfirmButton: false,
        allowOutsideClick: false
    });
  }

  if (loading) {
    return <AdminLayout>
        <div className='flex justify-center items-center h-screen'>
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
    </AdminLayout>
}

if(!podcast){
    return <AdminLayout>
        <div className='flex justify-center items-center h-screen'>
            <p>Artikel tidak ditemukan</p>
        </div>
    </AdminLayout>
}

  return (
    <>
      <Head>
        <title>Podcast Detail</title>
      </Head>
      <AdminLayout>
            <div className='px-6 py-2 pt-6 mb-2'>
                <Link href={'/admin/podcast'} ><i className="fa-solid fa-arrow-left"></i><span>Kembali</span></Link>
            </div>
            <div className='w-auto mx-6 bg-white px-6 py-4 rounded-md shadow-md'>
                <p className='text-[#3A405B] font-medium text-sm'>UPDATE PODCAST</p>
                <div className='mt-4' >
                    <div className='grid grid-cols-1 gap-6'>
                        <div>
                            <label className='text-sm' >Judul</label>
                            <input type='text' id='title' className='border border-[#E0E0E0] rounded-md w-full py-2 px-3 text-sm' name='title' onChange={handleChange} value={podcast.title}/>
                        </div>
                        <div>
                            <label className='text-sm'>Publisher</label>
                            <input type='text' id='publisher' className='border border-[#E0E0E0] rounded-md w-full py-2 px-3 text-sm' name='publisher' onChange={handleChange} value={podcast.publisher}/>
                        </div>
                        <div>
                          <label className='text-sm'>Kategori</label>
                          <div className=''>
                            <p className='border border-[#E0E0E0] rounded-md w-full py-2 px-3 text-sm cursor-pointer' onClick={()=> setSelectedCategoryActive(!selectedCategoryActive)}>Pilih Kategori</p>
                            {
                              selectedCategoryActive && (
                                <div className='border border-[#E0E0E0] rounded-md w-full py-2 px-3 text-sm'>
                                  {
                                    categoryDefault.map((category, index) => (
                                      <div key={index} className='py-2 px-3 hover:bg-[#F2F2F2] cursor-pointer flex gap-3' onClick={()=>handleActiveCategory(category)}>
                                        <div className='w-5 h-5 rounded-md border flex justify-center items-center text-[12px]'>
                                          {category.active ? <i className="fa-solid fa-check"></i> : ''}
                                        </div>  
                                        <p>{category.name}</p>
                                      </div>
                                    ))
                                  }
                                </div>
                              )
                            }
                          </div>
                        </div>
                        <div>
                            <label className='text-sm'>File Audio</label>
                            <input type='file' accept='audio/*' id='audio' name='audio' className='border border-[#E0E0E0] rounded-md w-full py-2 px-3 text-sm' onChange={handleFileChange} />
                        </div>
                        <div>
                            <p className='text-sm'>Preview Audio</p>
                            {audio ? <audio controls src={URL.createObjectURL(audio)} className='w-full'/> : <audio controls src={podcast.audio} className='w-full'/>}
                        </div>
                        <div>
                            <label className='text-sm'>Thumbnail</label>
                            <input type='file' accept='image/*' id='image' name='image' className='border border-[#E0E0E0] rounded-md w-full py-2 px-3 text-sm'  onChange={handleFileChange} />
                        </div>
                        <div>
                            <p className='text-sm'>Preview Thumbnail</p>
                            <div className='w-[15rem] h-[8rem] bg-cyan-50'>
                                {
                                    image ? <img src={URL.createObjectURL(image)} alt='thumbnail' className='w-full h-full object-cover' /> : <img src={podcast.image} alt='thumbnail' className='w-full h-full object-cover' />
                                }
                            </div>
                        </div>
                        <div className='flex gap-2'>
                          <button className='bg-gradient-to-tr from-[#FFB64D] to-[#FFCB80] text-white text-xs py-2 px-3 rounded-md' onClick={()=>upload(true)}>Publish</button>
                          <button className='bg-gradient-to-tr from-[#FF5370] to-[#FF869A] text-white text-xs py-2 px-3 rounded-md' onClick={()=>upload(false)}>Draft</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    </>
  )
}

export default PodcastDetail
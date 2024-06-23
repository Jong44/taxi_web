import AdminLayout from '@/components/global/adminlayout';
import db from '@/config/firestore';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Image from 'next/image';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import app from '@/config/firebase';

const Index = () => {
    const router = useRouter();
    const idArtikel = router.query.idArtikel;
    const [loading, setLoading] = useState(true);
    const [artikel, setArtikel] = useState({});
    const [newImage, setNewImage] = useState(null);

    const categories = [
        'Anak-Anak',
        'Remaja',
        'Dewasa',
        'Keluarga',
        'Pekerjaan',
        'Hubungan',
        'Spiritual'
    ];

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtikel(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleFileChange = (e) => {
        setNewImage(e.target.files[0]);
    }

    const handleUpdate = async (isPublished) => {
        const storage = getStorage(app);
        if(newImage){
            const httpRef = ref(storage, artikel.image);
            deleteObject(httpRef).then(() => {
                console.log('Image deleted');
            }).catch((error) => {
                console.error(error);
            });

            const storageRef = ref(storage, 'images/artikel/' + newImage.name);
            const uploadTask = uploadBytesResumable(storageRef, newImage);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        alertLoading();
                        
                        break;
                }
            }, (error) => {
                console.error(error);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateArtikel(idArtikel, downloadURL, isPublished);
                });
            });
        }else{
            updateArtikel(idArtikel, artikel.image, isPublished);
        }
    }

            



    const updateArtikel = async (id, newImages, isPublished) => {
        try {
            await updateDoc(doc(db, 'artikel', id), {
                title: artikel.title,
                category: artikel.category,
                content: artikel.content,
                published: isPublished,
                image: newImages ? newImages : artikel.image
            });
            alertSuccess();
            await router.push('/admin/artikel');
        } catch (e) {
            console.error(e);
        }
    }


    useEffect(() => {
        const getArtikel = async () => {
            try {
                if (idArtikel) {
                    const docRef = doc(db, 'artikel', idArtikel);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        console.log('Document data:', docSnap.data());
                        setArtikel(docSnap.data());
                    } else {
                        console.log('No such document!');
                    }
                }
            } catch (e) {
                console.error(e.message);
            } finally {
                setLoading(false);
            }
        };

        getArtikel();
    }, [idArtikel]);

    const alertLoading = (progress) => {
        Swal.fire({
            title: 'Uploading',
            html: `<div class="lds-facebook"><div></div><div></div><div></div></div>`,
            showConfirmButton: false,
            allowOutsideClick: false
        });
    }


    const alertSuccess = () => {
        Swal.fire({
            title: 'Success',
            text: 'Artikel berhasil diupdate',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    }

    
    if (loading) {
        return <AdminLayout>
            <div className='flex justify-center items-center h-screen'>
                <div className="lds-facebook"><div></div><div></div><div></div></div>
            </div>
        </AdminLayout>
    }

    if(!artikel){
        return <AdminLayout>
            <div className='flex justify-center items-center h-screen'>
                <p>Artikel tidak ditemukan</p>
            </div>
        </AdminLayout>
    }

    return (
        <>
            <Head>
                <title>Artikel Detail</title>
            </Head>
            <AdminLayout>
                <div className='px-6 py-2 pt-6 mb-2'>
                    <Link href={'/admin/artikel'} ><i className="fa-solid fa-arrow-left"></i> <span>Kembali</span></Link>
                </div>
                <div className='w-auto mx-6 bg-white px-6 py-4 rounded-md shadow-md'>
                    <p className='text-[#3A405B] font-medium text-sm'>Edit ARTIKEL</p>
                    <div className='mt-4' >
                        <div className='grid grid-cols-1 gap-6'>
                            <div>
                                <label className='text-sm' >Judul</label>
                                <input type='text' id='title' className='border border-[#E0E0E0] rounded-md w-full py-2 px-3 text-sm' name='title' value={artikel?.title} onChange={handleChange} />
                            </div>
                            <div>
                                <label className='text-sm'>Kategori</label>
                                <select id='category' name='category' className='border border-[#E0E0E0] rounded-md w-full py-2 px-3 text-sm' onChange={handleChange}>
                                    <option value=''>Pilih Kategori</option>
                                    {
                                        categories.map((item, index) => (
                                            <option key={index} value={item} selected={artikel.category == item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label className='text-sm'>Konten</label>
                                <textarea id='content' name='content' className='border border-[#E0E0E0] rounded-md w-full py-2 px-3 text-sm' value={artikel.content} onChange={handleChange}></textarea>
                            </div>
                            <div>
                                <label className='text-sm'>Gambar</label>
                                <input type='file' id='image' name='image' className='border border-[#E0E0E0] rounded-md w-full py-2 px-3 text-sm' onChange={handleFileChange} />
                            </div>
                            <div>
                            <p className='text-sm'>Preview Image</p>
                            <div className='w-[15rem] h-[8rem] bg-cyan-50'>

                                {newImage ? (
                                    <img src={URL.createObjectURL(newImage)} className='w-full h-full object-cover' />
                                ) : (
                                    <img src={artikel.image} className='w-full h-full object-cover' />
                                )}
                            </div>
                            </div>
                            <div className='flex gap-2'>
                                <button className='bg-gradient-to-tr from-[#FFB64D] to-[#FFCB80] text-white text-xs py-2 px-3 rounded-md' onClick={()=>handleUpdate(true)} >Publish</button>
                                <button className='bg-gradient-to-tr from-[#FF5370] to-[#FF869A] text-white text-xs py-2 px-3 rounded-md' onClick={()=>handleUpdate(false)}>Draft</button>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>

    )
}

export default Index
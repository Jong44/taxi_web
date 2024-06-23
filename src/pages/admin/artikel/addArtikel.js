import AdminLayout from '@/components/global/adminlayout'
import Head from 'next/head'
import React, { useState } from 'react'
import Link from 'next/link';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import app from '@/config/firebase';
import db from '@/config/firestore';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const Index = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        category: '',
        content: '',
        imageURL: ''
    })

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleUpload = async (isPublished) => {
        const storage = getStorage(app);
        try{
            const storageRef = ref(storage, 'images/artikel/' + image.name)
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            }, (error) => {
                console.error(error);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setForm({
                        ...form,
                        imageURL: downloadURL
                    });
                    handleUploadFirestore(isPublished, downloadURL)
                });
            });

            console.log('File uploaded successfully');
        }catch(eror){
            console.log(eror);
        }
    }

    const handleUploadFirestore = async (isPublished, urlImage) => {
        try{
            const docRef = await addDoc(collection(db, 'artikel'), {
                title: form.title,
                creator: 'Admin',
                category: form.category,
                content: form.content,
                image: urlImage,
                published: isPublished,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            console.log('Document written with ID: ', docRef.id);
        }catch(error){
            console.error('Error adding document: ', error);
        }
    }
    
    const uploadAll = (isPublished) => {
        return () => {
            handleUpload(isPublished);
            alert();
            router.push('/admin/artikel');

        }
    }

    const alert = () => {
        Swal.fire({
            title: 'Success',
            text: 'Artikel berhasil ditambahkan',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    }





  return (
    <>
        <Head>
            <title>Add Artikel</title>
        </Head>
        <AdminLayout>
            <div className='px-6 py-2 pt-6 mb-2'>
                <Link href={'/admin/artikel'} ><i className="fa-solid fa-arrow-left"></i> <span>Kembali</span></Link>
            </div>
            <div className='w-auto mx-6 bg-white px-6 py-4 rounded-md shadow-md'>
                <p className='text-[#3A405B] font-medium text-sm'>ADD ARTIKEL</p>
                <div className='mt-4' >
                    <div className='grid grid-cols-1 gap-6'>
                        <div>
                            <label className='text-sm' >Judul</label>
                            <input type='text' id='title' className='border border-[#E0E0E0] rounded-md w-full py-2 px-3 text-sm' name='title' onChange={handleChange}/>
                        </div>
                        <div>
                            <label className='text-sm'>Kategori</label>
                            <select id='category' name='category' className='border border-[#E0E0E0] rounded-md w-full py-2 px-3 text-sm'  onChange={handleChange}>
                                <option value=''>Pilih Kategori</option>
                                <option value='Anak-Anak'>Anak-Anak</option>
                                <option value='Remaja'>Remaja</option>
                                <option value='Dewasa'>Dewasa</option>
                                <option value='Keluarga'>Keluarga</option>
                                <option value='Pekerjaan'>Pekerjaan</option>
                                <option value='Hubungan'>Hubungan</option>
                                <option value='Spiritual'>Spiritual</option>
                            </select>
                        </div>
                        <div>
                            <label className='text-sm'>Konten</label>
                            <textarea id='content' name='content' className='border border-[#E0E0E0] rounded-md w-full py-2 px-3 text-sm'  onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <label className='text-sm'>Gambar</label>
                            <input type='file' id='image' name='image' className='border border-[#E0E0E0] rounded-md w-full py-2 px-3 text-sm'  onChange={handleFileChange} />
                        </div>
                        <div className='flex gap-2'>
                            <button className='bg-gradient-to-tr from-[#FFB64D] to-[#FFCB80] text-white text-xs py-2 px-3 rounded-md' onClick={uploadAll(true)}>Publish</button>
                            <button className='bg-gradient-to-tr from-[#FF5370] to-[#FF869A] text-white text-xs py-2 px-3 rounded-md' onClick={uploadAll(false)}>Draft</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    </>

  )
}

export default Index
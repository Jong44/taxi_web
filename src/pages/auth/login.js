import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { loginWithEmailAndPassword } from '../../utils/auth'

const Index = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }
    
    const handleLogin = async () => {
        if (email === '' || password === '') {
            setError('Email dan Password harus diisi');
            return;
        }
        const response = await loginWithEmailAndPassword({email, password});
        if (response.error) {
            setError(response.error);
            return;
        }
        localStorage.setItem('token', JSON.stringify(response.user.stsTokenManager.accessToken));
        router.push('/admin');
    }

  return (
    <>
        <Head>
            <title>Login Admin</title>
        </Head>
        <main className='h-screen w-full bg-gradient-purple flex justify-center items-center'>
            <div className='bg-primary-white w-[400px] h-[400px] rounded-md'>
                <h1 className='text-primary-purple text-3xl text-center pt-10'>Login Admin</h1>
                <div className='px-10'>
                    <div className='mb-4 mt-10'>
                        <label htmlFor='Email' className='block text-primary-purple text-sm font-medium'>Email</label>
                        <input type='text' id='Email' name='email' className='mt-1 block w-full px-3 py-2 border border-primary-purple rounded-md shadow-sm focus:outline-none focus:ring-primary-purple focus:border-primary-purple sm:text-sm' onChange={handleChanges} />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='password' className='block text-primary-purple text-sm font-medium'>Password</label>
                        <input type='password' id='password' name='password' className='mt-1 block w-full px-3 py-2 border border-primary-purple rounded-md shadow-sm focus:outline-none focus:ring-primary-purple focus:border-primary-purple sm:text-sm' onChange={handleChanges} />
                    </div>
                    <p className='text-red-500 text-sm'>{error}</p>
                    <button className='w-full bg-primary-purple text-primary-white p-2 rounded-md hover:bg-primary-blue mt-5' onClick={()=>handleLogin()}>Login</button>
                </div>
            </div>
        </main>
    </>
  )
}

export default Index
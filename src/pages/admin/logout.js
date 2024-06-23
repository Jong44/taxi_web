import app from '@/config/firebase';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Index = () => {
    const router = useRouter();
    const auth = getAuth(app);

    useEffect(() => {
        auth.signOut().then(() => {
            router.push('/auth/login');
        });
        localStorage.removeItem('token');
    }, []);
    
  return (
    <>
      
    </>
  )
}

export default Index
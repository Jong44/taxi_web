import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

const Index = () => {
  const router = useRouter();
  const [active, setActive] = useState(router.pathname);
  const menu = [
    {
      name: 'Dashboard',
      icon: '/assets/images/icons/dashboard.svg',
      link: '/admin/dashboard'
    },
    {
      name: 'Dokter',
      icon: '/assets/images/icons/doctor.svg',
      link: '/admin/dokter'
    },
    {
      name: 'Pengguna',
      icon: '/assets/images/icons/member.svg',
      link: '/admin/pengguna'
    },
    {
      name: 'Podcast',
      icon: '/assets/images/icons/podcast.svg',
      link: '/admin/podcast'
    },
    {
      name: 'Artikel',
      icon: '/assets/images/icons/article.svg',
      link: '/admin/artikel'
    },
    {
      name: 'Transaksi',
      icon: '/assets/images/icons/transaksi.svg',
      link: '/admin/transaksi'
    },
    {
      name: 'Tes Kesehatan Mental',
      icon: '/assets/images/icons/test.svg',
      link: '/admin/test-kesehatan-mental'
    },
    {
      name: 'Pengaturan',
      icon: '/assets/images/icons/setting.svg',
      link: '/admin/pengaturan'
    },
    {
      name: 'Keluar',
      icon: '/assets/images/icons/logout.svg',
      link: '/admin/logout'
    }




  ];

  return (
    <div>
      <div className='flex flex-col justify-center items-center gap-1 py-12'>
        <div className='w-20 h-20 rounded-xl shadow-lg'>
          <Image src='/assets/images/albi.jpg' width={0} height={0} loading='eager' sizes='1000px' quality={100} className='w-full h-full object-cover rounded-xl' />
        </div>
        <p className='font-semibold text-sm'>Albireo Finioe</p>
        <p className='text-xs'>Administrator</p>
      </div>
      {
        menu.map((item, index) => (
          <Link href={item.link} key={index}>
            <div className={`w-full px-5 py-4 flex justify-between items-center text-xs ${active == item.link ? "bg-[#F4F6F9]" : ""}`} key={index}>
              <div className=' flex items-center gap-2 font-medium'>
                <Image width={17} height={17} src={item.icon} />
                <p className='text-xs'>{item.name}</p>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default Index
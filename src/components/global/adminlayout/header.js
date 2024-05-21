import React from 'react'
import Image from 'next/image'

const Index = () => {
  return (
    <header className="flex justify-between px-7 py-4 shadow-md">
      <div>
        <Image src={'/assets/images/logo_baru.svg'} width={130} height={100} alt="logo" />
      </div>
    </header>
  )
}

export default Index
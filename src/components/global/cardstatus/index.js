import React, { useState } from 'react'

const CardStatus = ({title, value, color, width}) => {
    
  return (
    <div className='bg-white shadow-md rounded-md py-4 px-5 w-[295px] h-[13 0px] flex flex-col justify-between'>
        <p className='font-bold'>{title}</p>
        <div>
            <div className='flex justify-between items-center'>
                <p className='text-xl font-bold text-[#28A745]'>{value}</p>
                <img src='/assets/images/icons/cardicon.svg' className='w-10'/>
            </div>
            <div className='w-full h-2 bg-[#E9ECEF] rounded-full mt-5'>
                <div className={`h-full rounded-full ${color}`} style={{width: `${width}%`}}></div>
            </div>
        </div>

    </div>
  )
}

export default CardStatus
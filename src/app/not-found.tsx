import React from 'react'
import NotFoundImg from "@/assets/images/common/not-found.svg"
import Image from 'next/image'

const NotFound = () => {
  return (
    <div className='bg-black flex items-center justify-center'> 
      <Image src={NotFoundImg} className='w-[500px]' alt='Không tìm thấy trang'/>
    </div>
  )
}

export default NotFound
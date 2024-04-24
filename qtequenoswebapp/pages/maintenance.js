import React from 'react'
import AnimatedImage from '@/components/animatedImage';

const Maintenance = () => {
  return (
    <div className='space-y-2 mx-auto grid place-items-center p-10'>
        <h1 className=' font-bold my-5 text-2xl lg:text-5xl'>En Mantenimiento</h1>
        <p className='text-center font-medium'>Este sitio se encuentra en mantenimiento</p>
        <img src='https://i.postimg.cc/qMvq4HY8/bgrond-15.jpg' alt='En mantenimiento' className='w-[80%] lg:w-[40%]'/>
        <p className=' font-base'>Colocarce en contacto con soporte tecnico - incumplimiento de pago</p>
    </div>
  )
}

export default Maintenance
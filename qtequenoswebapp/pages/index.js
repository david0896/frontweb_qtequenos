import { useState } from "react"; 
import Image from "next/image";
import Layout from "@/components/layout";
import Link from "next/link";
import styles from '../styles/styles.module.css'
import CarruselMain from "@/components/carruselMain";
import CarruselProductCard from "@/components/carruselProductCard";


export default function Home() {
  let productsFlavors = [
    {"id":1,"imagen":"/img/tequenosQueso.png","titulo":"queso","precio":"10,00","url":"https://api.whatsapp.com/send/?phone=584122121462&text=Hola%20Ym2%20papelería%20quisiera%20mas%20información%20sobre%20estuche%20triangular%20safari%20exodus%20a19%20https://ibb.co/8smQ7v1"}
    ,    
    {"id":2,"imagen":"/img/tequenosQueso.png","titulo":"queso y guayaba","precio":"12,00","url":"https://api.whatsapp.com/send/?phone=584122121462&text=Hola%20Ym2%20papelería%20quisiera%20mas%20información%20sobre%20cava%20morral%20kavak%20relax%20https://ibb.co/drM7DDQ"}
    ,
    {"id":3,"imagen":"/img/tequenosQueso.png","titulo":"chocolate","precio":"10,50","url":"https://api.whatsapp.com/send/?phone=584122121462&text=Hola%20Ym2%20papelería%20quisiera%20mas%20información%20sobre%20bolso%20sport%20safari%20exodus%20a1918%20https://ibb.co/0MMCMNb"}
    ,
  ];

  return (
    <>
      <Layout
        title={'Inicio'}
        description={''}
      >
        <CarruselMain/>
        {/* seccion uno sabores */}
        <div className="px-5 mt-10 mx-auto lg:w-9/12 overflow-hidden lg:overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-2 pb-10">
              <h1 className=" text-5xl my-10 uppercase text-[#f5884d] font-bold">Sabores 
                <span className="text-[#c21a7f] block">que </span>
                <span className="text-[#c21a7f] ">provocan </span>
              </h1>
              <p className=" text-xl text-gray-800">
              Descubre nuestra 
              variedad de exquisitos 
              rellenos que te 
              transportarán a un 
              mundo lleno de deleite 
              y placer culinario
              </p>
            </div>
            <div className="lg:col-span-3 p-10 -ml-[4rem] lg:ml-0 w-[42rem] mx-auto">
              <CarruselProductCard
                products={productsFlavors}
              />
            </div>
          </div>
        </div>
        {/* seccion banner 1*/}
        <div className="bg-[#f5884d]">
          <div className="px-5 py-5 mx-auto lg:w-9/12">
            <h2 className="text-center uppercase text-4xl font-bold text-white">tequeños: 70% relleno 30% masa</h2>
          </div>
        </div>
        {/* descripción 1*/}
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className=" col-span-2 px-4 lg:pl-[29%] lg:pr-10 py-10 grid lg:content-center">
            <p className=" text-xl text-gray-800">
              Nos apasionamos por 
              llevar a tu mesa los 
              mejores tequeños y 
              pastelitos del mercado. 
              Pero, ¿qué hace nuestros 
              productos tan especiales?
            </p>
          </div>
          <div className=" col-span-2">
            <Image width={1080} height={720} src="/img/tequenosEnplato.jpg" className='object-cover' alt="foto referencial de tequeños"/>
          </div>
        </div>   
        {/* descripción 2 viewphone*/}
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:hidden">
          <div className=" col-span-2 px-4 lg:pl-[29%] lg:pr-10 py-10 grid lg:content-center">
            <p className=" text-xl text-gray-800">
              Cuidamos cada detalle en su 
              elaboración. Nos esforzamos 
              en utilizar únicamente los 
              ingredientes de la más alta 
              calidad, para garantizar un 
              producto fresco y delicioso
            </p>
          </div>
          <div className=" col-span-2">
            <Image width={1080} height={720} src="/img/tequenosEnplato.jpg" className='object-cover' alt="foto referencial de tequeños"/>
          </div>
        </div>      
        {/* descripción 2*/}
        <div className="hidden lg:grid grid-cols-4">
          <div className=" col-span-2">
            <Image width={1080} height={720} src="/img/tequenosEnplato.jpg" className='object-cover' alt="foto referencial de tequeños"/>
          </div>
          <div className=" col-span-2 pr-[29%] pl-10 py-10 grid content-center">
            <p className=" text-xl text-gray-800">
              Cuidamos cada detalle en su 
              elaboración. Nos esforzamos 
              en utilizar únicamente los 
              ingredientes de la más alta 
              calidad, para garantizar un 
              producto fresco y delicioso
            </p>
          </div>
        </div>
        {/* seccion banner 2*/}
        <div className="bg-[#f5884d]">
          <div className="px-5 py-5 mx-auto lg:w-9/12">
            <h2 className="text-center uppercase text-4xl font-bold text-white">lO MÁS RICO, AHORA VIENE EN PRESENTACIÓN DE PASTELITO</h2>
          </div>
        </div>
        {/* descripción 3*/}
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="col-span-2 px-4 lg:pl-[29%] lg:pr-10 py-10 grid lg:content-center space-y-8">
            <p className=" text-xl text-gray-800">
              ¡Déjate conquistar por 
              el auténtico sabor de 
              nuestros pastelitos y 
              encuentra tu favorito 
              en cada bocado!
            </p>
            <button type="button" className=" w-fit font-bold text-white bg-[#c21a7f] hover:bg-[#970b5f] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-3.5 h-3.5 mr-2 hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
              </svg>
              COMPRAR
            </button>
          </div>
          <div className=" col-span-2">
            <Image width={1080} height={720} src="/img/tequenosEnplato.jpg" className='object-cover' alt="foto referencial de tequeños"/>
          </div>
        </div> 
      </Layout>
    </>
  )
}
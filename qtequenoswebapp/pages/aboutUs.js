import Image from "next/image";
import Layout from "@/components/layout";
import { ParallaxBanner } from 'react-scroll-parallax';
import { useFetchUser } from '../lib/authContext';

export default function AboutUs({shoppingCart}) {
    const { user, loading } = useFetchUser();

    return (
        <Layout
            user={user} 
            title={'Quienes somos'}
            description={'Informacipon de la empresa'}
            shoppingCart={shoppingCart}
        >
            <div className="">
                {/* <Image width={1080} height={720} src="https://i.postimg.cc/wMcBtzrL/banner-de-qteque-os-quienes-somos.webp" className='h-[25rem] object-cover w-screen' alt="Tequeños de queso"/>     */}
                <ParallaxBanner
                    layers={[{ image: 'https://i.postimg.cc/52trD7K1/Firefly-20231123145835.png', speed: -15 }]}
                    className="aspect-[2/1] w-screen h-[25rem]"
                />
            </div>
            <div className="px-4 mt-10 mb-[6rem] mx-auto lg:w-9/12">
                <div className="grid grid-cols-1 lg:grid-cols-4">
                    <div className=" col-span-2">
                        <h1 className="px-4 lg:px-0 text-5xl my-10 uppercase text-[#c21a7f] font-bold">¿Quiénes 
                            <span className="text-[#f5884d] block text-7xl">somos?</span>
                        </h1>
                        <Image width={1080} height={720} src="https://i.postimg.cc/mr9t9km1/bandeja-grande-de-teque-os.png" className='object-cover w-screen -rotate-6 -ml-[2.5rem]' alt="Bandeja grande de tequeños de queso"/>    
                    </div>
                    <div className=" col-span-2 my-10 space-y-5 px-4 lg:px-0">
                        <p className=" text-xl text-gray-800">
                            Desde el año 2010 nos dedicamos a 
                            la elaboración del auténtico y tradicional 
                            tequeño venezolano. Para ello y para 
                            lograr entrar, a través de nuestros 
                            variados productos, en el corazón de las 
                            celebraciones y festejos de los 
                            venezolanos, nos empeñamos en la 
                            búsqueda de ingredientes óptimos
                        </p>
                        <p className=" text-xl text-gray-800">
                            Nuestra masa, finamente delgada y 
                            crujiente al freír, es el producto de una 
                            típica receta de tradición casera y de un 
                            elaborado proceso sistematizado, sin 
                            levadura ni conservantes, con suculentos 
                            y variados rellenos. Es así como nuestros 
                            tequeños, por su estética y sabor, han 
                            ganado un lugar privilegiado dentro de 
                            la categoría del pasapalo gourmet
                        </p>
                        <p className=" text-xl text-gray-800">
                            El esmero en el procesamiento, control 
                            de calidad, empaque y almacenamiento 
                            del producto, además de una eficiente 
                            distribución, nos coloca al alcance del 
                            consumo masivo con un producto 
                            estandarizado y de alta manufactura,
                            a través de restaurantes, cines 
                            bodegones, entre otros.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
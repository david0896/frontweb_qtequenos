import Image from "next/image";
import Layout from "@/components/layout";
import { ParallaxBanner } from 'react-scroll-parallax';
import { useFetchUser } from '../lib/authContext';

export default function Service() {
    const { user, loading } = useFetchUser();

    return (
        <Layout
            user={user}  
            title={'Quienes somos'}
            description={'Servicios que presta la empresa'}
        >
            <div className="">
                <ParallaxBanner
                    layers={[{ image: 'https://i.postimg.cc/JnyBZwQT/Firefly-20231123150803.png', speed: -15 }]}
                    className="aspect-[1/2] h-[25rem] object-contain"
                />
                
            </div>
            <div className=" relative mb-[20rem]">
                <div className="px-5 mt-10 mb-[6rem] mx-auto lg:w-9/12">
                    <div className="grid grid-cols-1 lg:grid-cols-4">
                        <div className=" col-span-2 space-y-5">
                            <h1 className="text-5xl my-10 uppercase text-[#f5884d] font-bold">Productos 
                                <span className="text-[#f5884d] block text-7xl uppercase">fritos</span>
                            </h1>
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
                            <h2 className="text-6xl lg:text-7xl uppercase my-10 text-[#c21a7f] font-bold">Eventos</h2>
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
                        </div>
                        <div className=" col-span-2 relative ">
                        </div>
                    </div>
                </div>
                <Image width={720} height={360} src="https://i.postimg.cc/25fCwzZy/bandeja-con-teque-os.png" alt="bandeja con tequeños" className="w-[30rem] h-[30rem] hidden lg:block absolute bottom-0 right-0 translate-y-[18rem] object-cover"/>
                <Image width={720} height={360} src="https://i.postimg.cc/ZK3hNpLF/mano-aguantando-un-paquete-de-teque-os.png" alt="mano con tequeños en un paquete" className="w-[15rem] lg:w-[30rem] h-[15rem] lg:h-[30rem] absolute bottom-0 lg:top-0 right-0 translate-y-[18rem] lg:translate-y-[10rem]  object-cover"/>
            </div>
        </Layout>
    )
}
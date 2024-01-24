import { useState } from "react";
import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import { useFetchUser } from '../lib/authContext';
import Image from "next/image";

export default function ContactUs({shoppingCart}) {
    const { user, loading } = useFetchUser();
    const [data, setData] = useState({
        floating_name       : '',
        floating_lastname   : '',
        floating_email      : '',
        floating_textarea   : '',
    });
    const router = useRouter();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        router.push(`https://wa.me/584143187888?text=Hola,%20Mi%20es%20${data.floating_name}%20${data.floating_lastname}%20:%20${data.floating_email}%20-%20quiero%20más%20información%20sobre%20${data.floating_textarea},%20espero%20su%20respuesta`);
    };

    return (
        <Layout
            user={user}      
            title={'Contacto'}
            description={'Comunicate con nosotros de manera rapida y sencilla'} 
            shoppingCart={shoppingCart}
        >
            <div className="relative">
                <Image 
                    src="https://i.postimg.cc/kX7Jwn6W/teque-fritos.jpg" 
                    width={4900} 
                    height={5080} 
                    layout="responsive"
                    unoptimized
                    priority 
                    quality={100}
                    blurDataURL
                    alt=""
                    className="hidden lg:inline-block lg:w-screen"
                />
                <div className="px-5 mt-5 mb-16 lg:w-auto lg:my-0 lg:absolute lg:top-[50%] lg:left-0 lg:space-y-5 lg:translate-x-[40%] lg:-translate-y-[50%]">
                    <h1 className=" text-center lg:text-left text-5xl font-bold uppercase text-[#f5884d] mb-3 lg:mb-0">Contacto</h1>
                    <p className="block text-xl font-medium text-gray-800">¿Quieres saber más sobre nuestros productos? <span className=" pt-2 lg:pt-0 text-gray-600 block text-lg">¡Contáctanos, nos encantaría escucharte!</span></p>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-7 pt-10">
                        <div className="col-span-2 space-y-5">
                            <div className="block w-[15rem]">
                                <h3 className="text-gray-800 text-lg font-semibold">Dirección</h3>
                                <p>Calle Primero de Mayo, Casa Numero 9 Alta Vista, Catia</p>
                            </div>
                            <div className="block">
                                <h3 className="text-gray-800 text-lg font-semibold">Telefonos</h3>
                                <p>0414 318 78 88</p>
                                <p>0212 862 47 57</p>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="block">
                                <h3 className="text-gray-800 text-lg font-semibold">Correo</h3>
                                <p>ventas@qtequenos.net</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-[5rem] lg:pb-[15rem] px-5 mx-auto lg:w-9/12">
                <h2 className=" text-center text-4xl font-semibold mb-4 text-[#c21a7f]">Póngase en contacto</h2>
                <p className=" mb-16 text-center">¡No te pierdas nuestros deliciosos productos! Completa el formulario y descubre más.</p>
                <form onSubmit={handleSubmit} className=" max-w-lg mx-auto">
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="floating_name" id="floating_name" onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#c21a7f] peer" placeholder=" " required />
                        <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:text-[#c21a7f] peer-focus:-translate-y-6">Nombre</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="floating_lastname" id="floating_lastname" onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#c21a7f] peer" placeholder=" " required />
                        <label htmlFor="floating_lastname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:text-[#c21a7f] peer-focus:-translate-y-6">Apellido</label>
                    </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="floating_email" id="floating_email" onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#c21a7f] peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-[#c21a7f] peer-focus:scale-75 peer-focus:-translate-y-6">Correo</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <textarea name="floating_textarea" id="floating_textarea" onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-[#c21a7f] peer" placeholder=" " required />
                    <label htmlFor="floating_textarea" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-[#c21a7f] peer-focus:scale-75 peer-focus:-translate-y-6">Mensaje</label>
                </div>
                <button type="submit" className='mt-4 w-fit font-bold text-white bg-[#c21a7f] hover:bg-[#970b5f] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm px-5 py-2.5 text-center inline-flex items-center'>Enviar</button>
                </form>
            </div>
            <div className=" w-screen">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.685297796671!2d-66.94218781604614!3d10.521039158930812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a5fc6433c59ef%3A0xf8775ac813cd6c36!2sQteque%C3%B1os!5e0!3m2!1ses!2sve!4v1706101877210!5m2!1ses!2sve" width="600"
              height="450"
              frameBorder="0"
              style="border:0;"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"></iframe>
            </div>
            
        </Layout>
    )
}
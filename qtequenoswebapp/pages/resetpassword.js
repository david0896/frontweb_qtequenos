import { useState } from "react"
import { useRouter } from 'next/router';
import { fetcher } from '../lib/api';
import Image from "next/image"
import Alerta from "@/components/alert"

export default function Resetpassword({alert, setAlert}) {
    const router = useRouter()
    const { code } = router.query
    const [data, setData] = useState({
        pass: '',
        confirmpass: '',
    });

    const handleSubmit = async (e) => {
        try {
        e.preventDefault();

        console.log(code)
        if(!(data.pass === data.confirmpass)){
            setAlert({
                message: 'Error en la confirmación de contraseña',
                tipo: 1
            })
            return 
        }
    
        const responseData = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/reset-password`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: code, 
                password: data.pass,
                passwordConfirmation: data.confirmpass,
            }),
          }
        );

        if(responseData){
            router.push('/loginRegister?form=login')
        }
    
        } catch (error) {
            setAlert({
                message: 'Ocurrio un error al cambiar la contraseña, ' + error,
                tipo: 1
            })
        }      
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    return (
        <div className="relative">
            <Image src={'https://i.postimg.cc/NFxdSfd4/marek-piwnicki-Af6c85-B5-BOk-unsplash.jpg'}
                   priority
                   width={1920} 
                   height={1080} 
                   alt="Background image" 
                   className="w'screen h-screen object-center"
            />
            {alert ?
                <Alerta
                    alert={alert}
                    setAlert={setAlert}
                />
                : ''
            }
            <div className="absolute inset-0 flex items-center justify-center py-5">
                <div className='bg-white w-[90%] lg:w-[60%] h-[90%] lg:h-[70%] rounded-3xl shadow-2xl shadow-gray-900/50 grid grid-cols-1 lg:grid-cols-5 z-10'>
                    <div className='relative col-span-3 overflow-hidden'>
                        <Image src={'https://i.postimg.cc/QN4qsNQb/bold-teque-background-1.jpg'} 
                            width={1080} 
                            height={720} 
                            alt="Background image" 
                            className=" rounded-t-3xl lg:rounded-s-3xl h-full object-cover"
                        />    
                        <div className='absolute inset-0 flex items-center justify-center flex-col pb-[5rem]'>
                            <Image src={'https://i.postimg.cc/1zYVNXvR/logo-qtq.webp'} 
                                width={1080} 
                                height={920} 
                                alt="Logo" 
                                className="object-contain w-[8rem] lg:w-[13rem] h-[13rem] flex flex-col items-center justify-center"
                            />  
                            <h1 className='text-base text-center font-medium text-[#d3850f] flex flex-col items-center justify-center'>
                                <span className='text-lg lg:text-2xl font-bold block'>Solo estas a un paso</span> 
                                de volver a ordenar los más sabrosos productos
                            </h1>
                        </div>
                    </div>
                    <div className='col-span-2 lg:p-10 grid content-center relative rounded-3xl'>
                        <div className=' bg-white -mt-[4rem] lg:mt-0 z-50 p-10 lg:p-0 rounded-3xl lg:rounded-none'>
                            <h2 className='text-lg font-bold text-[#d3850f] '>Restablecer contraseña</h2>                
                            <form onSubmit={handleSubmit} className="mt-5">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input  type="text"
                                            name="pass"
                                            onChange={handleChange} 
                                            id="pass" 
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                            placeholder="" 
                                            required 
                                    />
                                    <label htmlFor="pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#d3850f]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nueva contraseña</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input  type="text"
                                            name="confirmpass"
                                            onChange={handleChange} 
                                            id="confirmpass" 
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                            placeholder="" 
                                            required 
                                    />
                                    <label htmlFor="confirmpass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#d3850f]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirmar contraseña</label>
                                </div>
                                <button type="submit" className="text-white bg-[#d3850f] hover:bg-[#943800] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Enviar</button>
                            </form>
                        </div>
                    </div>            
                </div>
            </div>
        </div>
    )
}
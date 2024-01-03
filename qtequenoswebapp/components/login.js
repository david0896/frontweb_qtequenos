import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link';
import { fetcher } from '../lib/api';
import { setToken, unsetToken } from '../lib/auth';
import { useUser } from '../lib/authContext';

const Login = ({setAlert}) => {
    const router = useRouter();

    const [data, setData] = useState({
        identifier: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const responseData = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identifier: data.identifier,
              password: data.password,
            }),
          }
        );
    
        setToken(responseData, setAlert);
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className='bg-white w-[90%] lg:w-[60%] h-[90%] lg:h-[70%] rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-5 z-10'>
            <div className='relative col-span-3 overflow-hidden'>
                <div className=' block lg:hidden absolute top-0 left-0 m-5 z-10'>
                    <Link 
                        href="#" 
                        onClick={(event) => {
                            event.preventDefault();
                            router.back();
                        }}
                    >
                        <svg id="Layer_1" className='w-7 hover:cursor-pointer' enableBackground="new 0 0 100 100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g><path d="m44.93 76.47c.49.49 1.13.73 1.77.73s1.28-.24 1.77-.73c.98-.98.98-2.56 0-3.54l-21.43-21.43h51.96c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5h-51.96l21.43-21.43c.98-.98.98-2.56 0-3.54s-2.56-.98-3.54 0l-25.7 25.7c-.98.98-.98 2.56 0 3.54z"></path></g></svg>
                    </Link>
                </div>
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
                        <span className='text-lg lg:text-2xl font-bold block'>¡Bienvenido de vuelta!</span> 
                        ¿Te apetece algo dulce o salado hoy?
                    </h1>
                </div>
            </div>
            <div className='col-span-2 lg:p-10 grid content-center relative rounded-3xl'>
                <div className=' bg-white -mt-[4rem] lg:mt-0 z-50 p-10 lg:p-0 rounded-3xl lg:rounded-none'>
                    <div className=' hidden lg:block absolute top-0 left-0 m-5'>
                        <Link 
                            href="#" 
                            onClick={(event) => {
                                event.preventDefault();
                                router.back();
                            }}
                        >
                            <svg id="Layer_1" className='w-7 hover:cursor-pointer' enableBackground="new 0 0 100 100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g><path d="m44.93 76.47c.49.49 1.13.73 1.77.73s1.28-.24 1.77-.73c.98-.98.98-2.56 0-3.54l-21.43-21.43h51.96c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5h-51.96l21.43-21.43c.98-.98.98-2.56 0-3.54s-2.56-.98-3.54 0l-25.7 25.7c-.98.98-.98 2.56 0 3.54z"></path></g></svg>
                        </Link>
                    </div>
                    <h2 className='text-lg font-bold text-[#d3850f] '>Iniciar sesión</h2>                
                    <form onSubmit={handleSubmit} className="mt-5">
                        <div className="relative z-0 w-full mb-5 group">
                            <input  type="text"
                                    name="identifier"
                                    onChange={handleChange} 
                                    id="identifier" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                    placeholder="" 
                                    required 
                            />
                            <label htmlFor="identifier" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#d3850f] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Usuario</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input  type="password"
                                    name="password"
                                    onChange={handleChange} 
                                    id="password" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                    placeholder="" 
                                    required 
                            />
                            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#d3850f] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
                        </div>
                        <button type="submit" className="text-white bg-[#d3850f] hover:bg-[#943800] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
                    </form>
                    <p className='mt-2 text-sm'>Si no tienes una cuenta <Link href={'/loginRegister?form=register'} className='font-semibold text-[#c21a7f]'>Registrate aquí</Link></p>
                    <form onSubmit={handleSubmit} className="form-inline hidden">
                        <input
                            type="text"
                            name="identifier"
                            onChange={handleChange}
                            placeholder="Username"
                            className="md:p-2 form-input py-2 rounded mx-2"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Password"
                            className="md:p-2 form-input py-2 rounded mx-2"
                            required
                        />

                        <button
                            className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                            type="submit"
                        >
                        Acceder
                        </button>
                    </form>
                </div>
            </div>            
        </div>
    )
}

export default Login


import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchUser } from '../lib/authContext';
import { setToken } from '../lib/auth';
import { fetcher } from '../lib/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Register = ({setAlert}) => {
    const {user, loading} = useFetchUser();
    const router = useRouter();
    const schema = yup.object().shape({
        username: yup.string().trim().required('El campo es requerido'),
        name: yup.string().trim().required('El campo es requerido').matches(/^[A-Za-z]+$/, "Solo se permiten letras"),
        lastname: yup.string().trim().required('El campo es requerido').matches(/^[A-Za-z]+$/, "Solo se permiten letras"),
        document: yup.string().trim().required('El campo es requerido').matches(/^[jJvVeEgG]\d{8}$/, "Debe comenzar con jJ, vV, eE, gG seguido de 8 números"),
        email: yup.string().trim().required('El campo es requerido').email('Ingrese un correo valido como: ejemplo@next.com'),
        phone: yup.string().trim().required('El campo es requerido').matches(/^\d+$/, "Solo se permiten números").min(11, 'Debe ingresar minimo 11 caracteres'),
        password: yup.string().trim().required('El campo es requerido').min(8, 'La contraseña de ser de minimo 8 caracteres')
      });
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)        
      });

    const onSubmit = async userData => {
        try {
            if(userData){
                const responseData = await fetcher(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: userData.username,
                        name: String(userData.name).toLowerCase(),
                        lastname: String(userData.lastname).toLowerCase(),
                        document: userData.document,
                        email: userData.email,
                        phone: userData.phone,
                        password: userData.password,
                    }),
                    method: 'POST',
                    }, setAlert
                );

                console.log(responseData)

                if(responseData){
                    if(responseData?.user?.confirmed)
                        setRecordPoints(responseData?.jwt, responseData?.user?.username);

                    setToken(responseData, setAlert);                    
                }
                            
            }
        } catch (error) {
          console.error(error);
        }
    };

    const setRecordPoints = async (jwt, userclient) => {
        const responseData = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/record-points`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({data : {
                username: userclient
            }}),
          },
          setAlert
        );
    };

    return (
    <div className='bg-white w-[90%] lg:w-[60%] h-[80%] lg:h-auto rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-5 z-10'>
            <div className='relative col-span-3 h-auto overflow-hidden'>
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
                    className=" rounded-t-3xl lg:rounded-s-3xl h-full object-cover hidden lg:block"
                />    
                <div className='absolute inset-0 hidden lg:flex items-center justify-center flex-col pb-[5rem]'>
                    <Image src={'https://i.postimg.cc/1zYVNXvR/logo-qtq.webp'} 
                        width={1080} 
                        height={920} 
                        alt="Logo" 
                        className="object-contain w-[8rem] lg:w-[13rem] h-[13rem] flex flex-col items-center justify-center"
                    />  
                    <h1 className='text-base text-center font-medium text-[#d3850f] flex flex-col items-center justify-center'>
                        <span className='text-lg lg:text-2xl font-bold block'>¡Registrate ahora!</span> 
                        para disfruta de los sabores más exquisitos
                    </h1>
                </div>
            </div>
            <div className='col-span-2 lg:p-10 grid h-auto content-center relative rounded-3xl'>
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
                    <h2 className='text-lg font-bold text-[#d3850f] '>Crear usuario</h2>                
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 pb-4 lg:pb-0 pt-4 lg:pt-2 max-h-full overflow-y-auto">
                        <div className="relative z-0 w-full mb-5 group">
                            <input  type="text"
                                    name="username"
                                    {...register("username")}
                                    id="username" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                    placeholder=""  
                            />
                            <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#d3850f]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Usuario</label>
                            {errors.username?.message && <span className='text-[#721c24]'>{errors.username?.message}</span>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input  type="text"
                                    name="name"
                                    {...register("name")}
                                    id="name" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                    placeholder="" 
                            />
                            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#d3850f]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                            {errors.name?.message && <span className='text-[#721c24]'>{errors.name?.message}</span>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input  type="text"
                                    name="lastname"
                                    {...register("lastname")}
                                    id="lastname" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                    placeholder=""                                  
                            />
                            <label htmlFor="lastname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#d3850f]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellido</label>
                            {errors.lastname?.message && <span className='text-[#721c24]'>{errors.lastname?.message}</span>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input  type="text"
                                    name="document"
                                    {...register("document")}
                                    id="document" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                    placeholder="" 
                            />
                            <label htmlFor="document" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#d3850f]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cedula/rif</label>
                            {errors.document?.message && <span className='text-[#721c24]'>{errors.document?.message}</span>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input  type="text"
                                    name="email"
                                    {...register("email")}
                                    id="email" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                    placeholder="" 
                                     
                            />
                            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#d3850f]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo</label>
                            {errors.email?.message && <span className='text-[#721c24]'>{errors.email?.message}</span>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input  type="text"
                                    name="phone"
                                    {...register("phone")}
                                    id="phone" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                    placeholder="" 
                                    minLength="11"
                                    maxLength="11"
                            />
                            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#d3850f]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telefono</label>
                            {errors.phone?.message && <span className='text-[#721c24]'>{errors.phone?.message}</span>}
                        </div>                        
                        <div className="relative z-0 w-full mb-5 group">
                            <input  type="password"
                                    name="password"
                                    {...register("password")}
                                    id="password" 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#d3850f] peer" 
                                    placeholder="" 
                                    minLength="6"
                            />
                            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#d3850f]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
                            {errors.password?.message && <span className='text-[#721c24]'>{errors.password?.message}</span>}
                        </div>
                        <button type="submit" className="text-white bg-[#d3850f] hover:bg-[#943800] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Enviar</button>
                    </form>
                    <p className='mt-2 text-sm'>Si tienes una cuenta <Link href={'/loginRegister?form=login'} className='font-semibold text-[#c21a7f]'>Inicia sesión aquí</Link></p>
                   
                </div>
            </div>            
    </div>
  )
}

export default Register
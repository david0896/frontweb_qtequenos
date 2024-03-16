import { useRouter } from 'next/router';
import { useState } from "react";
import Link from "next/link"
import { unsetToken } from '../lib/auth';
import { useUser } from '../lib/authContext';
import style from "../styles/styles.module.css";

const logout = () => {
    unsetToken();
  };

export default function Header({shoppingCart}) {
    const router = useRouter();
    const { pathname } = router;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { user, loading } = useUser();
    const [isOpen, setIsOpen] = useState(false);
     
    return (
        <header className={`${style.headerNav} z-[99] lg:relative`}>           
            <nav className=" bg-white border-gray-200">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
                    <div className="flex flex-wrap items-center justify-between lg:justify-end w-full lg:w-auto mb-2 lg:mb-0">
                        <Link href="/" className="items-center hidden">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Qtequeños</span>
                        </Link>
                        <button data-collapse-toggle="mega-menu-icons" 
                                type="button" 
                                onClick={() => setNavbarOpen(!navbarOpen)} 
                                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu-icons" aria-expanded="false"
                        >
                            <span className="sr-only">abrir menú principal</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                    <div id="mega-menu-icons" className={"items-center justify-between w-full md:flex md:w-auto md:order-1" + (navbarOpen ? " flex" : " hidden")}>
                        <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
                            <li>
                                <Link href="/" className={`block py-2 pl-3 pr-4 ${pathname === '/' ? 'text-[#c21a7f]' : 'text-gray-900'} font-semibold border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#c21a7f] md:p-0 `} aria-current="page">INICIO</Link>
                            </li>
                            <li>
                                <Link href="/aboutUs/" className={`block py-2 pl-3 pr-4 ${pathname === '/aboutUs' ? 'text-[#c21a7f]' : 'text-gray-900'} font-semibold border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#c21a7f] md:p-0 `} aria-current="page">QUIÉNES SOMOS</Link>
                            </li>
                            <li>
                                <Link href="/store" prefetch className={`block py-2 pl-3 pr-4 ${pathname === '/store' ? 'text-[#c21a7f]' : 'text-gray-900'} font-semibold border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#c21a7f] md:p-0 `}>PRODUCTOS</Link>
                            </li>                            
                            <li>
                                <Link href="/service/" className={`block py-2 pl-3 pr-4 ${pathname === '/service' ? 'text-[#c21a7f]' : 'text-gray-900'} font-semibold border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#c21a7f] md:p-0 `}>SERVICIOS</Link>
                            </li>
                            <li>
                                <Link href="/contactUs" className={`block py-2 pl-3 pr-4 ${pathname === '/contactUs' ? 'text-[#c21a7f]' : 'text-gray-900'} font-semibold border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#c21a7f] md:p-0 `}>CONTACTO</Link>
                            </li>
                            {!loading &&
                            (user ? (
                                ''
                            ) : (
                            ''
                            ))}
                            {!loading &&
                            (user ? (
                            <li className="relative inline-block text-left z-20 w-full lg:w-auto">
                                <button type="button" className="w-full lg:w-auto justify-between lg:justify-normal inline-flex py-2 pl-3 pr-4 text-gray-900 font-semibold hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#c21a7f] md:p-0" id="options-menu" aria-haspopup="true" aria-expanded="true" onClick={() => setIsOpen(!isOpen)}>
                                {String(user).toUpperCase()}
                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                </button>
                          
                                {isOpen && (
                                  <div className="origin-top-left px-4 py-2 absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <Link
                                            href="/myprofile"
                                            className={`block text-gray-700 font-semibold border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#c21a7f] md:p-0`}
                                            style={{ cursor: 'pointer' }}
                                            >
                                            MI PERFIL
                                        </Link>
                                        <Link
                                            href="#"
                                            className={`block text-gray-700 font-semibold border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#c21a7f] md:p-0`}
                                            onClick={logout}
                                            style={{ cursor: 'pointer' }}
                                            >
                                            CERRAR SESIÓN
                                        </Link>
                                    </div>
                                  </div>
                                )}
                              </li>
                            ) : (
                            ''
                            ))}

                            <li className='relative z-10'>
                                <Link href="/store/shoppingCart" prefetch rel="preload">
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`${pathname === '/store/shoppingCart' ? 'fill-[#c21a7f]' : 'fill-gray-900'} hover:fill-[#c21a7f] ml-3 lg:ml-0 my-2 lg:my-0`} width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                                    </svg>
                                </Link>
                                {
                                    shoppingCart.length !== 0 ?
                                    <span className='absolute top-2 left-8 lg:left-4 rounded-full bg-[#ffac80] text-sm text-slate-900 font-semibold p-1 px-3'>{shoppingCart.length}</span>
                                    : null
                                }
                            </li>                  
                        </ul>
                    </div>
                </div>
            </nav>  
        </header>
    )  
}
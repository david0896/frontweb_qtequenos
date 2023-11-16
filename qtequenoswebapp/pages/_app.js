import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import Mantenimiento from './mantenimiento';

export default function App({ Component, pageProps }) {

  const router = useRouter(); //acceso a los recursos de la url
  const enMantenimiento = false;
  //acceso a toda metadata de la url
/*   useEffect(() => {    
    const handleRouteChange = (url) => {
      window.gtag("config", 'G-DTB6V5Z42N', {
          page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]); */

  return ( 
    <>
        {/* verificacion de variable y dirección de la url */}
      {enMantenimiento && router.pathname !== '/mantenimiento' ? <Mantenimiento/> : <Component {...pageProps} />}
    </>
  )
}
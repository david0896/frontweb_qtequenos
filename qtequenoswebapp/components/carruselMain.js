import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import Image from 'next/image';
import Link from 'next/link';
import '@splidejs/react-splide/css';


export default function CarruselMain({user}) {

    const options = {
        type         : 'fade',
        rewind       : true,
        gap          : '1rem',
        autoplay     : true,
        pauseOnHover : false,
        resetProgress: false,
        height       : '30rem',
        width         : '100%',
      };

    return (
        <Splide
        options={ options }
        aria-labelledby="autoplay-example-heading"
        hasTrack={ false }
      >
        <div style={ { position: 'relative' } } className='lg:z-10'>
          <SplideTrack className='h-[20rem] lg:h-auto'>
            <SplideSlide>
                <div className='relative'>
                  <Image width={4096} height={720} src="https://i.postimg.cc/9F7tgcLr/New-Project-3.jpg" className='h-[20rem] lg:w-screen lg:h-full object-right-top' alt="Banner de tequeños en un plato"/>
                  <div className='absolute top-0 left-0 w-screen lg:h-[80%]'>
                    <div className=' px-5 mx-auto lg:w-9/12 lg:h-full grid grid-cols-1 lg:grid-cols-4'> 
                      <div className=' col-span-2 hidden lg:grid content-center space-y-4'>                        
                      </div>
                      <div className='col-span-2 grid content-center'>
                        <Image width={1080} height={720} src="https://i.postimg.cc/CK5tn5CK/logo-qtequenos.webp" className='object-cover w-[70%] flex justify-self-center' alt="Image 1"/>
                        {!user ? 
                        <div className='flex justify-self-center'>
                          <Link href={'/loginRegister?form=register'} className=" w-fit font-bold text-white bg-[#f5884d] hover:bg-[#a3542a] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              <svg className="w-3.5 h-3.5 mr-2 hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                              </svg>
                              REGISTRARSE
                          </Link>
                          <Link href={'/loginRegister?form=login'} className=" w-fit font-bold text-white bg-[#c21a7f] hover:bg-[#970b5f] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              <svg className="w-3.5 h-3.5 mr-2 hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                              </svg>
                              ACCEDER
                          </Link>
                        </div> :
                        ''
                        }
                      </div>
                    </div>
                  </div>
                </div>
            </SplideSlide>
            {/* <SplideSlide>
                <Image width={720} height={360} src="https://i.postimg.cc/HswynjX6/Proyecto-nuevo-4.webp" className='object-none h-full w-full lg:w-screen lg:object-cover' alt="Image 2"/>
            </SplideSlide>
            <SplideSlide>
                <Image width={720} height={360} src="https://i.postimg.cc/rsWtSwbF/Proyecto-nuevo-5.webp" className='object-none h-full w-full lg:w-screen lg:object-cover' alt="Image 3"/>
            </SplideSlide> */}
          </SplideTrack>
        </div>

        <div className="splide__progress lg:hidden">
          <div className="splide__progress__bar" />
        </div>
      </Splide>
    )
}
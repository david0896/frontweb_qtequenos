import { useState, useEffect } from 'react';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import ProductCard from "@/components/productCard";


export default function CarruselProductCard({products}) {

    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        const updateWindowDimensions = () => {
          const { innerWidth: width } = window;
          setWindowWidth(width);
        };
    
        // Agrega un listener para detectar cambios en la resolución de pantalla
        window.addEventListener('resize', updateWindowDimensions);
    
        // Al cargar el componente, obtén el tamaño de la pantalla
        updateWindowDimensions();
    
        // Limpia el listener cuando el componente es desmontado
        return () => {
          window.removeEventListener('resize', updateWindowDimensions);
        };
      }, []);
      
    const showArrowsSlides= windowWidth  <= 600 ? false : true;

    const options = {
        type         : 'loop',
        gap          : '0.5rem',
        height       : '30rem',
        perPage      : 2,
        arrows       : showArrowsSlides,
      };

    return (
        <Splide
        options={ options }
        aria-labelledby="autoplay-example-heading"
        hasTrack={ false }
        >
            <SplideTrack className='w-[30rem] h-[25rem] mx-auto'>
                {   
                    products &&(products.map(productView =>(
                        <SplideSlide
                            key={productView.id}
                        >
                            <ProductCard
                                key={productView.id}
                                productView={productView}                                
                            />
                        </SplideSlide>
                    )))
                }                                   
            </SplideTrack>
        </Splide>
    )
}
import { useState, useEffect } from 'react';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import ProductCard from "@/components/productCard";


export default function CarruselProductCard({products, addShoppingCart}) {

    const [windowWidth, setWindowWidth] = useState(0);
    console.log(products)

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
                    products &&(products.data.map(productView =>(
                        
                        <SplideSlide
                            key={productView.id}
                        >
                            <ProductCard
                                key   = {productView.id}
                                id    = {productView.id}
                                name  = {productView.attributes.name}
                                price = {productView.attributes.price}
                                photo = {productView.attributes.photo}   
                                title = {productView.attributes.flavors.data[0].attributes.title} 
                                addShoppingCart = {addShoppingCart}                            
                            />
                        </SplideSlide>
                    )))
                }                                   
            </SplideTrack>
        </Splide>
    )
}
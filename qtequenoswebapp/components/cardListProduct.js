import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CardListProduct({products, addShoppingCart}) { 
    let populatePackage={}
    
    const [values, setValues] = useState(Array(products.data.length).fill(0));
    const [added, setAdded] = useState(false);
    const [botonesSeleccionados, setBotonesSeleccionados] = useState([]);

    const handleClick = (index) => {
        setBotonesSeleccionados(prevState => [...prevState, index]);
    }

    const incrementValue = (index) => {
        if (values[index] < 99) {
          const newValues = [...values];
          newValues[index] += 1;
          setValues(newValues);
        }
    };

    const decrementValue = (index) => {
        if (values[index] > 0) {
            const newValues = [...values];
            newValues[index] -= 1;
            setValues(newValues);
        }
    };

    const handleSubmit = (index, selectProduct) => (e) => {
        e.preventDefault();

        if (values[index] < 1){
            alert('Cantidad no validad');
            return
        }       
        addShoppingCart(selectProduct);
        setAdded(true);
    }

    return(
        <>
        {
            products &&
            products.data.map((product, index)=>{
                populatePackage = product.attributes.packages.data
                return( 
                    <div key={product.id} className=' p-5 rounded-3xl bg-[#eae7e8] space-y-3 my-8'>                        
                        <div className='lg:flex items-center justify-between'>
                            <div className='flex justify-start'>
                                <div className='w-[10rem]'>
                                    <Image width={1080} height={720} src={product.attributes.photo = null ? '' : product.attributes.photo} alt={`${product.attributes.name}`} className=' w-[10rem] p-5'/>
                                </div>
                                <div className='block mb-5 lg:mb-0 px-4 w-full'>
                                    <div className='text-lg font-bold text-[rgb(75,75,75)] text-left mb-5'>
                                        <h2 className=''>{product.attributes.name}</h2>
                                        <span className='block'>{
                                            populatePackage.map((packege)=>(packege.attributes.title))
                                        }</span>
                                        <span className='text-[#0e0e0e]'>Precio: ${product.attributes.price} <span className='text-[#777777] font-medium'>|</span> Q&apos;puntos: {product.attributes.priceInPoints}</span>
                                    </div>
                                    <span className='text-lg font-normal'>{product.attributes.description}</span>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(index, {
                                id              : product.id = null ? '' : product.id,
                                name            : product.attributes.name = null ? '' : product.attributes.name,
                                price           : product.attributes.price = null ? '' : product.attributes.price,
                                priceInPoints   : product.attributes.priceInPoints = null ? '' : product.attributes.priceInPoints,
                                quantity        : values[index],
                                image           : product.attributes.photo = null ? '' : product.attributes.photo
                            })} 
                                className="w-full lg:max-w-xs"
                            >
                                <label htmlFor="bedrooms-input" className="block mb-2 text-start lg:text-end text-sm font-medium text-gray-900 dark:text-white">Elegir cantidad:</label>
                                <div className="relative flex justify-end max-w-[13rem] lg:max-w-full lg:pl-[7rem]">
                                    <button type="button" id="decrement-button" onClick={() => decrementValue(index)} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                        </svg>
                                    </button>
                                    <input 
                                        type="text" 
                                        className="bg-gray-50 border-x-0 border-gray-300 h-11  font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={values[index]} 
                                        min="0" 
                                        max="99"
                                        required
                                        readOnly
                                    />
                                    <button type="button" id="increment-button" onClick={() => incrementValue(index)} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className=' flex justify-between items-end lg:justify-end'>
                                    <input key={product.id} onClick={() => handleClick(product.id)} type="submit" value={`${added ? botonesSeleccionados.includes(product.id) ? 'PRODUCTO AGREGADO' : 'AGREGAR AL CARRITO' : 'AGREGAR AL CARRITO'}`} className={`${added ? botonesSeleccionados.includes(product.id) ? 'bg-[#3ab14e] hover:bg-[#286d33]' : 'bg-[#c21a7f] hover:bg-[#970b5f]' : 'bg-[#c21a7f] hover:bg-[#970b5f]'} mt-4 w-fit font-bold text-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm px-5 py-2.5 text-center inline-flex items-center `}/>
                                    <Link href="/store/shoppingCart" prefetch rel="preload">
                                        <svg xmlns="http://www.w3.org/2000/svg" className={` inline-flex lg:hidden fill-[#c21a7f] ml-3 lg:ml-0 my-2 lg:my-0`} width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                                        </svg>
                                    </Link> 
                                </div>
                            </form>                                                      
                        </div>
                    </div>
                );
            })
        }     
        </>
    )
}
import Image from 'next/image';

export default function ProductCard({productView}) {
    const {id, imagen, titulo, precio, url} = productView;

    return(
        <div className=' p-5 rounded-3xl bg-[#eae7e8] space-y-3 w-[14.5rem]'>
            <h2 className='text-[#d388b5] text-xl font-extrabold uppercase text-center'>{titulo}</h2>
            <div className='flex justify-center'>
                <Image width={1080} height={720} src={imagen} className='w-[70%]' alt='Foto de producto'/>
            </div>
            <div className='flex items-center justify-between'>
                <span className=' text-lg font-bold'>${precio}</span>
                <button type="button" className=" w-fit font-bold text-white bg-[#c21a7f] hover:bg-[#970b5f] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-3.5 h-3.5 mr-2 hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                    </svg>
                    COMPRAR
                </button>
            </div>
        </div>
    )
}
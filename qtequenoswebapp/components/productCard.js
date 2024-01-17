import { useState } from 'react';
import Image from 'next/image';

export default function ProductCard({id, name, price, photo, title, addShoppingCart}) {

    const [botonesSeleccionados, setBotonesSeleccionados] = useState([]);

    const handleClick = (index) => {
        setBotonesSeleccionados(prevState => [...prevState, index]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addShoppingCart({
            id       : id,
            name     : name,
            price    : price,
            quantity : 1,
            image    : photo
        });
    }

    return(
        <div className=' p-5 rounded-3xl bg-[#eae7e8] space-y-3 w-[14.5rem]'>
            <h2 className={`text-[#d388b5] ${title.length > 12 ? 'text-lg' : 'text-xl'} font-extrabold uppercase text-center`}>{title}</h2>
            <div className='flex justify-center'>
                <Image width={1080} height={720} src={photo} className='w-[70%]' alt='Foto de producto'/>
            </div>
            <div className='flex items-center justify-between'>
                <span className=' text-lg font-bold'>${price}</span>
                <form onSubmit={handleSubmit}>
                    <input  type="submit" 
                            key={id} 
                            onClick={() => handleClick(id)} 
                            className={`${botonesSeleccionados.includes(id) ? 'bg-[#3ab14e] hover:bg-[#286d33]' : 'bg-[#c21a7f] hover:bg-[#970b5f]'} w-fit font-bold text-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm px-5 py-2.5 text-center inline-flex items-center`}
                            value={`${botonesSeleccionados.includes(id) ? 'AGREGADO' : 'AGREGAR'}`}
                    />
                </form>
            </div>
        </div>
    )
}
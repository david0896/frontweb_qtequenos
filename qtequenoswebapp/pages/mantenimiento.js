import Image from "next/image"
import Link from "next/link" 

export default function Mantenimiento() {

    return (
        <div className="grid place-items-center" style={{  
            backgroundImage: `url('https://i.postimg.cc/vBxNgncx/bg-Ym2-Orange.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: '100vh',
          }}>  
            <div className="p-5 bg-white rounded-3xl w-[90%] md:w-[80%]  h-[70%] md:h-[90%] grid place-items-center relative">
                <h1 className="text-center text-2xl font-bold text-slate-700">Estamos mejorando tu experiencia</h1>
                <h3 className="text-center text-base text-slate-500">Volveremos a estar en funcionamiento en breve <br/> Consulte nuestros canales sociales para obtener más actualizaciones</h3>
                <Image src="https://i.postimg.cc/c46N7F6P/site-maintenance.png" className="w-[90%] lg:w-[40%]" alt="Pagina en mantenimiento" width={1920} height={1080} quality={100} priority/>
                
            </div>            
        </div>
    )
}
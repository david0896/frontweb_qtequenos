import { useEffect } from 'react';
import style from '../styles/alert.module.css'

const Alerta = ({ alert, setAlert }) => {
    useEffect(() => {
        if (document) {
            const alerta = document.getElementById('alerta');
            const cerrar = document.getElementById('cerrar');

            // Función para cerrar la alerta
            const cerrarAlerta = () => {
                alerta.classList.add('fadeOut');
                setTimeout(() => {
                alerta.style.display = 'none';
                }, 500);
                setAlert('')
            };
            
            // Evento de click en el botón de cierre
            cerrar.addEventListener('click', cerrarAlerta);
            
            // Cerrar la alerta después de 5 segundos (5000 milisegundos)
            setTimeout(cerrarAlerta, 5000);
        }
      }, []);

    return (
    <div id='alerta' className={`${alert.tipo === 1 ? 'bg-[#f8d7da] text-[#721c24]' : 'bg-[#d7f8e7] text-[#1c721d]'} ${style.alerta} ${alert !== null || alert !== ''  ? 'block' : 'hidden'} z-20 border-solid border-[1px]`}>
        <button id='cerrar' className={style.cerrar}>x</button>
        <strong className="font-bold">Mensaje: </strong>
        <span className="block sm:inline">{alert.message}</span>
      </div>
    );
  };
  
  export default Alerta;
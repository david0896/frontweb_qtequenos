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
                setAlert(null)
            };
            
            // Evento de click en el botón de cierre
            cerrar.addEventListener('click', cerrarAlerta);
            
            // Cerrar la alerta después de 5 segundos (5000 milisegundos)
            setTimeout(cerrarAlerta, 5000);
        }
      }, []);
    
    return (
    <div id='alerta' className={`${style.alerta} z-20`}>
        <button id='cerrar' className={style.cerrar}>x</button>
        <strong className="font-bold">Mensaje: </strong>
        <span className="block sm:inline">{alert}</span>
      </div>
    );
  };
  
  export default Alerta;
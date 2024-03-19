import styles from '../styles/newsTicker.module.css';

const MessagePrompt = () => {

    const message = <p className='font-medium text-lg text-gray-800 mb-8'>
                        - Por cada compra igual o superior a 
                        <span className=' font-bold text-[#c21a7f]'> $25</span>, el 
                        <span className='font-bold text-[#c21a7f]'> DELIVERY</span> es completamente 
                        <span className=' font-bold text-[#c21a7f]'> ¡GRATIS! </span>-
                    </p>

    return (
        <div className={styles.ticker}>
        <div className={styles.news}>
            {Array(99).fill(message)}
        </div>
        </div>
    )
}

export default MessagePrompt
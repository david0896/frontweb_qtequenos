import { motion } from 'framer-motion';

const AnimatedImage = () => {
    return (
      <motion.img
        src="https://i.postimg.cc/qMvq4HY8/bgrond-15.jpg"
        alt="En mantenimiento"
        style={{ width: 200, height: 200 }}
        animate={{
          rotate: 15, // Ángulo de rotación
          repeat: Infinity, // Repetición infinita
          reverse: Infinity, // Revertir la dirección después de cada ciclo
          transition: { duration: 1, ease: 'easeInOut' }, // Animación suave
          repeatDelay: 5
        }}
      />
    );
  };

export default AnimatedImage
import { motion } from 'framer-motion'

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  duration = 0.7, 
  y = 35, 
  className = '', 
  style = {} 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

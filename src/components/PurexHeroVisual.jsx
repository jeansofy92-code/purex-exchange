import { motion } from 'framer-motion'
import heroScene from '../assets/brand/purex-hero-scene.png'

function PurexHeroVisual() {
  return (
    <div className="relative flex w-full max-w-[700px] items-center justify-center">
      {/* Background ambient emerald glow */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(88, 230, 91, 0.22) 0%, rgba(24, 58, 29, 0.12) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Floating 3D scene visual */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 w-full"
      >
        <img
          src={heroScene}
          alt="PUREX 3D Platform Scene"
          className="h-auto w-full select-none object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
          loading="eager"
        />
      </motion.div>
    </div>
  )
}

export default PurexHeroVisual


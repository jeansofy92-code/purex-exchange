import { useEffect, useRef } from 'react'

export default function LiveNetworkBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Generate balanced node points
    const particleCount = Math.min(Math.floor((width * height) / 22000), 40)
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.5 + 0.8,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        isDiamond: Math.random() > 0.6,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        const currentAlpha = 0.2 + Math.sin(p.pulse) * 0.15

        if (p.isDiamond) {
          // Draw subtle 4-point star sparkle
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`
          ctx.beginPath()
          ctx.moveTo(0, -p.radius * 3)
          ctx.lineTo(p.radius * 0.8, 0)
          ctx.lineTo(0, p.radius * 3)
          ctx.lineTo(-p.radius * 0.8, 0)
          ctx.closePath()
          ctx.fill()
          ctx.beginPath()
          ctx.moveTo(-p.radius * 3, 0)
          ctx.lineTo(0, p.radius * 0.8)
          ctx.lineTo(p.radius * 3, 0)
          ctx.lineTo(0, -p.radius * 0.8)
          ctx.closePath()
          ctx.fill()
          ctx.restore()
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 145, 0, ${currentAlpha})`
          ctx.fill()
        }

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.08
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep Royal Cobalt & Cosmic Indigo Atmospheric Mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#11142c] via-[#141836] to-[#0c0e20]" />
      <div className="absolute top-[-10%] left-[25%] w-[700px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(40,53,147,0.35)_0%,rgba(21,25,56,0.15)_50%,transparent_75%)] blur-3xl" />
      <div className="absolute top-[40%] right-[-10%] w-[650px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(48,63,159,0.25)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,122,0,0.06)_0%,transparent_70%)] blur-3xl" />

      {/* Interactive Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  )
}

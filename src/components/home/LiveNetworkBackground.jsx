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

    // Generate balanced node points for background grid & matrix
    const particleCount = Math.min(Math.floor((width * height) / 20000), 48)
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.6 + 0.8,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      })
    }

    let mouse = { x: null, y: null, maxDist: 130 }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed

        // Wrap around boundaries smoothly
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Particle Warm Gold Glow
        const currentAlpha = 0.22 + Math.sin(p.pulse) * 0.12
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245, 158, 11, ${currentAlpha})`
        ctx.fill()

        // Connect nearby particles with subtle warm gold tactical lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(245, 158, 11, ${lineAlpha})`
            ctx.lineWidth = 0.75
            ctx.stroke()
          }
        }

        // Connect with mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouse.maxDist) {
            const lineAlpha = (1 - dist / mouse.maxDist) * 0.22
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(251, 191, 36, ${lineAlpha})`
            ctx.lineWidth = 0.9
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep Luxury Black & Warm Gold Atmospheric Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[650px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.06)_0%,rgba(30,20,5,0.02)_50%,transparent_70%)] blur-3xl" />
      <div className="absolute top-[45%] right-[-10%] w-[600px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(217,119,6,0.05)_0%,rgba(20,15,5,0.02)_50%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-[5%] left-[-10%] w-[700px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.04)_0%,rgba(20,20,25,0.02)_50%,transparent_70%)] blur-3xl" />

      {/* Subtle Financial Engineering Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
        }}
      />

      {/* Interactive HTML5 Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  )
}

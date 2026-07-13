import { useEffect, useRef } from 'react'

export function BgParticles() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 }) // Começa fora da tela

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    resize()

    // Inicialização das partículas
    const pts = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      // Guardamos a posição original de "alvo" para onde a partícula quer fluir naturalmente
      targetX: Math.random() * canvas.width,
      r: Math.random() * 2.2 + 1,
      v: Math.random() * 0.5 + 0.3,
      o: Math.random() * 0.55 + 0.2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const mouse = mouseRef.current
      const raioRepulsao = 120 // Distância em pixels que ativa o desvio
      const forcaRepulsao = 4   // Intensidade do empurrão

      pts.forEach(p => {
        // Movimento vertical/senoidal padrão (física original)
        p.y += p.v
        p.targetX += Math.sin(p.y / 30) * 0.18
        
        // Aplica o movimento natural à posição real X
        p.x += (p.targetX - p.x) * 0.1 // Interpolação suave

        // Vetor de distância entre o mouse e a partícula
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const distancia = Math.sqrt(dx * dx + dy * dy)

        // Se o mouse estiver perto, empurra a partícula
        if (distancia < raioRepulsao) {
          // Normaliza o vetor para descobrir a direção do empurrão
          const forcaEfeito = (raioRepulsao - distancia) / raioRepulsao // Fica mais forte quanto mais perto está
          const direcaoX = dx / distancia
          const direcaoY = dy / distancia

          // Move a partícula instantaneamente para longe
          p.x += direcaoX * forcaEfeito * forcaRepulsao
          p.y += direcaoY * forcaEfeito * forcaRepulsao
        }

        // Desenho no Canvas
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${p.o})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()

        // Reset ao sair da tela por baixo
        if (p.y > canvas.height) {
          p.y = -10
          p.x = Math.random() * canvas.width
          p.targetX = p.x
        }
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none', // Garante que o canvas não bloqueie os cliques na UI
      }}
    />
  )
}
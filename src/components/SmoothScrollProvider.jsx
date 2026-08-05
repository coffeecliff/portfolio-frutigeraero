import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'

// Enquanto a inércia do wheel está tocando (isScrolling === "smooth"), o Lenis
// ignora eventos nativos de 'scroll' (ver onNativeScroll em lenis.mjs), então se o
// usuário agarra a barra de scroll nesse meio-tempo o rAF do Lenis continua
// "puxando" a página de volta para o alvo antigo, brigando com o drag nativo e
// deixando o scroll travado/bugado. Detectamos o clique na faixa da scrollbar
// (fora da largura do documento) e resetamos o estado do Lenis antes do drag começar.
function ScrollbarDragSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const handlePointerDown = (event) => {
      const isScrollbarClick = event.clientX >= document.documentElement.clientWidth
      if (isScrollbarClick) {
        lenis.reset()
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [lenis])

  return null
}

// `root` faz o Lenis assumir o scroll nativo do documento (sem wrapper div),
// então window.scrollY / eventos de 'scroll' / IntersectionObserver continuam funcionando normalmente.
export function SmoothScrollProvider({ children }) {
  return (
    <ReactLenis
      root
      options={{
        // Duração do "assentamento" da inércia em segundos — maior = desliza por mais tempo
        duration: 1.2,
        // Curva de desaceleração do movimento (easeOutExpo)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Força do impulso por notch de wheel — ajuste para mais/menos "peso"
        wheelMultiplier: 1,
        // Força do impulso em touch/trackpad
        touchMultiplier: 1.5,
      }}
    >
      <ScrollbarDragSync />
      {children}
    </ReactLenis>
  )
}

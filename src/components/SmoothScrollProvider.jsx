import { ReactLenis } from 'lenis/react'

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
      {children}
    </ReactLenis>
  )
}

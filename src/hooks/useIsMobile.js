import { useEffect, useState } from 'react'

// Compartilhado pelos componentes que precisam desmontar (não só esconder)
// conteúdo pesado/quebradiço em telas pequenas — mesmo breakpoint de 901px
// usado nos media queries de App.css.
export function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= breakpoint
  )

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])

  return isMobile
}

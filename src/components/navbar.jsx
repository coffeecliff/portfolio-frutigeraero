import { useEffect, useRef } from 'react'
import { AeroPanel } from './aeroBox'

export default function NavBar({ activeSection, onNav }) {
    const sections = ['Hero', 'Sobre', 'Trajetória', 'Projetos', 'Skills', 'Contato']
    const navRef = useRef(null)

    // No topo, a navbar funde-se com o fundo; conforme o usuário rola a
    // página, o vidro (blur/gradiente/sombra) se forma suavemente. O
    // progresso é escrito direto no DOM via CSS var para evitar re-render
    // da navbar a cada pixel de scroll (mesmo padrão do parallax da Hero).
    useEffect(() => {
        const FORM_DISTANCE = 140
        const handleScroll = () => {
            if (!navRef.current) return
            const progress = Math.min(window.scrollY / FORM_DISTANCE, 1)
            navRef.current.style.setProperty('--nav-form', progress.toFixed(3))
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className="portfolio-nav" ref={navRef}>
            <AeroPanel useBoxStyle variant="glass2" className="contato-quote-panel portfolio-nav-panel">
                <div className="portfolio-nav-inner">
                    <span className="portfolio-nav-logo">✦ Seções</span>
                    <div className="portfolio-nav-links">
                        {sections.map(s => (
                            <button
                                key={s}
                                className={`portfolio-nav-btn ${activeSection === s ? 'active' : ''}`}
                                onClick={() => onNav(s)}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </AeroPanel>
        </nav>
    )
}
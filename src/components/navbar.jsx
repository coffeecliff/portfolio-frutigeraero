import { useEffect, useRef } from 'react'
import { AeroPanel } from './aeroBox'

export default function NavBar({ activeSection, onNav }) {
    const sections = ['Hero', 'Sobre', 'Trajetória', 'Projetos', 'Skills', 'Contato']
    const navRef = useRef(null)

    // No topo (scrollY 0) a navbar funde-se com o fundo (invisível); assim
    // que o usuário rola, o vidro aparece imediatamente (sem fase de
    // transição intermediária). O estado é escrito direto no DOM via CSS
    // var para evitar re-render da navbar a cada pixel de scroll (mesmo
    // padrão do parallax da Hero).
    useEffect(() => {
        const handleScroll = () => {
            if (!navRef.current) return
            const formed = window.scrollY > 0 ? 1 : 0
            navRef.current.style.setProperty('--nav-form', formed)
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
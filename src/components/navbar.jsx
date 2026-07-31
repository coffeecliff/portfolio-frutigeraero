import { useEffect, useRef } from 'react'
import { AeroPanel, AeroBtn } from './aeroBox'

// Rótulos exibidos na navbar — a chave é o id interno da seção (usado por
// navTo/IntersectionObserver em App.jsx), o valor é o texto visível.
const SECTION_LABELS = {
    Hero: 'Início',
    Sobre: 'Sobre',
    Trajetória: 'Trajetória',
    Projetos: 'Projetos',
    Skills: 'Skills',
    Contato: 'Contato',
}

export default function NavBar({ activeSection, onNav }) {
    const sections = Object.keys(SECTION_LABELS)
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
            <AeroPanel useBoxStyle variant="glass2" className="portfolio-nav-panel">
                <div className="portfolio-nav-inner">
                    <div className="portfolio-nav-logo-block" onClick={() => onNav('Hero')} role="button" tabIndex={0}>
                        <span className="portfolio-nav-logo-main">
                            <span className="portfolio-nav-logo-star">✦</span> NEO
                        </span>
                        <span className="portfolio-nav-logo-sub">Frutiger Aero</span>
                    </div>

                    <div className="portfolio-nav-links">
                        {sections.map(s => (
                            <button
                                key={s}
                                className={`portfolio-nav-btn ${activeSection === s ? 'active' : ''}`}
                                onClick={() => onNav(s)}
                            >
                                {SECTION_LABELS[s]}
                            </button>
                        ))}
                    </div>

                    <div className="portfolio-nav-cta">
                        <AeroBtn variant="forest" onClick={() => onNav('Contato')}>
                            Fale comigo →
                        </AeroBtn>
                    </div>
                </div>
            </AeroPanel>
        </nav>
    )
}
import { useEffect, useRef, useState } from 'react'
import { AeroPanel, AeroBtn } from './aeroBox'
import { AeroMusicPlayerCompact } from './musicPlayer'
import { useLanguage } from '../i18n/LanguageContext'
import { useIsMobile } from '../hooks/useIsMobile'

// Ordem das seções exibidas na navbar — os rótulos vêm de t.nav (i18n),
// a chave é o id interno da seção (usado por navTo/IntersectionObserver em App.jsx).
const SECTION_IDS = ['Hero', 'Sobre', 'Trajetória', 'Projetos', 'Skills', 'Contato']

export default function NavBar({ activeSection, onNav }) {
    const { lang, toggleLang, t } = useLanguage()
    const sections = SECTION_IDS
    const navRef = useRef(null)
    // Só monta o player compacto (sem modelo 3D) quando a tela é pequena —
    // o player completo com 3D some da Hero no mesmo breakpoint (App.jsx).
    const isMobile = useIsMobile(900)
    // Abaixo de 901px os links somem do layout em linha (ver @media em
    // App.css) e viram este menu suspenso, aberto pelo botão hambúrguer.
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleMobileNav = (section) => {
        setMobileOpen(false)
        onNav(section)
    }

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
                                {t.nav[s]}
                            </button>
                        ))}
                    </div>

                    <div className="portfolio-nav-cta">
                        <AeroBtn
                            variant="glass"
                            className="portfolio-nav-lang-btn"
                            onClick={toggleLang}
                            aria-label="Toggle language"
                        >
                            🌐 {lang === 'pt-BR' ? 'PT-BR' : 'EN'}
                        </AeroBtn>
                        <AeroBtn variant="forest" className="portfolio-nav-cta-full" onClick={() => onNav('Contato')}>
                            {t.nav.cta}
                        </AeroBtn>
                        <button
                            type="button"
                            className={`portfolio-nav-hamburger ${mobileOpen ? 'is-open' : ''}`}
                            onClick={() => setMobileOpen(o => !o)}
                            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
                            aria-expanded={mobileOpen}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>

                <div className={`portfolio-nav-mobile-panel ${mobileOpen ? 'is-open' : ''}`}>
                    {sections.map(s => (
                        <button
                            key={s}
                            className={`portfolio-nav-mobile-btn ${activeSection === s ? 'active' : ''}`}
                            onClick={() => handleMobileNav(s)}
                        >
                            {t.nav[s]}
                        </button>
                    ))}

                    {isMobile && (
                        <div className="portfolio-nav-mobile-player">
                            <AeroMusicPlayerCompact />
                        </div>
                    )}
                </div>
            </AeroPanel>
        </nav>
    )
}
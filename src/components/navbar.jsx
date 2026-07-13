import { AeroPanel } from './aeroBox'

export default function NavBar({ activeSection, onNav }) {
    const sections = ['Hero', 'Sobre', 'Projetos', 'Skills', 'Contato']
    return (
        <nav className="portfolio-nav">
            <AeroPanel useBoxStyle variant="glass2" className="contato-quote-panel">
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
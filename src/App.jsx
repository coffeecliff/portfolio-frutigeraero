import { useState, useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { AeroBox, AeroPanel, AeroGrid, AeroBtn } from './components/aeroBox'
// import { UserViewer3D } from './components/models_viewers/UserViewer3D'
// import { IdogViewer3D } from './components/IdogViewer3D'
// import { CityViewer3D } from './components/CityViewer3D'
import { FolderViewer3D } from './components/models_viewers/FolderViewer3D'
import { BallUserViewer3D } from './components/models_viewers/BallUserViewer3D'
import { AeroMusicPlayer } from './components/musicPlayer'
import { useIsMobile } from './hooks/useIsMobile'
import { FaGithub, FaWhatsapp } from 'react-icons/fa'
import {
  SiReact, SiTypescript, SiJavascript, SiCss, SiTailwindcss,
  SiThreedotjs, SiNodedotjs, SiGithub, SiVite, SiVercel,
  SiHtml5,
} from 'react-icons/si'

import './App.css'
import NavBar from './components/navbar'
import { useLanguage } from './i18n/LanguageContext'

// 🌟 Imagem de fundo da Hero — anexe aqui o caminho do seu arquivo (deve
// viver em `public/`, ex: `public/assets/hero-bg.jpg`, e ser referenciado
// com caminho absoluto). Deixe null/'' para manter o fundo atual (gradiente
// branco com máscara).
const BG_IMAGE = '/assets/water_bg.png'

// Ícone e variante de cada destaque da Hero — o texto (label/sub) vem de
// t.hero.features (i18n), na mesma ordem.
const featureIcons = [
  { icon: '✦', variant: 'aqua' },
  { icon: '</>', variant: 'sky' },
  { icon: '🌿', variant: 'forest' },
  { icon: '👤', variant: 'sky' },
]

// ── Seção Hero ───────────────────────────────────────────────
function HeroSection({ navTo }) {
  const { t } = useLanguage()
  const isMobile = useIsMobile(900)
  const parallaxRef = useRef(null)

  // ── Parallax via scroll ──────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      const scrollY = window.scrollY
      // Fator 0.4: imagem move 40% da velocidade do scroll → efeito de profundidade
      parallaxRef.current.style.transform = `translateX(-50%) translateY(${scrollY * 0.4}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (

    <section
      className="portfolio-section hero-section"
      style={{ position: 'relative' }} /* 🌟 Âncora para o fundo absoluto */
    >

      {/* 🌟 Fundo da Hero — usa BG_IMAGE quando definida, senão mantém o gradiente atual */}
      <div
        className="hero-bg"
        ref={parallaxRef}
        style={BG_IMAGE ? { backgroundImage: `url(${BG_IMAGE})`, backgroundSize: '2200px', backgroundPosition: 'top' } : undefined}
      ></div>

      {/* 🌟 Elevamos o conteúdo para o z-index 2, ficando acima do novo fundo */}
      <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>

        <div className="hero-left">
          <AeroPanel useBoxStyle variant="glass" size="sm" className="hero-badge-panel">
            <span className="hero-badge">{t.hero.badge}</span>
          </AeroPanel>

          <h1 className="hero-title hero-title-neo">
            <img src="/assets/NEO_texto.svg" alt="NEO" className="hero-neo-img" />
            <span className="hero-name hero-neo-text">Frutiger Aero</span>
          </h1>

          <p className="hero-desc">
            {t.hero.desc}
          </p>

          <div className="hero-actions">
            <AeroBtn variant="forest" onClick={() => navTo?.('Projetos')}>
              {t.hero.ctaProjetos}
            </AeroBtn>
            <AeroBtn variant="glass" onClick={() => navTo?.('Sobre')}>
              {t.hero.ctaSobre}
            </AeroBtn>
          </div>

          <p className="hero-mini-stats">
            {t.hero.miniStats}
          </p>
        </div>

        {/* Em telas pequenas o player completo (com o modelo 3D de largura
            fixa) quebrava o layout da Hero — some daqui e reaparece
            simplificado (sem 3D) dentro do menu hambúrguer, ver navbar.jsx. */}
        {!isMobile && (
          <div className="hero-right">
            {/* 🌟 Composição do player: bolhas 3D + AeroMusicPlayer */}
            <div className="hero-player-composition">
              {/* Encaixe aqui os dois <BallUserViewer3D/> ao redor do player.
                  Posições sugeridas (ajuste conforme o resultado visual): */}
              {/* <BallUserViewer3D top="4%" left="2%" color="#6fac36" /> */}
              {/* <BallUserViewer3D top="66%" left="78%" color="#3aa8d8" /> */}

              <div className="hero-music-player-scale">
                <AeroMusicPlayer />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 🌟 Faixa de destaques (design/tecnologia/experiência/personalização) */}
      <AeroPanel useBoxStyle variant="glass" className="hero-features-panel" style={{ position: 'relative', zIndex: 2 }}>
        <AeroGrid cols="auto" gap="4px" className="hero-features-grid">
          {t.hero.features.map((f, i) => (
            <AeroBox
              key={f.label}
              variant={featureIcons[i].variant}
              size="sm"
              icon={<span>{featureIcons[i].icon}</span>}
              label={f.label}
              sub={f.sub}
              className="hero-feature-box"
            />
          ))}
        </AeroGrid>
      </AeroPanel>

      <div className="hero-scroll-hint" style={{ position: 'relative', zIndex: 2 }}>
        <span>{t.hero.scrollHint}</span>
      </div>


    </section>
  )
}

// ── Seção Sobre ──────────────────────────────────────────────
function SobreSection() {
  const { t } = useLanguage()
  return (
    <section className="portfolio-section sobre-section">
      <div className="section-header">
        <span className="section-eyebrow">{t.sobre.eyebrow}</span>
        <h2 className="section-title">{t.sobre.title}</h2>
      </div>

      <div className="sobre-grid">
        <AeroPanel useBoxStyle variant="sky" size="lg" className="sobre-bio-panel">
          <div className="sobre-avatar-row">
            <div className="sobre-avatar">
              <img src="/assets/Icon1.png" style={{ width: '80%', height: '80%', objectFit: 'cover' }} alt="Avatar do Desenvolvedor" />
            </div>
            <AeroPanel useBoxStyle variant="aqua" size="lg" className="sobre-bio-panel">
              <span className="sobre-name-label">{t.sobre.nome}</span>
            </AeroPanel>
          </div>
          <p className="sobre-text">
            {t.sobre.bio1}
          </p>
          <p className="sobre-text" style={{ marginTop: 12 }}>
            {t.sobre.bio2}
          </p>
          <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['React', 'TypeScript', 'CSS', 'Three.js', 'Node.js'].map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </AeroPanel>

        <div className="sobre-side">

          <AeroBox variant="aqua" label={t.sobre.formacaoLabel} sub={t.sobre.formacaoSub} icon={<span>🎓</span>} />
          <AeroBox variant="aqua" label={t.sobre.idiomasLabel} sub={t.sobre.idiomasSub} icon={<span>🌐</span>} />
        </div>
      </div>


      <div className="section-header">
        <div style={{ margin: 150}}/>
        <h2 className="section-title">{t.sobre.faTitle}</h2>
      </div>

      <div className="sobre-grid">
        <AeroPanel useBoxStyle variant="forest" size="lg" className="sobre-bio-panel">
          <div className="sobre-avatar-row">
            <div className="sobre-avatar">
              <img src="/assets/pc_icon.png" style={{ width: '80%', height: '80%', objectFit: 'cover' }} alt="Avatar do Desenvolvedor" />
            </div>
            <AeroPanel useBoxStyle variant="aqua" size="lg" className="sobre-bio-panel">
              <span className="sobre-name-label">{t.sobre.faNome}</span>
            </AeroPanel>
          </div>
          <p className="sobre-text" style={{ marginBottom: 50 }}>
            {t.sobre.faTexto}
          </p>

        </AeroPanel>

        <div className="sobre-side sobre-side--deco">
          <AeroBox variant="forest" label="~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" icon={<span>🌱</span>} />
          <AeroBox variant="aqua" label="~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" icon={<span>☘️</span>} />
          <AeroBox variant="aurora" label="~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" icon={<span>🌊</span>} />
          <AeroBox variant="sky" label="~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" icon={<span>🧊</span>} />
        </div>
      </div>
    </section>
  )
}

// ── Seção Trajetória (linha do tempo) ─────────────────────────
// Ícone e variante de cada marco da timeline — o texto (ano/titulo/resumo/detalhe)
// vem de t.trajetoria.eventos (i18n), casado por id.
const eventosMeta = {
  ti1: { ic: '/assets/pc_icon.png', variant: 'forest' },
  ti2: { ic: '/assets/pc_icon.png', variant: 'aqua' },
  ti3: { ic: '/assets/pc_icon.png', variant: 'forest' },
  ti4: { ic: '/assets/pc_icon.png', variant: 'aqua' },
}

function TrajetoriaSection() {
  const { t } = useLanguage()
  const eventos = t.trajetoria.eventos.map(ev => ({ ...ev, ...eventosMeta[ev.id] }))

  const trackRef = useRef(null)
  const nodeRefs = useRef([])
  const [activeId, setActiveId] = useState(eventos[0].id)
  const [openId, setOpenId] = useState(eventos[0].id)

  // Preenche a linha central conforme o meio da viewport avança pela trilha
  useEffect(() => {
    const handleScroll = () => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const progress = (window.innerHeight / 2 - rect.top) / rect.height
      track.style.setProperty('--tl-progress', Math.min(Math.max(progress, 0), 1).toFixed(3))
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Destaca o marco mais próximo do centro da tela
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('data-id')
          if (id) setActiveId(id)
        }
      })
    }, { threshold: 0, rootMargin: '-46% 0px -46% 0px' })

    nodeRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="portfolio-section trajetoria-section">
      <div className="section-header">
        <span className="section-eyebrow">{t.trajetoria.eyebrow}</span>
        <h2 className="section-title">{t.trajetoria.title}</h2>
      </div>

      <div className="timeline-track" ref={trackRef}>
        <div className="timeline-line">
          <div className="timeline-line-fill" />
        </div>

        {eventos.map((ev, i) => {
          const isOpen = openId === ev.id
          const isActive = activeId === ev.id
          return (
            <div
              key={ev.id}
              data-id={ev.id}
              ref={el => (nodeRefs.current[i] = el)}
              className={`timeline-node timeline-node--${i % 2 === 0 ? 'left' : 'right'} ${isActive ? 'timeline-node--active' : ''}`}
            >
              <button
                type="button"
                className={`timeline-node-dot timeline-node-dot--${ev.variant}`}
                aria-label={`${ev.ano}: ${ev.titulo}`}
                onClick={() => setOpenId(isOpen ? null : ev.id)}
              >
                <img src={ev.ic} alt="" className="timeline-node-icon" />
              </button>

              <AeroPanel useBoxStyle variant={ev.variant} className="timeline-node-card">
                <button
                  type="button"
                  className="timeline-card-head"
                  onClick={() => setOpenId(isOpen ? null : ev.id)}
                  aria-expanded={isOpen}
                >
                  <span className="timeline-card-year">{ev.ano}</span>
                  <span className="timeline-card-title">{ev.titulo}</span>
                  <span className="timeline-card-arrow">{isOpen ? '−' : '+'}</span>
                </button>
                <p className="timeline-card-resumo">{ev.resumo}</p>
                <div className={`timeline-card-detalhe ${isOpen ? 'is-open' : ''}`}>
                  <div className="timeline-card-detalhe-inner">
                    <p>{ev.detalhe}</p>
                  </div>
                </div>
              </AeroPanel>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// Ícone, imagem e stack de cada projeto — nome/desc/cat vêm de t.projetos.lista
// (i18n), casados por índice.
const projetosMeta = [
    { ic: '/assets/cuidemais_logo.svg', img: '/assets/cuidemais_print.png', variant: 'sky', tech: ['React', 'Node.js', 'Tailwind', 'JavaScript'] },
    { ic: '/assets/jellycubes_logo.svg', img: '/assets/jellycubes_print.png', variant: 'forest', tech: ['React', 'Node.js', 'Tailwind', 'TypeScript'] },
  { ic: '/assets/portalturismo_logo.png', img: '/assets/portalturismo_print.png', variant: 'aqua', tech: ['React', 'Node.js', 'Tailwind', 'JavaScript'] },


]

// ── Seção Projetos ───────────────────────────────────────────
function ProjetosSection() {
  const { t } = useLanguage()
  const projetos = t.projetos.lista.map((p, i) => ({ ...p, ...projetosMeta[i] }))

  const [selecionado, setSelecionado] = useState(0)
  const ativo = projetos[selecionado] ?? projetos[0]

  return (
    <section className="portfolio-section projetos-section">
      <div className="section-header">
        <span className="section-eyebrow">{t.projetos.eyebrow}</span>
        <h2 className="section-title">{t.projetos.title}</h2>
      </div>

      <div className="filtros-bar">
        {projetos.map((p, i) => (
          <AeroBtn
            key={p.nome}
            variant={selecionado === i ? 'sky' : 'glass'}
            onClick={() => setSelecionado(i)}
          >
            <img src={p.ic} alt="" className="projeto-filtro-icone" />{p.nome}
          </AeroBtn>
        ))}
      </div>

      <AeroPanel
        key={ativo.nome}
        useBoxStyle
        variant={ativo.variant}
        size="xl"
        className="projeto-destaque-panel"
      >
        <div className={`projeto-destaque-imagem projeto-destaque-imagem--${ativo.variant}`}>
          {ativo.img ? (
            <img src={ativo.img} alt={ativo.nome} />
          ) : (
            <img src={ativo.ic} alt="" className="projeto-destaque-icone" />
          )}
        </div>

        <div className="projeto-destaque-corpo">
          <span className="tech-tag tech-tag--dark projeto-destaque-cat">{ativo.cat}</span>
          <h3 className="projeto-destaque-titulo">{ativo.nome}</h3>
          <p className="projeto-destaque-desc">{ativo.desc}</p>
          <div className="projeto-destaque-tags">
            {ativo.tech.map(tech => <span key={tech} className="tech-tag tech-tag--dark">{tech}</span>)}
          </div>
          <AeroBtn variant="glass">{t.projetos.verProjeto}</AeroBtn>
        </div>
      </AeroPanel>
    </section>
  )
}

// ── Seção Skills ─────────────────────────────────────────────
function SkillsSection() {
  const { t } = useLanguage()
  const skills = [
    { nome: 'React / Next.js', nivel: 95, ic: <SiReact color="#131313" />, var: 'forest' },
    { nome: 'TypeScript', nivel: 80, ic: <SiTypescript color="#131313" />, var: 'sky' },
    { nome: 'JavaScript', nivel: 80, ic: <SiJavascript color="#131313" />, var: 'sky' },
    { nome: 'CSS / Animations', nivel: 95, ic: <SiCss color="#131313" />, var: 'forest' },
    { nome: 'Tailwind', nivel: 95, ic: <SiTailwindcss color="#131313" />, var: 'forest' },
    { nome: 'Three.js / WebGL', nivel: 85, ic: <SiThreedotjs color="#131313" />, var: 'aqua' },
    { nome: 'Node.js / APIs', nivel: 75, ic: <SiNodedotjs color="#131313" />, var: 'aurora' },

  ]

  const ferramentas = [
    { ic: <SiCss color="131313" />, nome: 'CSS' }, { ic: <SiHtml5 color="#131313" />, nome: 'HTML5' },
    { ic: <SiJavascript color="#131313" />, nome: 'JScript' }, { ic: <SiTypescript color="#131313" />, nome: 'TScript' },
    { ic: <SiGithub color="#131313" />, nome: 'GitHub' }, { ic: <SiVite color="#131313" />, nome: 'Vite' },
    { ic: <SiTailwindcss color="#131313" />, nome: 'Tailwind' }, { ic: <SiVercel color="#131313" />, nome: 'Vercel' },
    { ic: <SiThreedotjs color="#131313" />, nome: 'Three.js' }, { ic: <SiNodedotjs color="#131313" />, nome: 'Node.js' },
  ]

  return (
    <section className="portfolio-section skills-section">
      <div className="section-header">
        <span className="section-eyebrow">{t.skills.eyebrow}</span>
        <h2 className="section-title">{t.skills.title}</h2>
      </div>

      <div className="skills-layout">
        <AeroPanel title={t.skills.proficiencia} className="skills-bars-panel">
          {skills.map(s => (
            <div key={s.nome} className="skill-row">
              <div className="skill-info">
                <span className="skill-icon">{s.ic}</span>
                <span className="skill-name">{s.nome}</span>
                <span className="skill-pct">{s.nivel}%</span>
              </div>
              <div className="skill-bar-bg">
                <div
                  className={`skill-bar-fill aero-bar--${s.var}`}
                  style={{ width: `${s.nivel}%` }}
                />
              </div>
            </div>
          ))}
        </AeroPanel>

        <div className="skills-right">
          <AeroPanel title={t.skills.ferramentas} className="tools-panel">
            <AeroGrid cols={2} gap="10px">
              {ferramentas.map(f => (
                <AeroBox key={f.nome} size="sm" variant="glass" label={f.nome} icon={<span>{f.ic}</span>} />
              ))}
            </AeroGrid>
          </AeroPanel>

          <AeroPanel useBoxStyle variant="sky" size="lg" className="cta-learn-panel">
            <span style={{ fontSize: 36 }}>🌟</span>
            <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1rem', marginTop: 8 }}>
              {t.skills.ctaLearn}
            </p>
          </AeroPanel>
        </div>
      </div>
    </section>
  )
}

// ── Seção Contato ────────────────────────────────────────────
const contatoLinks = [
  { label: 'GitHub', sub: 'github.com/coffeecliff', icon: <FaGithub style={{ color: '#171717' }} />, variant: 'aurora', href: 'https://github.com/coffeecliff' },
  { label: 'WhatsApp', sub: '+55 (35) 99919-4121', icon: <FaWhatsapp style={{ color: '#25D366' }} />, variant: 'aurora', href: 'https://wa.me/5535999194121' },
  { label: 'LinkedIn', sub: 'linkedin.com/in/coffeecliff', icon: '💼', variant: 'aurora', href: 'https://linkedin.com/in/coffeecliff' },
  { label: 'E-mail', sub: 'cauaneves976@gmail.com', icon: '📧', variant: 'aurora', href: 'mailto:cauaneves976@gmail.com' },
]

function ContatoSection() {
  const { t } = useLanguage()
  return (
    <section className="portfolio-section contato-section">
      <div className="section-header">
        <span className="section-eyebrow">{t.contato.eyebrow}</span>
        <h2 className="section-title">{t.contato.title}</h2>
      </div>


      <div className="contato-layout">
        <div className="contato-info">

          <AeroPanel useBoxStyle variant="glass" className="contato-quote-panel">
            <p className="contato-quote">
              {t.contato.quote}
            </p>
          </AeroPanel>
        </div>

        <AeroPanel title={t.contato.faleComigo} className="contato-form-panel">
          <AeroGrid cols={2} gap="12px" className="contato-links-grid">
            {contatoLinks.map(c => (
              <AeroBox
                key={c.label}
                variant={c.variant}
                size="lg"
                label={c.label}
                sub={c.sub}
                icon={<span>{c.icon}</span>}
                onClick={() => window.open(c.href, '_blank', 'noopener,noreferrer')}
                className="contato-link-tile"
              />
            ))}
          </AeroGrid>
        </AeroPanel>
      </div>
    </section>
  )
}

// ── App Principal ────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState('Hero')

  const heroRef = useRef(null)
  const sobreRef = useRef(null)
  const trajetoriaRef = useRef(null)
  const projetosRef = useRef(null)
  const skillsRef = useRef(null)
  const contatoRef = useRef(null)

  const sectionRefs = {
    Hero: heroRef,
    Sobre: sobreRef,
    Trajetória: trajetoriaRef,
    Projetos: projetosRef,
    Skills: skillsRef,
    Contato: contatoRef,
  }

  const lenis = useLenis()

  const navTo = (section) => {
    setActiveSection(section)

    const element = sectionRefs[section]?.current
    if (!element) return

    // Defina o valor do seu offset aqui (ex: 100px)
    const offset = 36

    if (lenis) {
      lenis.scrollTo(element, { offset: -offset, duration: 1.2 })
    } else {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('data-section')
          if (id) setActiveSection(id)
        }
      })
    }, { threshold: 0.4 })

    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) {
        ref.current.setAttribute('data-section', id)
        observer.observe(ref.current)
      }
    })
    return () => observer.disconnect()
  }, [])

  // ── Reveal suave ao rolar a página (dispara uma vez por seção) ──
  useEffect(() => {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('reveal-visible')
          revealObserver.unobserve(e.target)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' })

    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current && id !== 'Hero') {
        revealObserver.observe(ref.current)
      }
    })
    return () => revealObserver.disconnect()
  }, [])

  return (
    <body>
      <div className="portfolio-root">
        <NavBar activeSection={activeSection} onNav={navTo} />


        <main className="portfolio-main">
          <div ref={heroRef}><HeroSection navTo={navTo} /></div>
          <div ref={sobreRef} className="reveal"><SobreSection /></div>
          <div ref={trajetoriaRef} className="reveal"><TrajetoriaSection /></div>
          <div ref={projetosRef} className="reveal"><ProjetosSection /></div>
          <div ref={skillsRef} className="reveal"><SkillsSection /></div>
          <div ref={contatoRef} className="reveal"><ContatoSection /></div>

          <BallUserViewer3D top='8%' left='78%' color='#6fac36' />
          <BallUserViewer3D top='3%' left='50%' color='#6fac36' />
          <BallUserViewer3D top='93%' left='17%' color='#d3b634' />
          <FolderViewer3D top='51.5%' left='46%' />

        </main>

        <footer className="portfolio-footer">
          <span>✦ NEO frutiger aero — Cauã Cunha Neves © 2026</span>
        </footer>
      </div>
    </body>
  )
}
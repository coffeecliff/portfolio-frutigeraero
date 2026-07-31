import { useState, useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { AeroBox, AeroPanel, AeroGrid, AeroBtn } from './components/aeroBox'
// import { UserViewer3D } from './components/models_viewers/UserViewer3D'
// import { IdogViewer3D } from './components/IdogViewer3D'
// import { CityViewer3D } from './components/CityViewer3D'
import { FolderViewer3D } from './components/models_viewers/FolderViewer3D'
import { BallUserViewer3D } from './components/models_viewers/BallUserViewer3D'
import { AeroMusicPlayer } from './components/musicPlayer'
import { LavaBubbles } from './components/lavaBubbles'

import './App.css'
import NavBar from './components/navbar'

// 🌟 Imagem de fundo da Hero — anexe aqui o caminho do seu arquivo (deve
// viver em `public/`, ex: `public/assets/hero-bg.jpg`, e ser referenciado
// com caminho absoluto). Deixe null/'' para manter o fundo atual (gradiente
// branco com máscara).
const BG_IMAGE = '/assets/water_bg.png'

// Rótulos exibidos na navbar/CTAs usam os mesmos ids de seção do App —
// aqui só o texto de exibição da Hero.
const featureItems = [
  { icon: '✦', label: 'Design Futurista', sub: 'Estética moderna inspirada no visual Frutiger Aero.', variant: 'aqua' },
  { icon: '</>', label: 'Tecnologia & Performance', sub: 'Soluções rápidas, responsivas e otimizadas.', variant: 'sky' },
  { icon: '🌿', label: 'Foco em Experiência', sub: 'Interfaces intuitivas que conectam e geram impacto.', variant: 'forest' },
  { icon: '👤', label: 'Personalizado', sub: 'Cada projeto é único, feito para o seu objetivo.', variant: 'sky' },
]

const statItems = [
  { icon: '🗂️', value: '10+', label: 'Projetos entregues' },
  { icon: '➕', value: '100%', label: 'Clientes satisfeitos' },
  { icon: '💚', value: '2+', label: 'Anos de experiência' },
  { icon: '∞', value: '∞', label: 'Possibilidades criativas' },
]

// ── Seção Hero ───────────────────────────────────────────────
function HeroSection({ navTo }) {
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
        style={BG_IMAGE ? { backgroundImage: `url(${BG_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      ></div>

      {/* 🌟 Bolhas Lava Lamp, uma camada acima da box branca */}
      <div className="hero-bubbles-layer">
        <LavaBubbles />
      </div>

      {/* 🌟 Elevamos o conteúdo para o z-index 2, ficando acima do novo fundo */}
      <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>

        <div className="hero-left">
          <AeroPanel useBoxStyle variant="glass" size="sm" className="hero-badge-panel">
            <span className="hero-badge">Design • Tecnologia • Criatividade</span>
          </AeroPanel>

          <h1 className="hero-title hero-title-neo">
            <img src="/assets/NEO_texto.svg" alt="NEO" className="hero-neo-img" />
            <span className="hero-name hero-neo-text">Frutiger Aero</span>
          </h1>

          <p className="hero-desc">
            Designs e experiências digitais que unem estética futurista, funcionalidade e propósito.
          </p>

          <div className="hero-actions">
            <AeroBtn variant="forest" onClick={() => navTo?.('Projetos')}>
              Ver projetos →
            </AeroBtn>
            <AeroBtn variant="glass" onClick={() => navTo?.('Sobre')}>
              Saiba mais ⌄
            </AeroBtn>
          </div>

          <p className="hero-mini-stats">
            +10 projetos concluídos &nbsp;•&nbsp; Clientes satisfeitos &nbsp;•&nbsp; Entregas de qualidade
          </p>
        </div>

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

      </div>

      {/* 🌟 Faixa de destaques (design/tecnologia/experiência/personalização) */}
      <AeroPanel useBoxStyle variant="glass" className="hero-features-panel" style={{ position: 'relative', zIndex: 2 }}>
        <AeroGrid cols="auto" gap="4px" className="hero-features-grid">
          {featureItems.map(f => (
            <AeroBox
              key={f.label}
              variant={f.variant}
              size="sm"
              icon={<span>{f.icon}</span>}
              label={f.label}
              sub={f.sub}
              className="hero-feature-box"
            />
          ))}
        </AeroGrid>
      </AeroPanel>

      {/* 🌟 Linha inferior: estatísticas + CTA "Vamos criar algo incrível juntos?" */}
      <div className="hero-bottom-row" style={{ position: 'relative', zIndex: 2 }}>
        <AeroPanel useBoxStyle variant="glass" className="hero-stats-panel">
          <AeroGrid cols={2} gap="10px">
            {statItems.map(s => (
              <div key={s.label} className="hero-stat-item">
                <span className="hero-stat-icon">{s.icon}</span>
                <span className="hero-stat-value">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </AeroGrid>
        </AeroPanel>

        <AeroPanel useBoxStyle variant="forest" size="lg" className="hero-cta-panel">
          <h3 className="hero-cta-title">Vamos criar algo incrível juntos?</h3>
          <p className="hero-cta-text">Conte sua ideia e eu transformo em realidade.</p>
          <AeroBtn variant="glass" onClick={() => navTo?.('Contato')}>
            Falar agora →
          </AeroBtn>
        </AeroPanel>
      </div>

      <div className="hero-scroll-hint" style={{ position: 'relative', zIndex: 2 }}>
        <span>↓ Role para explorar </span>
      </div>


    </section>
  )
}

// ── Seção Sobre ──────────────────────────────────────────────
function SobreSection() {
  return (
    <section className="portfolio-section sobre-section">
      <div className="section-header">
        <span className="section-eyebrow">Quem sou eu</span>
        <h2 className="section-title">Um pouco sobre mim</h2>
      </div>

      <div className="sobre-grid">
        <AeroPanel useBoxStyle variant="sky" size="lg" className="sobre-bio-panel">
          <div className="sobre-avatar-row">
            <div className="sobre-avatar">
              <img src="/assets/Icon1.png" style={{ width: '80%', height: '80%', objectFit: 'cover' }} alt="Avatar do Desenvolvedor" />
            </div>
            <AeroPanel useBoxStyle variant="aqua" size="lg" className="sobre-bio-panel">
              <span className="sobre-name-label">Cauã Cunha Neves</span>
            </AeroPanel>
          </div>
          <p className="sobre-text">
            Desenvolvedor apaixonado por criar interfaces que mesclam estética e função.
            Me especializo em React, animações CSS e design systems com foco em performance
            e acessibilidade.
          </p>
          <p className="sobre-text" style={{ marginTop: 12 }}>
            Quando não estou codando, estou explorando novos designs, jogando jogos indie
            ou ouvindo música lo-fi enquanto tomo café ☕
          </p>
          <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['React', 'TypeScript', 'CSS', 'Three.js', 'Figma', 'Node.js'].map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </AeroPanel>

        <div className="sobre-side">
          <AeroBox variant="aqua" label="Localização" sub="Belo Horizonte, MG" icon={<span>📍</span>} />
          <AeroBox variant="aqua" label="Experiência" sub="3+ anos no mercado" icon={<span>💼</span>} />
          <AeroBox variant="aqua" label="Formação" sub="Ciência da Computação" icon={<span>🎓</span>} />
          <AeroBox variant="aqua" label="Idiomas" sub="PT-BR" icon={<span>🌐</span>} />
        </div>
      </div>
    </section>
  )
}

// ── Seção Trajetória (linha do tempo) ─────────────────────────
function TrajetoriaSection() {
  const eventos = [
    {
      id: '2022-libs', ano: '2022', ic: '🖥️', variant: 'forest', titulo: '3 libs open-source',
      resumo: 'Contribuiu ativamente para bibliotecas de UI e animação usadas pela comunidade.',
      detalhe: 'Publicou componentes de animação baseados em CSS custom properties e IntersectionObserver, hoje usados em pequenos projetos e protótipos de outros devs.',
    },
    {
      id: '2023-senior', ano: '2023', ic: '🖥️', variant: 'sky', titulo: 'Senior Dev na Fintech XYZ',
      resumo: 'Liderou a reconstrução do dashboard principal em React + TypeScript.',
      detalhe: 'Conduziu a migração de uma stack legada para um design system próprio, reduzindo o tempo de carregamento em 40% e mentorando dois desenvolvedores júnior no processo.',
    },
    {
      id: '2024-libs', ano: '2024', ic: '🖥️', variant: 'forest', titulo: '3 libs open-source',
      resumo: 'Contribuiu ativamente para bibliotecas de UI e animação usadas pela comunidade.',
      detalhe: 'Publicou componentes de animação baseados em CSS custom properties e IntersectionObserver, hoje usados em pequenos projetos e protótipos de outros devs.',
    },
    {
      id: '2025-junior', ano: '2025', ic: '🖥️', variant: 'sky', titulo: 'Primeiro emprego como dev júnior',
      resumo: 'Entrou no mercado construindo interfaces para um produto SaaS de gestão.',
      detalhe: 'Primeiro contato com produção: aprendeu Git, revisão de código e a trabalhar em squad ágil, plantando a base do interesse por design e experiência do usuário.',
    },
    {
      id: '2026-junior-a', ano: '2026', ic: '🖥️', variant: 'forest', titulo: 'Primeiro emprego como dev júnior',
      resumo: 'Entrou no mercado construindo interfaces para um produto SaaS de gestão.',
      detalhe: 'Primeiro contato com produção: aprendeu Git, revisão de código e a trabalhar em squad ágil, plantando a base do interesse por design e experiência do usuário.',
    },
    {
      id: '2026-junior-b', ano: '2026', ic: '🖥️', variant: 'sky', titulo: 'Primeiro emprego como dev júnior',
      resumo: 'Entrou no mercado construindo interfaces para um produto SaaS de gestão.',
      detalhe: 'Primeiro contato com produção: aprendeu Git, revisão de código e a trabalhar em squad ágil, plantando a base do interesse por design e experiência do usuário.',
    },
  ]

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
        <span className="section-eyebrow">Como cheguei até aqui</span>
        <h2 className="section-title">Linha do Tempo</h2>
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
                <span>{ev.ic}</span>
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

// ── Seção Projetos ───────────────────────────────────────────
function ProjetosSection() {
  const projetos = [
    { nome: 'AeroUI Kit', desc: 'Design system completo no estilo Frutiger Aero para React.', cat: 'OSS', ic: '💎', variant: 'aurora', tech: ['React', 'CSS', 'Figma'] },
    { nome: 'CloudSync Dashboard', desc: 'Painel de gerenciamento de arquivos com sincronização em tempo real.', cat: 'Web App', ic: '☁️', variant: 'sky', tech: ['React', 'Node.js', 'Socket.io'] },
    { nome: 'FlorApp', desc: 'App mobile de registro de fauna para pesquisadores de campo.', cat: 'Mobile', ic: '🌿', variant: 'forest', tech: ['React Native', 'Maps API'] },
    { nome: 'Cosmos Viewer', desc: 'Visualizador 3D interativo do sistema solar com dados da NASA.', cat: '3D / Visual', ic: '🪐', variant: 'aqua', tech: ['Three.js', 'WebGL', 'D3'] },
    { nome: 'SpendMind', desc: 'App de finanças pessoais com análise de gastos por IA.', cat: 'Mobile', ic: '💸', variant: 'sky', tech: ['React Native', 'AI', 'Charts'] },
    { nome: 'PixelGrid', desc: 'Editor colaborativo de pixel art no browser com multiplayer.', cat: 'Web App', ic: '🎨', variant: 'aurora', tech: ['Canvas', 'WebRTC', 'React'] },
  ]

  const [selecionado, setSelecionado] = useState(projetos[0].nome)
  const ativo = projetos.find(p => p.nome === selecionado) ?? projetos[0]

  return (
    <section className="portfolio-section projetos-section">
      <div className="section-header">
        <span className="section-eyebrow">O que eu construí</span>
        <h2 className="section-title">Projetos em Destaque</h2>
      </div>

      <div className="filtros-bar">
        {projetos.map(p => (
          <AeroBtn
            key={p.nome}
            variant={selecionado === p.nome ? 'sky' : 'glass'}
            onClick={() => setSelecionado(p.nome)}
          >
            <span style={{ marginRight: 6 }}>{p.ic}</span>{p.nome}
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
            <span className="projeto-destaque-icone">{ativo.ic}</span>
          )}
        </div>

        <div className="projeto-destaque-corpo">
          <span className="tech-tag tech-tag--dark projeto-destaque-cat">{ativo.cat}</span>
          <h3 className="projeto-destaque-titulo">{ativo.nome}</h3>
          <p className="projeto-destaque-desc">{ativo.desc}</p>
          <div className="projeto-destaque-tags">
            {ativo.tech.map(t => <span key={t} className="tech-tag tech-tag--dark">{t}</span>)}
          </div>
          <AeroBtn variant="glass">Ver Projeto →</AeroBtn>
        </div>
      </AeroPanel>
    </section>
  )
}

// ── Seção Skills ─────────────────────────────────────────────
function SkillsSection() {
  const skills = [
    { nome: 'React / Next.js', nivel: 94, ic: '⚛️', var: 'sky' },
    { nome: 'TypeScript', nivel: 88, ic: '📘', var: 'aurora' },
    { nome: 'CSS / Animations', nivel: 96, ic: '🎨', var: 'aqua' },
    { nome: 'Three.js / WebGL', nivel: 76, ic: '🪐', var: 'forest' },
    { nome: 'Node.js / APIs', nivel: 82, ic: '🔧', var: 'sky' },
    { nome: 'Figma / Design', nivel: 90, ic: '💎', var: 'aurora' },
  ]

  const ferramentas = [
    { ic: '🐙', nome: 'GitHub' }, { ic: '🐳', nome: 'Docker' }, { ic: '🔥', nome: 'Vite' },
    { ic: '🌊', nome: 'Tailwind' }, { ic: '🧪', nome: 'Vitest' }, { ic: '🚀', nome: 'Vercel' },
    { ic: '📦', nome: 'pnpm' }, { ic: '🎯', nome: 'Storybook' },
  ]

  return (
    <section className="portfolio-section skills-section">
      <div className="section-header">
        <span className="section-eyebrow">Meu arsenal</span>
        <h2 className="section-title">Skills & Tecnologias</h2>
      </div>

      <div className="skills-layout">
        <AeroPanel title="Nível de Proficiência" className="skills-bars-panel">
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
          <AeroPanel title="Ferramentas & Stack" className="tools-panel">
            <AeroGrid cols={2} gap="10px">
              {ferramentas.map(f => (
                <AeroBox key={f.nome} size="sm" variant="glass" label={f.nome} icon={<span>{f.ic}</span>} />
              ))}
            </AeroGrid>
          </AeroPanel>

          <AeroPanel useBoxStyle variant="sky" size="lg" className="cta-learn-panel">
            <span style={{ fontSize: 36 }}>🌟</span>
            <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1rem', marginTop: 8 }}>
              Sempre aprendendo novas tecnologias e metodologias para entregar o melhor.
            </p>
          </AeroPanel>
        </div>
      </div>
    </section>
  )
}

// ── Seção Contato ────────────────────────────────────────────
function ContatoSection() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleEnviar = () => {
    if (nome && email && msg) {
      setEnviado(true)
      setTimeout(() => setEnviado(false), 3000)
      setNome(''); setEmail(''); setMsg('')
    }
  }

  return (
    <section className="portfolio-section contato-section">
      <div className="section-header">
        <span className="section-eyebrow">Vamos conversar</span>
        <h2 className="section-title">Entre em Contato</h2>
      </div>


      <div className="contato-layout">
        <div className="contato-info">
          <AeroBox variant="sky" label="E-mail" sub="cauaneves976@gmail.com" icon={<span>📧</span>} />
          <AeroBox variant="aqua" label="LinkedIn" sub="NUM TENHO AINDA" icon={<span>💼</span>} />
          <AeroBox variant="forest" label="GitHub" sub="coffecliff" icon={<span>🐙</span>} />
          <AeroBox variant="aurora" label="Respondo em" sub="Até 24 horas" icon={<span>⚡</span>} />

          <AeroPanel useBoxStyle variant="glass" className="contato-quote-panel">
            <p className="contato-quote">
              "Adoro novos desafios — seja um projeto pequeno ou uma arquitetura complexa,
              estou aqui para construir algo incrível juntos."
            </p>
          </AeroPanel>
        </div>

        <AeroPanel title="Envie uma Mensagem" className="contato-form-panel">
          {enviado ? (
            <div className="form-success">
              <span style={{ fontSize: 48 }}>✅</span>
              <p>Mensagem enviada com sucesso!</p>
              <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>Em breve entrarei em contato.</p>
            </div>
          ) : (
            <div className="form-fields">
              <div className="form-group">
                <label className="form-label">Seu Nome</label>
                <input
                  className="aero-input"
                  placeholder="João Silva"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">E-mail</label>
                <input
                  className="aero-input"
                  type="email"
                  placeholder="joao@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mensagem</label>
                <textarea
                  className="aero-input aero-textarea"
                  placeholder="Olá Cauã, tenho um projeto..."
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  rows={5}
                />
              </div>
              <AeroBtn variant="sky" onClick={handleEnviar} style={{ width: '100%', justifyContent: 'center' }}>
                Enviar Mensagem 🚀
              </AeroBtn>
            </div>
          )}
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

          <BallUserViewer3D top='2%' left='87%' color='#6fac36' />
          <BallUserViewer3D top='50%' left='87%' color='#d3b634' />
          <BallUserViewer3D top='10%' right='90%' color='#6fac36' />
          <FolderViewer3D top='34%' left='65%' />

        </main>

        <footer className="portfolio-footer">
          <span>✦ dev.studio — Cauã Cunha Neves © 2026</span>
        </footer>
      </div>
    </body>
  )
}
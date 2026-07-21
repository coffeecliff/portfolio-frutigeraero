import { useState, useEffect, useRef } from 'react'
import { AeroBox, AeroPanel, AeroGrid, AeroBtn } from './components/aeroBox'
// import { UserViewer3D } from './components/models_viewers/UserViewer3D'
// import { IdogViewer3D } from './components/IdogViewer3D'
// import { CityViewer3D } from './components/CityViewer3D'
import { FolderViewer3D } from './components/models_viewers/FolderViewer3D'
import { BallUserViewer3D } from './components/models_viewers/BallUserViewer3D'
import { AeroMusicPlayer } from './components/musicPlayer'
import { BgParticles } from './components/bgParticles'

import './App.css'
import NavBar from './components/navbar'

// ── Seção Hero ───────────────────────────────────────────────
function HeroSection() {
  const [typed, setTyped] = useState('')
  const words = ['Interfaces.', 'Experiências.', 'Design Systems.', 'Modelos 3D.']
  const [wi, setWi] = useState(0)
  const [charI, setCharI] = useState(0)
  const [deleting, setDeleting] = useState(false)

  // Substitua pelo caminho correto do seu arquivo dentro da pasta public
  const audioRef = useRef(null)
  const parallaxRef = useRef(null)

  // Inicializa o áudio apenas uma vez ao carregar o componente
  useEffect(() => {
    audioRef.current = new Audio('/musica.mp3')
    audioRef.current.loop = true // Ative se quiser que ela fique em loop

    // Cleanup: pausa a música se o usuário mudar de página/componente desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

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


  // ───────────────────────────────────────────────────────────

  useEffect(() => {
    const current = words[wi]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setTyped(current.slice(0, charI + 1))
        if (charI + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1400)
        } else {
          setCharI(c => c + 1)
        }
      } else {
        setTyped(current.slice(0, charI - 1))
        if (charI === 0) {
          setDeleting(false)
          setWi(w => (w + 1) % words.length)
        } else {
          setCharI(c => c - 1)
        }
      }
    }, deleting ? 55 : 95)
    return () => clearTimeout(timeout)
  }, [charI, deleting, wi])

  return (
    
    <section
      className="portfolio-section hero-section"
      style={{ position: 'relative' }} /* 🌟 Âncora para o fundo absoluto */
    >

        {/* 🌟 Novo Elemento de Fundo Exclusivo da Hero */}
        <div className="hero-bg" ref={parallaxRef}></div>

        {/* 🌟 Elevamos o conteúdo para o z-index 2, ficando acima do novo fundo */}
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>

          <div className="hero-left">
            <h1 className="hero-title">
              Olá, sou<br />
              <span className="hero-name">Cauã Cunha</span>
            </h1>

            <p className="hero-subtitle">
              Construindo <span className="hero-type">{typed}<span className="cursor">|</span></span>
            </p>

            <p className="hero-desc">
              Desenvolvedor frontend especialista em design systems, animações e experiências
              visuais únicas que encantam usuários.
            </p>
          </div>

          <div className="hero-right">
            <AeroMusicPlayer />
          </div>

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
          <div className="sobre-avatar">
            <img src="/assets/Icon1.png" style={{ width: '80%', height: '80%', objectFit: 'cover' }} alt="Avatar do Desenvolvedor" />
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
          <AeroBox variant="aqua" label="Localização" sub="Belo Horizonte, MG" icon={<span>📍</span>}/>
          <AeroBox variant="aqua" label="Experiência" sub="3+ anos no mercado" icon={<span>💼</span>}/>
          <AeroBox variant="aqua" label="Formação" sub="Ciência da Computação" icon={<span>🎓</span>}/>
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
      ano: '2024', ic: '🌟', variant: 'aurora', titulo: 'Fundou o dev.studio',
      resumo: 'Passou a atuar como freelancer full-time, escolhendo os próprios projetos.',
      detalhe: 'Estruturou um estúdio solo focado em interfaces imersivas e design systems, atendendo clientes de fintech a portfólios criativos, sempre unindo estética e performance.',
    },
    {
      ano: '2023', ic: '📈', variant: 'sky', titulo: 'Senior Dev na Fintech XYZ',
      resumo: 'Liderou a reconstrução do dashboard principal em React + TypeScript.',
      detalhe: 'Conduziu a migração de uma stack legada para um design system próprio, reduzindo o tempo de carregamento em 40% e mentorando dois desenvolvedores júnior no processo.',
    },
    {
      ano: '2022', ic: '🔧', variant: 'forest', titulo: '3 libs open-source',
      resumo: 'Contribuiu ativamente para bibliotecas de UI e animação usadas pela comunidade.',
      detalhe: 'Publicou componentes de animação baseados em CSS custom properties e IntersectionObserver, hoje usados em pequenos projetos e protótipos de outros devs.',
    },
    {
      ano: '2021', ic: '🎯', variant: 'aqua', titulo: 'Primeiro emprego como dev júnior',
      resumo: 'Entrou no mercado construindo interfaces para um produto SaaS de gestão.',
      detalhe: 'Primeiro contato com produção: aprendeu Git, revisão de código e a trabalhar em squad ágil, plantando a base do interesse por design e experiência do usuário.',
    },
    {
      ano: '2020', ic: '🎓', variant: 'aurora', titulo: 'Início em Ciência da Computação',
      resumo: 'Começou a graduação e os primeiros projetos pessoais em front-end.',
      detalhe: 'Entre trabalhos da faculdade e projetos pessoais, descobriu o CSS avançado e o Three.js — o gatilho para a estética que viria a definir seus projetos futuros.',
    },
  ]

  const trackRef = useRef(null)
  const nodeRefs = useRef([])
  const [activeAno, setActiveAno] = useState(eventos[0].ano)
  const [openAno, setOpenAno] = useState(eventos[0].ano)

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
          const ano = e.target.getAttribute('data-ano')
          if (ano) setActiveAno(ano)
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
          const isOpen = openAno === ev.ano
          const isActive = activeAno === ev.ano
          return (
            <div
              key={ev.ano}
              data-ano={ev.ano}
              ref={el => (nodeRefs.current[i] = el)}
              className={`timeline-node timeline-node--${i % 2 === 0 ? 'left' : 'right'} ${isActive ? 'timeline-node--active' : ''}`}
            >
              <button
                type="button"
                className={`timeline-node-dot timeline-node-dot--${ev.variant}`}
                aria-label={`${ev.ano}: ${ev.titulo}`}
                onClick={() => setOpenAno(isOpen ? null : ev.ano)}
              >
                <span>{ev.ic}</span>
              </button>

              <AeroPanel useBoxStyle variant={ev.variant} className="timeline-node-card">
                <button
                  type="button"
                  className="timeline-card-head"
                  onClick={() => setOpenAno(isOpen ? null : ev.ano)}
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

  const navTo = (section) => {
  setActiveSection(section)
  
  const element = sectionRefs[section]?.current
  if (element) {
    // Defina o valor do seu offset aqui (ex: 100px)
    const offset = 36
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
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
        <BgParticles/>
        <NavBar activeSection={activeSection} onNav={navTo} />


        <main className="portfolio-main">
          <div ref={heroRef}><HeroSection /></div>
          <div ref={sobreRef} className="reveal"><SobreSection /></div>
          <div ref={trajetoriaRef} className="reveal"><TrajetoriaSection /></div>
          <div ref={projetosRef} className="reveal"><ProjetosSection /></div>
          <div ref={skillsRef} className="reveal"><SkillsSection /></div>
          <div ref={contatoRef} className="reveal"><ContatoSection /></div>

          <BallUserViewer3D top='1%' left='87%' color='#6fac36' />
          <BallUserViewer3D top='50%' left='87%' color='#d3b634' />
          <BallUserViewer3D top='14%' right='90%' color='#6fac36' />
          <FolderViewer3D top='34%' left='65%' />

        </main>

        <footer className="portfolio-footer">
          <span>✦ dev.studio — Cauã Cunha Neves© 2026</span>
        </footer>
      </div>
    </body>
  )
}
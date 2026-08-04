import { createContext, useContext, useState } from 'react'

const translations = {
  'pt-BR': {
    nav: {
      Hero: 'Início',
      Sobre: 'Sobre',
      Trajetória: 'Trajetória',
      Projetos: 'Projetos',
      Skills: 'Skills',
      Contato: 'Contato',
      cta: 'Fale comigo →',
    },
    hero: {
      badge: 'Design • Tecnologia • Criatividade',
      desc: 'Designs e experiências digitais que unem estética futurista, funcionalidade e propósito.',
      ctaProjetos: 'Ver projetos →',
      ctaSobre: 'Saiba mais',
      miniStats: 'Visuais elegantes  •  Entregas de qualidade',
      scrollHint: '↓ Role para explorar',
      features: [
        { label: 'Design Futurista', sub: 'Estética moderna inspirada no visual Frutiger Aero.' },
        { label: 'Tecnologia & Performance', sub: 'Soluções rápidas, responsivas e otimizadas.' },
        { label: 'Foco em Experiência', sub: 'Interfaces intuitivas que conectam e geram impacto.' },
        { label: 'Personalizado', sub: 'Cada projeto é único, feito para o seu objetivo.' },
      ],
    },
    sobre: {
      eyebrow: 'Quem sou eu',
      title: 'Um pouco sobre mim',
      nome: 'Cauã Cunha Neves',
      bio1: 'Olá! Meu nome é Cauã tenho 19 anos, e sou desenvolvedor apaixonado por criar interfaces que mesclam estética e função. Me especializo em React, animações CSS e design systems com foco em performance e acessibilidade.',
      bio2: 'Quando não estou codando, estou explorando novos designs, fazendo jogos ou ouvindo música lo-fi enquanto tomo café ☕',
      formacaoLabel: 'Formação',
      formacaoSub: 'Técnico em Informática',
      idiomasLabel: 'Idiomas',
      idiomasSub: 'PT-BR / EN',
      faTitle: 'O que é o Frutiger Aero?',
      faNome: 'Frutiger Aero',
      faTexto: 'Frutiger Aero é um estilo de design que prevaleceu de meados dos anos 2000 até o início dos anos 2010. Originou-se no design de interfaces de usuário, mas posteriormente influenciou diversas outras mídias. Foi nomeado em 2017 por Sofi Xian do Instituto de Pesquisa de Estética do Consumidor e ressurgiu em 2023 como uma estética da Internet, tornando-se popular entre a Geração Z como um objeto de nostalgia e estética, que traz a noção da imaginação das pessoas da época em relação ao futuro. A arte Frutiger Aero apresenta temas otimistas de tecnologia em harmonia com a natureza e frequentemente inclui imagens da natureza, cores vibrantes e elementos esqueumórficos.',
    },
    trajetoria: {
      eyebrow: 'Como cheguei até aqui',
      title: 'Formação',
      eventos: [
        {
          id: 'ti1', ano: '2023 - 2025', titulo: 'Curso Técnico em Informática',
          resumo: 'Curso técnico de 2 anos focado no ciclo completo de desenvolvimento de software, infraestrutura de redes e manutenção preventiva/corretiva de computadores.',
          detalhe: 'Montagem e manutenção de hardware, administração de redes e servidores, desenvolvimento de software.',
        },
        {
          id: 'ti2', ano: '2025', titulo: 'Módulo I do Senac Tec',
          resumo: 'Primeiro módulo do curso Senac Tec, com foco no desenvolvimento do Frontend de aplicações web, englobando a construção de interfaces responsivas, estruturação de código e boas práticas de UI/UX.',
          detalhe: 'Desenvolvimento web colaborativo em equipe e simulação de rotinas de projetos Frontend.',
        },
        {
          id: 'ti3', ano: '2025', titulo: 'Módulo II do Senac Tec',
          resumo: 'Segundo módulo do curso Senac Tec, com foco na engenharia completa (Full Stack) de aplicações web, abrangendo a integração ponta a ponta entre interfaces de usuário, regras de negócio e bancos de dados.',
          detalhe: 'Atuação em ambiente de desenvolvimento web em equipe focado em arquitetura Frontend e Backend.',
        },
        {
          id: 'ti4', ano: '2026', titulo: 'Módulo III do Senac Tec',
          resumo: 'Terceiro módulo do curso Senac Tec, com foco no desenvolvimento de aplicativos mobile, integrando a criação de interfaces móveis com serviços, consumo de APIs e gestão de dados.',
          detalhe: 'Desenvolvimento colaborativo de aplicativos móveis em equipe, cobrindo etapas de Frontend e Backend.',
        },
      ],
    },
    projetos: {
      eyebrow: 'O que eu construí',
      title: 'Projetos em Destaque',
      verProjeto: 'Ver Projeto →',
      lista: [
        { nome: 'Cuide+', desc: 'Site fictício de gerenciamento de psicólogos e pacientes.', cat: 'Web App' },
        { nome: 'Portal Turismo da Miku', desc: 'Agência de turismo fictícia inspirada na personagem e cantora Hatsune Miku (初音ミク).', cat: 'Web App' },
      ],
    },
    skills: {
      eyebrow: 'Meu arsenal',
      title: 'Skills & Tecnologias',
      proficiencia: 'Nível de Proficiência',
      ferramentas: 'Ferramentas & Stack',
      ctaLearn: 'Sempre aprendendo novas tecnologias e metodologias para entregar o melhor.',
    },
    contato: {
      eyebrow: 'Vamos conversar',
      title: 'Entre em Contato',
      quote: '"Adoro novos desafios! Seja um projeto pequeno ou com um, estou aqui para construir algo incrível juntos."',
      faleComigo: 'Fale Comigo',
    },
    footer: '✦ NEO frutiger aero — Cauã Cunha Neves © 2026',
  },
  en: {
    nav: {
      Hero: 'Home',
      Sobre: 'About',
      Trajetória: 'Journey',
      Projetos: 'Projects',
      Skills: 'Skills',
      Contato: 'Contact',
      cta: 'Contact me →',
    },
    hero: {
      badge: 'Design • Technology • Creativity',
      desc: 'Digital designs and experiences that blend futuristic aesthetics, functionality and purpose.',
      ctaProjetos: 'View projects →',
      ctaSobre: 'Learn more',
      miniStats: 'Elegant visuals  •  Quality delivery',
      scrollHint: '↓ Scroll to explore',
      features: [
        { label: 'Futuristic Design', sub: 'Modern aesthetics inspired by the Frutiger Aero look.' },
        { label: 'Technology & Performance', sub: 'Fast, responsive and optimized solutions.' },
        { label: 'Experience-Focused', sub: 'Intuitive interfaces that connect and make an impact.' },
        { label: 'Personalized', sub: 'Every project is unique, built for your goal.' },
      ],
    },
    sobre: {
      eyebrow: 'Who I am',
      title: 'A bit about me',
      nome: 'Cauã Cunha Neves',
      bio1: "Hi! My name is Cauã, I'm 19 years old, and I'm a developer passionate about building interfaces that blend aesthetics and function. I specialize in React, CSS animations and design systems with a focus on performance and accessibility.",
      bio2: "When I'm not coding, I'm exploring new designs, playing games or listening to lo-fi music while sipping coffee ☕",
      formacaoLabel: 'Education',
      formacaoSub: 'Technical Degree in IT',
      idiomasLabel: 'Languages',
      idiomasSub: 'PT-BR / EN',
      faTitle: 'What is Frutiger Aero?',
      faNome: 'Frutiger Aero',
      faTexto: 'Frutiger Aero is a design style that prevailed from the mid-2000s to the early 2010s. It originated in user interface design but later influenced various other media. It was named in 2017 by Sofi Xian of the Consumer Aesthetics Research Institute and resurfaced in 2023 as an internet aesthetic, becoming popular among Gen Z as an object of nostalgia and aesthetics, carrying the era\'s imagination of the future. Frutiger Aero art features optimistic themes of technology in harmony with nature and often includes nature imagery, vibrant colors and skeuomorphic elements.',
    },
    trajetoria: {
      eyebrow: 'How I got here',
      title: 'Education',
      eventos: [
        {
          id: 'ti1', ano: '2023 - 2025', titulo: 'Technical Degree in IT',
          resumo: 'A 2-year technical program focused on the full software development cycle, network infrastructure, and preventive/corrective computer maintenance.',
          detalhe: 'Hardware assembly and maintenance, network and server administration, software development.',
        },
        {
          id: 'ti2', ano: '2025', titulo: 'Senac Tec — Module I',
          resumo: 'First module of the Senac Tec course, focused on web application Frontend development, covering responsive interface building, code structuring and UI/UX best practices.',
          detalhe: 'Collaborative team-based web development and simulation of Frontend project routines.',
        },
        {
          id: 'ti3', ano: '2025', titulo: 'Senac Tec — Module II',
          resumo: 'Second module of the Senac Tec course, focused on full-stack engineering of web applications, covering end-to-end integration between user interfaces, business rules and databases.',
          detalhe: 'Team-based web development work focused on Frontend and Backend architecture.',
        },
        {
          id: 'ti4', ano: '2026', titulo: 'Senac Tec — Module III',
          resumo: 'Third module of the Senac Tec course, focused on mobile app development, integrating mobile interface creation with services, API consumption and data management.',
          detalhe: 'Collaborative team-based mobile app development, covering Frontend and Backend stages.',
        },
      ],
    },
    projetos: {
      eyebrow: 'What I built',
      title: 'Featured Projects',
      verProjeto: 'View Project →',
      lista: [
        { nome: 'Cuide+', desc: 'Fictional management site for psychologists and patients.', cat: 'Web App' },
        { nome: 'Miku Tourism Portal', desc: 'Fictional travel agency inspired by the character and singer Hatsune Miku (初音ミク).', cat: 'Web App' },
      ],
    },
    skills: {
      eyebrow: 'My arsenal',
      title: 'Skills & Technologies',
      proficiencia: 'Proficiency Level',
      ferramentas: 'Tools & Stack',
      ctaLearn: 'Always learning new technologies and methodologies to deliver the best.',
    },
    contato: {
      eyebrow: "Let's talk",
      title: 'Get in Touch',
      quote: '"I love new challenges! Whether it\'s a small project or a big one, I\'m here to build something amazing together."',
      faleComigo: 'Get in Touch',
    },
    footer: '✦ NEO frutiger aero — Cauã Cunha Neves © 2026',
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('pt-BR')
  const toggleLang = () => setLang(l => (l === 'pt-BR' ? 'en' : 'pt-BR'))
  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}

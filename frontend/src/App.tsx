import { createElement, useEffect, useState, type FormEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import nexusCubeImage from './assets/nexus-cube.png'
import nexusHeroImage from './assets/nexus-hero.png'
import nexusRacingImage from './assets/nexus-racing.png'
import nexusToyLabImage from './assets/nexus-toy-lab-scan.png'
import nexusVrArenaImage from './assets/nexus-vr-arena.png'
import nexusWandImage from './assets/nexus-wand.png'
import whiteLabelCubeImage from './assets/white-label-a-cube.png'
import whiteLabelKartImage from './assets/white-label-c-kart.png'
import whiteLabelWandImage from './assets/white-label-b-wand.png'

type Language = 'en' | 'pt'
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

function illuminateSurface(event: ReactPointerEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`)
  event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`)
}

function trackMagicCursor(event: ReactPointerEvent<HTMLElement>) {
  document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
  document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
}

const images = {
  hero: nexusHeroImage,
  cube: nexusCubeImage,
  wand: nexusWandImage,
  racing: nexusRacingImage,
  toy: nexusToyLabImage,
  vr: nexusVrArenaImage,
  lab: 'https://images.unsplash.com/photo-1599727277643-b0c9cfb7705d?auto=format&fit=crop&w=1600&q=86',
}

type TextProps = {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  children: ReactNode
}

function Text({ as = 'p', className = '', children }: TextProps) {
  const Component = as
  return <Component className={className}>{children}</Component>
}

function Link({
  href,
  className = '',
  children,
  onClick,
  ariaLabel,
}: {
  href: string
  className?: string
  children: ReactNode
  onClick?: () => void
  ariaLabel?: string
}) {
  return createElement('a', {
    href,
    className,
    onClick,
    'aria-label': ariaLabel,
    children,
  })
}

function IconButton({
  className,
  label,
  expanded,
  onClick,
  children,
}: {
  className: string
  label: string
  expanded: boolean
  onClick: () => void
  children: ReactNode
}) {
  return createElement('button', {
    type: 'button',
    className,
    'aria-label': label,
    'aria-expanded': expanded,
    onClick,
    children,
  })
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d={diagonal ? 'M5 19 19 5M8 5h11v11' : 'M5 12h14M14 7l5 5-5 5'} />
    </svg>
  )
}

function SocialIcon({ name }: { name: 'instagram' | 'linkedin' | 'behance' }) {
  if (name === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.8" r=".8" className="social-icon__fill" />
      </svg>
    )
  }
  if (name === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.5 9.5v9M5.5 6.2v.1M10 18.5v-9M10 13.4c.8-2.6 6.8-3.3 6.8 1.3v3.8M16.8 14.7v3.8" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6.5h6.2c3 0 4.5 1.3 4.5 3.3 0 1.4-.8 2.4-2 2.8 1.6.4 2.7 1.5 2.7 3.2 0 2.2-1.7 3.7-4.8 3.7H4v-13Zm3 2.4v2.7h3c1.1 0 1.7-.5 1.7-1.4s-.6-1.3-1.7-1.3H7Zm0 5v3.2h3.4c1.3 0 2-.6 2-1.6s-.7-1.6-2-1.6H7ZM17 8h4" />
    </svg>
  )
}

function ButtonLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'light'
}) {
  return (
    <Link href={href} className={`button button--${variant}`}>
      <span>{children}</span>
      <Arrow diagonal />
    </Link>
  )
}

function ActionButton({
  className,
  children,
  onClick,
  type = 'button',
  disabled = false,
}: {
  className: string
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}) {
  return createElement('button', { type, className, onClick, disabled, children })
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`section-label ${light ? 'section-label--light' : ''}`}>
      <span className="section-label__dot" />
      <Text as="span">{children}</Text>
    </div>
  )
}

const experiences = [
  {
    id: '01',
    name: 'Nexus Cube',
    tagline: 'Touch the digital world.',
    taglinePt: 'Toque o mundo digital.',
    tags: ['Interactive object', 'Sensors', 'Games'],
    tagsPt: ['Objeto interativo', 'Sensores', 'Jogos'],
    image: images.cube,
    tone: 'cyan',
  },
  {
    id: '02',
    name: 'Nexus Wand',
    tagline: 'Control the environment.',
    taglinePt: 'Controle o ambiente.',
    tags: ['Motion', 'BLE + IR', 'Interactive scenery'],
    tagsPt: ['Movimento', 'BLE + IR', 'Cenário interativo'],
    image: images.wand,
    tone: 'violet',
  },
  {
    id: '03',
    name: 'Nexus Racing',
    tagline: 'Drive the real world.',
    taglinePt: 'Pilote o mundo real.',
    tags: ['RC', 'Racing', 'Physical + digital'],
    tagsPt: ['RC', 'Corrida', 'Físico + digital'],
    image: images.racing,
    tone: 'orange',
  },
  {
    id: '04',
    name: 'Nexus Toy Lab',
    tagline: 'Become a toy.',
    taglinePt: 'Transforme-se em um toy.',
    tags: ['3D scan', 'Customization', '3D printing'],
    tagsPt: ['Escaneamento 3D', 'Personalização', 'Impressão 3D'],
    image: images.toy,
    tone: 'pink',
  },
  {
    id: '05',
    name: 'Nexus VR Arena',
    tagline: 'Step inside the story.',
    taglinePt: 'Entre na história.',
    tags: ['VR', 'Free roam', 'Multiplayer'],
    tagsPt: ['VR', 'Livre movimento', 'Multiplayer'],
    image: images.vr,
    tone: 'cyan',
  },
]

function ExperienceCard({ experience, featured = false, language }: { experience: (typeof experiences)[0]; featured?: boolean; language: Language }) {
  const portuguese = language === 'pt'
  return (
    <article
      className={`experience-card interactive-surface experience-card--${experience.tone} ${featured ? 'experience-card--featured' : ''}`}
      onPointerMove={illuminateSurface}
    >
      <div className="experience-card__image">
        <img src={experience.image} alt={portuguese ? `Visual imersivo de ${experience.name}` : `Immersive visual for ${experience.name}`} />
        <div className="experience-card__scan" />
        <span className="experience-card__number">{experience.id}</span>
        <Link href="#contact" className="round-link" ariaLabel={portuguese ? `Conheça ${experience.name}` : `Discover ${experience.name}`}>
          <Arrow diagonal />
        </Link>
      </div>
      <div className="experience-card__body">
        <div>
          <Text as="h3">{experience.name}</Text>
          <Text>{portuguese ? experience.taglinePt : experience.tagline}</Text>
        </div>
        <div className="tag-list">
          {(portuguese ? experience.tagsPt : experience.tags).map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

const projects = [
  { title: 'Kinetic Lightscape', type: 'Physical digital installation', typePt: 'Instalação físico-digital', image: images.cube, status: 'Prototype', statusPt: 'Protótipo' },
  { title: 'Parallel Tracks', type: 'Interactive racing experience', typePt: 'Experiência de corrida interativa', image: images.racing, status: 'Nexus Original', statusPt: 'Original Nexus' },
  { title: 'Worlds Within', type: 'Immersive VR experience', typePt: 'Experiência imersiva em VR', image: images.vr, status: 'In development', statusPt: 'Em desenvolvimento' },
]

const pipeline = ['Concept', 'Design', 'Prototype', 'Engineering', 'Content', 'Production', 'Installation', 'Operation']

const capabilities = [
  'Software Development', 'Game Development', 'Electronics', 'IoT + Sensors',
  'VR / AR', '3D Printing', '3D Scanning', 'Industrial Design',
  'Prototyping', 'Digital Fabrication',
]

const prototypeVideos = [
  {
    title: 'Nexus Cube / Interaction Test',
    titlePt: 'Nexus Cube / Teste de Interação',
    phase: 'Functional prototype',
    phasePt: 'Protótipo funcional',
    duration: '00:48',
    poster: images.cube,
    source: '',
  },
  {
    title: 'Nexus Racing / Track Study',
    titlePt: 'Nexus Racing / Estudo de Pista',
    phase: 'Engineering test',
    phasePt: 'Teste de engenharia',
    duration: '01:12',
    poster: images.racing,
    source: '',
  },
  {
    title: 'Nexus VR / Multiplayer Test',
    titlePt: 'Nexus VR / Teste Multiplayer',
    phase: 'Experience test',
    phasePt: 'Teste de experiência',
    duration: '00:56',
    poster: images.vr,
    source: '',
  },
]

function PrototypeVideo({
  video,
  language,
  featured,
}: {
  video: (typeof prototypeVideos)[0]
  language: Language
  featured?: boolean
}) {
  const portuguese = language === 'pt'
  return (
    <article
      className={`prototype-video interactive-surface ${featured ? 'prototype-video--featured' : ''}`}
      onPointerMove={illuminateSurface}
    >
      <div className="prototype-video__media">
        {video.source ? (
          <video controls preload="metadata" poster={video.poster}>
            <source src={video.source} />
          </video>
        ) : (
          <img src={video.poster} alt={portuguese ? `Capa do vídeo ${video.titlePt}` : `Video cover for ${video.title}`} />
        )}
        <div className="prototype-video__overlay" />
        {!video.source && (
          <div className="prototype-video__play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="m9 7 8 5-8 5V7Z" /></svg>
          </div>
        )}
        <span className="prototype-video__duration">{video.duration}</span>
        {!video.source && <span className="prototype-video__status">{portuguese ? 'Espaço para vídeo' : 'Video ready slot'}</span>}
      </div>
      <div className="prototype-video__info">
        <Text as="h3">{portuguese ? video.titlePt : video.title}</Text>
        <span>{portuguese ? video.phasePt : video.phase}</span>
      </div>
    </article>
  )
}

function Logo() {
  return (
    <Link href="#top" className="logo" ariaLabel="Nexus Lab home">
      <svg viewBox="0 0 34 34" aria-hidden="true">
        <path d="M3 3h11v11H3zM20 3h11v11H20zM3 20h11v11H3z" />
        <path className="logo__accent" d="m20 20 11 11M31 20 20 31" />
      </svg>
      <span>NEXUS LAB</span>
    </Link>
  )
}

function LanguageSwitch({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  return (
    <div className="language-switch" aria-label="Language selector">
      {(['en', 'pt'] as Language[]).map((item) =>
        createElement('button', {
          type: 'button',
          key: item,
          className: language === item ? 'is-active' : '',
          'aria-pressed': language === item,
          onClick: () => onChange(item),
          children: item.toUpperCase(),
        }),
      )}
    </div>
  )
}

function ContactField({
  label,
  name,
  placeholder,
  kind = 'input',
  required = false,
  options = [],
}: {
  label: string
  name: string
  placeholder: string
  kind?: 'input' | 'email' | 'select' | 'textarea'
  required?: boolean
  options?: string[]
}) {
  const common = {
    id: name,
    name,
    required,
    'aria-required': required,
  }
  const control = kind === 'textarea'
    ? createElement('textarea', { ...common, placeholder, rows: 4 })
    : kind === 'select'
      ? createElement('select', { ...common, defaultValue: '' }, [
          createElement('option', { value: '', disabled: true, key: 'placeholder' }, placeholder),
          ...options.map((option) => createElement('option', { value: option, key: option }, option)),
        ])
      : createElement('input', { ...common, type: kind === 'email' ? 'email' : 'text', placeholder, autoFocus: name === 'name' })

  return (
    <label className={`contact-field ${kind === 'textarea' ? 'contact-field--wide' : ''}`} htmlFor={name}>
      <span>{label}{required && <b> *</b>}</span>
      {control}
    </label>
  )
}

function ContactModal({
  language,
  status,
  onClose,
  onSubmit,
}: {
  language: Language
  status: SubmitStatus
  onClose: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  const portuguese = language === 'pt'
  const tr = (english: string, portugueseText: string) => portuguese ? portugueseText : english
  const interests = portuguese
    ? ['Experiência interativa', 'Nexus Cube', 'Nexus Wand', 'Nexus Kart', 'White Label', 'Outro']
    : ['Interactive experience', 'Nexus Cube', 'Nexus Wand', 'Nexus Kart', 'White Label', 'Other']

  return (
    <div className="contact-modal__backdrop" onMouseDown={onClose}>
      <section
        className={`contact-modal ${status === 'success' ? 'contact-modal--success' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <ActionButton className="contact-modal__close" onClick={onClose}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">{tr('Close', 'Fechar')}</span>
        </ActionButton>

        {status === 'success' ? (
          <div className="contact-success">
            <div className="contact-success__icon">
              <svg viewBox="0 0 32 32" aria-hidden="true"><path d="m8 16.5 5 5L24 10" /></svg>
            </div>
            <SectionLabel>{tr('Request received', 'Solicitação recebida')}</SectionLabel>
            <Text as="h2" className="contact-modal__title" >{tr('We received your project.', 'Recebemos seu projeto.')}</Text>
            <Text className="contact-modal__description">
              {tr(
                'Thank you for contacting us. Your request has been saved successfully.',
                'Obrigado pelo contato. Sua solicitação foi registrada com sucesso.',
              )}
            </Text>
            <ActionButton className="contact-submit contact-submit--close" onClick={onClose}>
              <span>{tr('Close', 'Fechar')}</span>
              <Arrow />
            </ActionButton>
          </div>
        ) : (
          <>
            <SectionLabel>{tr('Commercial contact', 'Contato comercial')}</SectionLabel>
            <Text as="h2" className="contact-modal__title" >{tr("Let's create something together.", 'Vamos criar algo juntos.')}</Text>
            <Text className="contact-modal__description">
              {tr(
                'Tell us how we can contact you. Our commercial team will review your request and get back to you soon.',
                'Conte como podemos entrar em contato com você. Nosso time comercial vai analisar sua solicitação e retornar em breve.',
              )}
            </Text>
            <form className="contact-form" onSubmit={onSubmit}>
              <ContactField label={tr('Name', 'Nome')} name="name" placeholder={tr('Your name', 'Seu nome')} />
              <ContactField label={tr('Professional email', 'E-mail profissional')} name="email" kind="email" placeholder="voce@empresa.com" required />
              <ContactField label={tr('Company / Brand', 'Empresa / Marca')} name="company" placeholder={tr('Company name', 'Nome da empresa')} />
              <ContactField label={tr("I'm interested in", 'Tenho interesse em')} name="interest" kind="select" placeholder={tr('Select an option', 'Selecione uma opção')} options={interests} />
              <ContactField
                label={tr('Briefly tell us your idea', 'Conte brevemente sua ideia')}
                name="idea"
                kind="textarea"
                placeholder={tr('Event, shopping center, brand activation, installation, custom project...', 'Evento, shopping, ativação de marca, instalação, projeto personalizado...')}
              />
              <ActionButton className="contact-submit" type="submit" disabled={status === 'loading'}>
                <span>{status === 'loading' ? tr('Sending...', 'Enviando...') : import.meta.env.PROD && !import.meta.env.VITE_API_URL ? tr('Open email', 'Abrir e-mail') : tr('Send request', 'Enviar solicitação')}</span>
                {status === 'loading' ? <i className="contact-submit__loader" /> : <Arrow />}
              </ActionButton>
              {status === 'error' && <p role="alert">{tr('Unable to send your request. Please try again.', 'Não foi possível enviar sua solicitação. Tente novamente.')}</p>}
              <Text className="contact-form__legal">
                {tr(
                  'By submitting, you agree that Nexus Lab may contact you about this request.',
                  'Ao enviar, você concorda que a Nexus Lab entre em contato sobre esta solicitação.',
                )}
              </Text>
            </form>
          </>
        )}
      </section>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('nexus-language')
    return saved === 'pt' ? 'pt' : 'en'
  })
  const portuguese = language === 'pt'
  const tr = (english: string, portugueseText: string) => portuguese ? portugueseText : english
  const nav = ['Experiences', 'Projects', 'White Label', 'Lab', 'About']
  const navPt = ['Experiências', 'Projetos', 'White Label', 'Lab', 'Sobre']

  useEffect(() => {
    localStorage.setItem('nexus-language', language)
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
  }, [language])

  useEffect(() => {
    if (!contactOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setContactOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [contactOpen])

  const openContact = () => {
    setMenuOpen(false)
    setSubmitStatus('idle')
    setContactOpen(true)
  }

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitStatus === 'loading') return
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries())
    const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
    if (import.meta.env.PROD && !base) {
      const body = [
        `Nome / Name: ${payload.name || ''}`,
        `Email: ${payload.email || ''}`,
        `Empresa / Company: ${payload.company || ''}`,
        `Interesse / Interest: ${payload.interest || ''}`,
        '',
        String(payload.idea || ''),
      ].join('\n')
      window.location.href = `mailto:hello@nexuslab.com?subject=${encodeURIComponent('Projeto Nexus Lab')}&body=${encodeURIComponent(body)}`
      return
    }
    setSubmitStatus('loading')
    try {
      const response = await fetch(`${base}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Contact request failed')
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <main id="top" onPointerMove={trackMagicCursor}>
      <div className="magic-cursor" aria-hidden="true">
        <i />
        <i />
        <i />
        <span />
      </div>
      <header className="navbar">
        <Logo />
        <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Main navigation">
          {nav.map((item, index) => (
            <Link href={`#${item.toLowerCase().replace(' ', '-')}`} key={item} onClick={() => setMenuOpen(false)}>
              {portuguese ? navPt[index] : item}
            </Link>
          ))}
          <ActionButton className="button button--primary mobile-contact-action" onClick={openContact}>
            <span>{tr('Start a project', 'Iniciar um projeto')}</span>
            <Arrow diagonal />
          </ActionButton>
        </nav>
        <LanguageSwitch language={language} onChange={setLanguage} />
        <ActionButton className="button button--primary" onClick={openContact}>
          <span>{tr('Start a project', 'Iniciar um projeto')}</span>
          <Arrow diagonal />
        </ActionButton>
        <IconButton
          className={`menu-toggle ${menuOpen ? 'menu-toggle--open' : ''}`}
          label={tr('Toggle navigation', 'Abrir ou fechar navegação')}
          expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </IconButton>
      </header>

      {contactOpen && (
        <ContactModal
          language={language}
          status={submitStatus}
          onClose={() => setContactOpen(false)}
          onSubmit={submitContact}
        />
      )}

      <section className="hero">
        <img className="hero__image" src={images.hero} alt="People exploring an immersive digital environment" />
        <div className="hero__veil" />
        <div className="hero__grid" />
        <div className="hero__content">
          <SectionLabel light>Nexus Lab / {tr('Interactive Experiences', 'Experiências Interativas')}</SectionLabel>
          <Text as="h1">{tr('We build experiences', 'Criamos experiências')}<br />{tr('people can', 'que as pessoas podem')} <em>{tr('touch.', 'tocar.')}</em></Text>
          <div className="hero__bottom">
            <Text>{tr('Technology, play and physical spaces connected through interactive experiences.', 'Tecnologia, entretenimento e espaços físicos conectados por experiências interativas.')}</Text>
            <div className="hero__actions">
              <ButtonLink href="#experiences">{tr('Explore experiences', 'Explorar experiências')}</ButtonLink>
              <ButtonLink href="#contact" variant="light">{tr('Start a project', 'Iniciar um projeto')}</ButtonLink>
            </div>
          </div>
        </div>
        <div className="hero__status">
          <span>São Paulo — BR</span>
          <span className="pulse"><i /> {tr('Systems online', 'Sistemas online')}</span>
          <span>{tr('Scroll to explore', 'Role para explorar')} ↓</span>
        </div>
      </section>

      <section className="manifesto" id="about">
        <div className="manifesto__intro">
          <SectionLabel>{tr('Physical × Digital', 'Físico × Digital')}</SectionLabel>
          <Text as="h2">{tr('Where physical', 'Onde o mundo real')}<br />{tr('meets', 'encontra a')} <em>{tr('digital.', 'tecnologia.')}</em></Text>
          <Text className="manifesto__copy">
            {tr('We combine software, electronics, game development, fabrication and immersive technologies to create experiences people remember.', 'Combinamos software, eletrônica, desenvolvimento de jogos, fabricação e tecnologias imersivas para criar experiências que as pessoas lembram.')}
          </Text>
        </div>
        <div className="nexus-diagram interactive-surface" onPointerMove={illuminateSurface}>
          <div className="nexus-diagram__orbit nexus-diagram__orbit--one" />
          <div className="nexus-diagram__orbit nexus-diagram__orbit--two" />
          <div className="nexus-diagram__core">
            <span>{tr('PHYSICAL', 'FÍSICO')}</span>
            <b>×</b>
            <span>DIGITAL</span>
          </div>
          {(portuguese ? ['Software', 'Hardware', 'Sensores', 'Jogos', 'VR', 'Fabricação', 'Interação'] : ['Software', 'Hardware', 'Sensors', 'Games', 'VR', 'Fabrication', 'Interaction']).map((item, index) => (
            <span className={`nexus-diagram__item nexus-diagram__item--${index + 1}`} key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="experiences section-pad" id="experiences">
        <div className="section-heading">
          <div>
            <SectionLabel>{tr('Our experiences', 'Nossas experiências')}</SectionLabel>
            <Text as="h2">{tr('A library of', 'Uma biblioteca de')}<br /><em>{tr('new worlds.', 'novos mundos.')}</em></Text>
          </div>
          <Text>{tr('A growing collection of interactive products ready to become unforgettable spaces.', 'Uma coleção crescente de produtos interativos prontos para se transformar em espaços inesquecíveis.')}</Text>
        </div>
        <div className="experience-grid">
          {experiences.map((experience, index) => (
            <ExperienceCard experience={experience} featured={index === 0 || index === 3} language={language} key={experience.name} />
          ))}
        </div>
      </section>

      <section className="platform">
        <div className="platform__header">
          <SectionLabel light>{tr('Nexus core system', 'Sistema Nexus Core')}</SectionLabel>
          <Text as="h2">{tr('One platform.', 'Uma plataforma.')}<br /><em>{tr('Endless worlds.', 'Mundos infinitos.')}</em></Text>
          <Text>{tr('The technology stays. The universe changes.', 'A tecnologia permanece. O universo muda.')}</Text>
        </div>
        <div className="platform__system interactive-surface" onPointerMove={illuminateSurface}>
          <div className="system-console">
            <span><i /> Nexus network</span>
            <span>CORE.OS / 01</span>
            <span>{tr('Live signal map', 'Mapa de sinais ao vivo')}</span>
          </div>
          <svg className="system-wiring" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="wireGradient" x1="0" x2="1">
                <stop offset="0" stopColor="#8B5CF6" />
                <stop offset=".52" stopColor="#00D5FF" />
                <stop offset="1" stopColor="#FF6A00" />
              </linearGradient>
              <filter id="wireGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path className="wire wire--main" d="M250 280 H460 H730" />
            <path className="wire wire--branch" d="M730 280 C790 280 780 110 855 110 H1120" />
            <path className="wire wire--branch" d="M730 280 H855 H1120" />
            <path className="wire wire--branch" d="M730 280 C790 280 780 450 855 450 H1120" />
            <path className="wire wire--pulse" d="M250 280 H460 H730 C790 280 780 110 855 110 H1120" />
            <path className="wire wire--pulse wire--pulse-two" d="M250 280 H460 H730 C790 280 780 450 855 450 H1120" />
          </svg>
          <span className="flow-signal flow-signal--one" />
          <span className="flow-signal flow-signal--two" />
          <span className="flow-signal flow-signal--three" />
          <div className="core-node">
            <span className="core-node__ring" />
            <span className="core-node__ring core-node__ring--two" />
            <span className="core-node__energy" />
            <div className="core-node__ports" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, index) => <i key={index} />)}
            </div>
            <Text as="h3">NEXUS<br />CORE</Text>
            <span>v.01 / {tr('modular', 'modular')}</span>
          </div>
          <div className="system-line"><i /></div>
          <div className="system-stack">
            {(portuguese ? ['Hardware', 'Software', 'Interação', 'Game engine', 'Sensores'] : ['Hardware', 'Software', 'Interaction', 'Game engine', 'Sensors']).map((item, index) => (
              <div key={item}><span>0{index + 1}</span><b>{item}</b><i /><em>{tr('linked', 'conectado')}</em></div>
            ))}
          </div>
          <div className="worlds-grid">
            {(portuguese ? ['ESPAÇO', 'MAGIA', 'CORRIDA', 'KIDS', 'MARCAS', 'ENTRETENIMENTO'] : ['SPACE', 'MAGIC', 'RACING', 'KIDS', 'BRANDS', 'ENTERTAINMENT']).map((item) => (
              <div key={item}><span>{item}</span><i className="world-status" /><Arrow diagonal /><small>CORE LINK</small></div>
            ))}
          </div>
        </div>
      </section>

      <section className="white-label section-pad" id="white-label">
        <div className="white-label__copy">
          <SectionLabel>White label</SectionLabel>
          <Text as="h2">{tr('Your brand.', 'Sua marca.')}<br /><em>{tr('Our technology.', 'Nossa tecnologia.')}</em></Text>
          <Text>{tr('Our experiences can become part of your universe — from interface and content to hardware and scenery.', 'Nossas experiências podem fazer parte do seu universo — da interface e conteúdo ao hardware e à cenografia.')}</Text>
          <ButtonLink href="#contact" variant="secondary">{tr('Explore white label', 'Explorar white label')}</ButtonLink>
        </div>
        <div className="brand-flow interactive-surface" onPointerMove={illuminateSurface}>
          <div className="brand-flow__source">
            <span>{tr('Original Nexus', 'Original Nexus')}</span>
            <b>N</b>
          </div>
          <div className="brand-flow__line"><i /><i /><i /></div>
          <div className="brand-flow__variants">
            {[
              ['A', whiteLabelCubeImage, 'Nexus Cube'],
              ['B', whiteLabelWandImage, 'Nexus Wand'],
              ['C', whiteLabelKartImage, 'Nexus Kart'],
            ].map(([letter, image, name]) => (
              <div key={letter}>
                <img src={image} alt={`${name} white label`} />
                <b>{letter}</b>
                <span>{name}</span>
              </div>
            ))}
          </div>
          <div className="customizable">
            {(portuguese ? ['Hardware', 'Software', 'Conteúdo', 'Interface', 'Narrativa', 'Cenografia'] : ['Hardware', 'Software', 'Content', 'Interface', 'Narrative', 'Scenography']).map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="projects section-pad" id="projects">
        <div className="section-heading section-heading--light">
          <div>
            <SectionLabel light>{tr('Selected projects', 'Projetos selecionados')} / 2026</SectionLabel>
            <Text as="h2">{tr('Ideas made', 'Ideias que se tornam')}<br /><em>{tr('real.', 'reais.')}</em></Text>
          </div>
          <Text>{tr('Nexus Originals and experiments at the edge of technology, play and space.', 'Originais Nexus e experimentos na fronteira entre tecnologia, entretenimento e espaço.')}</Text>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project-card interactive-surface" onPointerMove={illuminateSurface} key={project.title}>
              <div className="project-card__meta">
                <span>0{index + 1}</span>
                <span>{portuguese ? project.statusPt : project.status}</span>
              </div>
              <div className="project-card__image"><img src={project.image} alt="" /></div>
              <div className="project-card__title">
                <Text as="h3">{project.title}</Text>
                <span>{portuguese ? project.typePt : project.type}</span>
                <Arrow diagonal />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="prototype-films section-pad" id="prototype-films">
        <div className="section-heading">
          <div>
            <SectionLabel>{tr('Prototype films', 'Vídeos de protótipos')}</SectionLabel>
            <Text as="h2">{tr('See ideas', 'Veja as ideias')}<br /><em>{tr('in motion.', 'em movimento.')}</em></Text>
          </div>
          <Text>{tr('A space for tests, works in progress and the real moments when technology becomes an experience.', 'Um espaço para testes, processos e os momentos reais em que a tecnologia se transforma em experiência.')}</Text>
        </div>
        <div className="prototype-films__grid">
          {prototypeVideos.map((video, index) => (
            <PrototypeVideo video={video} language={language} featured={index === 0} key={video.title} />
          ))}
        </div>
        <div className="prototype-films__note">
          <span>MP4 / WEBM</span>
          <Text>{tr('Slots prepared for final prototype videos.', 'Slots preparados para receber os vídeos finais dos protótipos.')}</Text>
        </div>
      </section>

      <section className="process section-pad">
        <SectionLabel>{tr('Custom projects', 'Projetos personalizados')}</SectionLabel>
        <div className="process__heading">
          <Text as="h2">{tr('From idea', 'Da ideia')}<br />{tr('to', 'à')} <em>{tr('experience.', 'experiência.')}</em></Text>
          <Text>{tr('One integrated team, from first sketch to daily operation.', 'Uma equipe integrada, do primeiro esboço à operação diária.')}</Text>
        </div>
        <div className="pipeline">
          {(portuguese ? ['Conceito', 'Design', 'Protótipo', 'Engenharia', 'Conteúdo', 'Produção', 'Instalação', 'Operação'] : pipeline).map((step, index) => (
            <div className="pipeline__step" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <b>{step}</b>
              <i />
            </div>
          ))}
        </div>
      </section>

      <section className="built-for section-pad">
        <SectionLabel>{tr('Built for', 'Criado para')}</SectionLabel>
        <Text as="h2">{tr('Made to live', 'Feito para existir')}<br /><em>{tr('in the real world.', 'no mundo real.')}</em></Text>
        <div className="audience-grid">
          {(portuguese ? ['Shopping Centers', 'Marcas', 'Eventos', 'Exposições', 'Entretenimento', 'Educação', 'Museus', 'Varejo'] : ['Shopping Centers', 'Brands', 'Events', 'Exhibitions', 'Entertainment', 'Education', 'Museums', 'Retail']).map((item, index) => (
            <div className="interactive-surface" onPointerMove={illuminateSurface} key={item}><span>0{index + 1}</span><Text as="h3">{item}</Text><Arrow diagonal /></div>
          ))}
        </div>
      </section>

      <section className="lab section-pad" id="lab">
        <div className="lab__image">
          <img src={images.lab} alt={tr('Precision hardware in the Nexus Lab', 'Hardware de precisão no Nexus Lab')} />
          <div className="lab__reticle"><span /><span /></div>
          <span className="lab__caption">{tr('Prototype scan', 'Scan de protótipo')} / 0042</span>
        </div>
        <div className="lab__content">
          <SectionLabel light>{tr('Inside the lab', 'Dentro do laboratório')}</SectionLabel>
          <Text as="h2">{tr('Built by', 'Construído por')}<br /><em>{tr('many disciplines.', 'muitas disciplinas.')}</em></Text>
          <div className="capability-map">
            {(portuguese ? ['Desenvolvimento de Software', 'Desenvolvimento de Jogos', 'Eletrônica', 'IoT + Sensores', 'VR / AR', 'Impressão 3D', 'Escaneamento 3D', 'Design Industrial', 'Prototipagem', 'Fabricação Digital'] : capabilities).map((item, index) => (
              <div key={item} className={index % 3 === 0 ? 'capability-map__item--accent' : ''}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <b>{item}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="work section-pad">
        <div className="section-heading">
          <div><SectionLabel>{tr('Work with us', 'Trabalhe conosco')}</SectionLabel><Text as="h2">{tr('Choose how', 'Escolha como')}<br />{tr('we', 'vamos')} <em>{tr('build.', 'criar.')}</em></Text></div>
          <Text>{tr('From a proven product to an entirely original attraction.', 'De um produto já validado a uma atração totalmente original.')}</Text>
        </div>
        <div className="work-grid">
          {(portuguese ? [
            ['01', 'Experiência Pronta', 'Uma experiência Nexus existente, adaptada ao seu evento ou espaço.'],
            ['02', 'White Label', 'Nossa tecnologia, desenhada para viver dentro do universo da sua marca.'],
            ['03', 'Projeto Personalizado', 'Uma experiência interativa exclusiva, desenvolvida do zero.'],
            ['04', 'Atração Original', 'Criação, instalação e operação de uma atração completa.'],
          ] : [
            ['01', 'Ready Experience', 'An existing Nexus experience, adapted to your event or space.'],
            ['02', 'White Label', 'Our technology, designed to live inside your brand universe.'],
            ['03', 'Custom Project', 'An exclusive interactive experience, developed from zero.'],
            ['04', 'Original Attraction', 'Creation, installation and operation of a complete attraction.'],
          ]).map(([num, title, copy]) => (
            <article className="interactive-surface" onPointerMove={illuminateSurface} key={title}>
              <span>{num}</span>
              <Text as="h3">{title}</Text>
              <Text>{copy}</Text>
              <Arrow diagonal />
            </article>
          ))}
        </div>
        <Text className="work__note">{tr('Revenue share models available for selected projects.', 'Modelos de revenue share disponíveis para projetos selecionados.')}</Text>
      </section>

      <section className="contact" id="contact">
        <div className="contact__orb" />
        <SectionLabel light>{tr('Start a project', 'Inicie um projeto')}</SectionLabel>
        <Text as="h2">{tr("Let's build", 'Vamos criar')}<br />{tr('something people', 'algo que as pessoas')}<br /><em>{tr('remember.', 'lembrem.')}</em></Text>
        <div className="contact__bottom">
          <Text>{tr('Tell us what you want people to experience.', 'Conte o que você quer que as pessoas experimentem.')}</Text>
          <ButtonLink href="mailto:hello@nexuslab.com">hello@nexuslab.com</ButtonLink>
        </div>
      </section>

      <footer>
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <Text>{tr('Physical experiences connected to digital.', 'Experiências físicas conectadas ao digital.')}</Text>
          </div>
          <div className="footer__manifesto">
            <span>Manifesto / Nexus Lab</span>
            <Text as="h2">{tr('Where the real world meets technology.', 'Onde o mundo real encontra a tecnologia.')}</Text>
          </div>
          <div className="footer__navigation">
            <span>{tr('Explore', 'Navegue')}</span>
            <div className="footer__links">
              {(portuguese
                ? [['Experiências', '#experiences'], ['White Label', '#white-label'], ['Sobre', '#about'], ['Projetos', '#projects'], ['Lab', '#lab'], ['Contato', '#contact']]
                : [['Experiences', '#experiences'], ['White Label', '#white-label'], ['About', '#about'], ['Projects', '#projects'], ['Lab', '#lab'], ['Contact', '#contact']]
              ).map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2025 Nexus Lab</span>
          <span>{tr('Interactive Experiences', 'Experiências Interativas')}</span>
          <div className="footer__socials">
            <Link href="#instagram" ariaLabel="Instagram"><SocialIcon name="instagram" /><span>Instagram</span></Link>
            <Link href="#linkedin" ariaLabel="LinkedIn"><SocialIcon name="linkedin" /><span>LinkedIn</span></Link>
            <Link href="#behance" ariaLabel="Behance"><SocialIcon name="behance" /><span>Behance</span></Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App

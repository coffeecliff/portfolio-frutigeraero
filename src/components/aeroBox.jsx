import './aeroBox.css'

/**
 * AeroBox — Frutiger Aero style box component
 *
 * Props:
 *   label       string   — primary text
 *   sub         string   — secondary/description text (optional)
 *   icon        node     — React node for the icon slot (optional)
 *   variant     'sky' | 'aqua' | 'forest' | 'aurora' | 'glass'  (default: 'sky')
 *   size        'sm' | 'md' | 'lg' | 'xl'                        (default: 'md')
 *   badge       string   — optional badge text
 *   badgeColor  string   — CSS color for badge dot
 *   onClick     fn       — makes the box interactive
 *   className   string   — extra classes
 *   style       object   — inline style overrides
 */

export function AeroBox({
  label,
  sub,
  icon,
  variant = 'sky',
  size = 'md',
  badge,
  badgeColor,
  onClick,
  className = '',
  style,
  children,
}) {
  const sizeClass = size !== 'md' ? `aero-box-${size}` : ''
  const variantClass = variant ? `aero-box--${variant}` : ''
  const classes = ['aero-box', variantClass, sizeClass, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
    >
      {icon && <div className="aero-box-icon">{icon}</div>}

      <div className="aero-box-body">
        {badge && (
          <span className="aero-badge" style={{ marginBottom: 4 }}>
            {badgeColor && (
              <span className="aero-badge-dot" style={{ color: badgeColor }} />
            )}
            {badge}
          </span>
        )}
        {label && <span className="aero-box-label">{label}</span>}
        {sub && <span className="aero-box-sub">{sub}</span>}
        {children}
      </div>
    </div>
  )
}

/**
 * AeroPanel — grouped container with glassy background or AeroBox style
 *
 * Props:
 * title        string   — panel heading (optional)
 * titleTheme   'dark' | 'light' — forces light or dark text theme for the title
 * useBoxStyle  boolean  — if true, applies AeroBox style without mouse hover
 * variant      'sky' | 'aqua' | 'forest' | 'aurora' | 'glass'  (only if useBoxStyle is true)
 * size         'sm' | 'md' | 'lg' | 'xl'                       (only if useBoxStyle is true)
 */
export function AeroPanel({ 
  title, 
  titleTheme,
  useBoxStyle = false, 
  variant = 'sky', 
  size = 'md', 
  className = '', 
  style, 
  children 
}) {
  // Constrói as classes condicionalmente caso useBoxStyle seja ativo
  const boxStyleClass = useBoxStyle ? 'aero-panel--box' : ''
  const sizeClass = useBoxStyle && size !== 'md' ? `aero-box-${size}` : ''
  const variantClass = useBoxStyle && variant ? `aero-box--${variant}` : ''

  const combinedClasses = [
    'aero-panel', 
    boxStyleClass, 
    variantClass, 
    sizeClass, 
    className
  ].filter(Boolean).join(' ')

  // Define o tema automático se não for passado explicitamente via prop
  // Se for estilo 'glass' ou painel padrão transparente -> Título Escuro. Outros -> Título Claro.
  const resolvedTitleTheme = titleTheme || (useBoxStyle && variant !== 'glass' ? 'light' : 'dark')
  const titleThemeClass = `aero-panel-title--${resolvedTitleTheme}`

  return (
    <div className={combinedClasses} style={style}>
      {title && (
        <p className={`aero-panel-title ${titleThemeClass}`}>
          {title}
        </p>
      )}
      {children}
    </div>
  )
}

/**
 * AeroGrid — responsive grid wrapper
 * cols: 'auto' | 2 | 3
 */
export function AeroGrid({ cols = 'auto', gap, className = '', style, children }) {
  const gridClass =
    cols === 2 ? 'aero-grid aero-grid-2'
    : cols === 3 ? 'aero-grid aero-grid-3'
    : 'aero-grid'

  return (
    <div
      className={`${gridClass} ${className}`}
      style={{ gap: gap ?? undefined, ...style }}
    >
      {children}
    </div>
  )
}

/**
 * AeroBtn — Frutiger Aero glassy pill button
 */
export function AeroBtn({ children, variant = 'sky', onClick, className = '', style }) {
  return (
    <button
      type="button"
      className={`aero-btn ${variant !== 'sky' ? `aero-btn--${variant}` : ''} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  )
}



// Bolhas estilo "lava lamp" turquesa, para as extremidades da hero-bg
const BUBBLE_SEEDS = [
  { size: 48, left: 8, duration: 30, delay: 0 },
  { size: 28, left: 32, duration: 23.3, delay: 1.4 },
  { size: 64, left: 55, duration: 36.7, delay: 2.6 },
  { size: 22, left: 18, duration: 20.7, delay: 0.8 },
  { size: 39, left: 72, duration: 28, delay: 3.4 },
  { size: 53, left: 44, duration: 33.3, delay: 1.9 },
  { size: 30, left: 20, duration: 25.5, delay: 4.2 },
  { size: 58, left: 62, duration: 34.5, delay: 0.5 },
  { size: 20, left: 84, duration: 19.5, delay: 2.1 },
  { size: 44, left: 5, duration: 31.8, delay: 3.9 },
  { size: 35, left: 90, duration: 27, delay: 1.1 },
  { size: 60, left: 38, duration: 22, delay: 5 },
]

function BubbleColumn({ side }) {
  return (
    <div className={`lava-bubbles lava-bubbles--${side}`} aria-hidden="true">
      {BUBBLE_SEEDS.map((b, i) => (
        <span
          key={i}
          className="lava-bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export function LavaBubbles() {
  return (
    <>
      <BubbleColumn side="left" />
      <BubbleColumn side="right" />
    </>
  )
}

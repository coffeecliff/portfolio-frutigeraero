# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint over the repo

There is no test runner configured (no test script, no Vitest/Jest despite "Vitest" appearing as a decorative skill icon in `App.jsx`).

## Architecture

Single-page **Frutiger Aero–styled personal portfolio** ("frutigeraero-portfolio"). React 19 + Vite 8, no router used at runtime and no backend — the contact form and axios dependency are inert; `handleEnviar` just toggles local UI state. Content (projects, skills, timeline) is hardcoded as arrays inside the section components. UI text is in Brazilian Portuguese.

### Page composition
`src/main.jsx` mounts `App`. `src/App.jsx` is the whole page: it defines each section (`HeroSection`, `SobreSection`, `ProjetosSection`, `SkillsSection`, `ContatoSection`) as local functions and stacks them in `<main>`. Navigation is scroll-based:
- Each section is wrapped in a `ref`'d `<div>`; `navTo` smooth-scrolls to it with a fixed offset.
- An `IntersectionObserver` sets `activeSection` (via `data-section` attributes) to drive the active state in `NavBar`.

### The AeroBox design system
`src/components/aeroBox.jsx` (+ `aeroBox.css`) is the core reusable UI kit — nearly all UI is built from these four primitives:
- `AeroBox` — icon + label + sub card; interactive when `onClick` is passed
- `AeroPanel` — container; `useBoxStyle` makes it look like an AeroBox
- `AeroGrid` — responsive grid (`cols="auto" | 2 | 3`)
- `AeroBtn` — glassy pill button

Shared props: `variant` = `sky | aqua | forest | aurora | glass` (navbar also uses `glass2`), `size` = `sm | md | lg | xl`. These map to CSS classes like `aero-box--{variant}` / `aero-box-{size}`, so styling changes belong in `aeroBox.css`. Global page styles live in `src/App.css`; base tokens/theme (incl. `prefers-color-scheme` dark mode) in `src/index.css`.

### 3D models (React Three Fiber)
`src/components/models_viewers/` holds standalone `@react-three/fiber` canvases (`FolderViewer3D`, `BallUserViewer3D`, `UserViewer3D`, `CityViewer3D`), plus `bgParticles.jsx` and the `AeroMusicPlayer`. They are absolutely positioned as floating decoration in `App.jsx` via `top/left/right` props. Each loads a `.glb` from `public/models/` with `useGLTF` and often overrides GLTF materials with glassy `MeshPhysicalMaterial` (transmission/bloom) to match the aesthetic.

### Static assets
Everything runtime-loaded lives in `public/` and is referenced by absolute path (`/models/*.glb`, `/musics/*.mp3`, `/assets/*`, `/textures/*`, `/musica.mp3`). Adding a model/track means dropping the file in `public/` and referencing it by `/`-rooted path — not importing from `src/assets/`.

## Design Rules

### 1. Be faithful to the Frutiger Aero aesthetic
Every visual addition must read as Frutiger Aero, not generic glassmorphism:
- **Glass everywhere**: panels, cards, and buttons use translucent backgrounds with `backdrop-filter: blur(...)`, soft white highlights/reflections, and thin light borders (`rgba(255,255,255,...)`) to look like wet glass or plastic. Reuse the existing `AeroBox` / `AeroPanel` / `AeroBtn` primitives (`src/components/aeroBox.jsx`, `aeroBox.css`) instead of inventing new card styles — new UI should map onto the existing `variant` set (`sky | aqua | forest | aurora | glass | glass2`) rather than introducing off-palette colors.
- **Palette**: stick to the aero-associated palette — sky blues, aqua/teal, cyans, fresh greens (forest), and aurora gradients (blue→purple→pink), plus white/glass tones for surfaces. Avoid flat, matte, or desaturated corporate palettes; avoid pure black backgrounds — dark mode should stay in deep blue/teal tones (see `src/index.css` theme tokens), not neutral gray/black.
- **Sheen and light**: favor gradients that simulate light passing through glass/water (specular highlights, soft glows, gentle bloom on 3D materials via `MeshPhysicalMaterial` transmission — see `src/components/models_viewers/`), rounded/pill shapes, and glossy highlights on buttons rather than flat fills.
- **Nature + tech motifs**: Frutiger Aero blends organic imagery (water droplets, bubbles, leaves, sky, clouds) with clean tech/UI chrome. When adding decorative elements, favor these motifs over abstract geometric shapes.

### 2. Prioritize experience, dynamism, and immersion
This is a showcase portfolio, not a static document — every element should favor engagement over minimalism:
- Prefer animated, interactive, and responsive elements (hover states, smooth transitions, parallax, scroll-linked reveals) over static ones. New sections/components should have some motion or interactivity by default, not just appear instantly.
- Keep and extend the 3D/immersive layer (React Three Fiber viewers, floating decorative models, background particles, ambient music player) rather than replacing it with flat 2D content — these are core to the site's identity, not optional flourishes.
- Navigation and section transitions should feel smooth and continuous (see the scroll-based `navTo` + `IntersectionObserver` pattern in `App.jsx`) — avoid hard cuts or instant jumps when adding new navigation or reveal behavior.
- When choosing between a simpler static implementation and a more dynamic/immersive one for UI work, default to the more immersive option as long as it doesn't hurt usability or performance.

## Notes
- `frontend.zip` (~18 MB) in the repo root is a snapshot artifact, not part of the build — ignore it.
- Several 3D viewer imports at the top of `App.jsx` are commented out; uncomment to re-enable rather than reinventing them.

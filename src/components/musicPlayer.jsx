import { useState, useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { AeroBox, AeroBtn } from './aeroBox' // Ajuste o caminho se necessário

// 🌟 1. Playlist configurável
const playlist = [
    { id: 1, title: "Yume 2kki OST: Lavender Waters", src: "/musics/music1.mp3" },
    { id: 2, title: "Yume 2kki OST: Lotus Flowers", src: "/musics/music2.mp3" },
    { id: 3, title: "Yume 2kki OST: Mall Rooftop", src: "/musics/music3.mp3" }
]

// Componente 3D interno privado
function Modelo3D({ spinCounter }) {
    const { scene } = useGLTF('/models/soundFile_aero.glb')
    const groupRef = useRef()
    const targetRotation = useRef(0)

    useEffect(() => {
        targetRotation.current = spinCounter * (Math.PI * 2)
    }, [spinCounter])

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Rotação suave (Carrossel)
            groupRef.current.rotation.y = THREE.MathUtils.damp(
                groupRef.current.rotation.y,
                targetRotation.current,
                5, 
                delta
            )

            // 🌟 Efeito de Flutuação (Senoide)
            const baseY = -3.0 
            const floatSpeed = 1.5 
            const floatAmplitude = 0.25 

            groupRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmplitude
        }
    })

    return (
        <group ref={groupRef}>
            <primitive object={scene} scale={3.2} position={[0.6, 0, 0]} rotation={[0, 6.6, 0]} />
        </group>
    )
}

export function AeroMusicPlayer() {
    // Estados do Music Player
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(null)

    // Estados do Visualizador 3D
    const [isDragging, setIsDragging] = useState(false)
    const [spinCounter, setSpinCounter] = useState(0)
    
    const light = '#ffffff'
    const light_intensity = 0.6
    
    const currentSong = playlist[currentSongIndex]

    // Inicialização Única do Objeto de Áudio
    useEffect(() => {
        audioRef.current = new Audio(currentSong.src)
        audioRef.current.loop = true 

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
            }
        }
    }, [])

    // 🌟 CORREÇÃO 1: Este efeito dispara APENAS quando você muda de música (índice mudou)
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = currentSong.src
            
            // Se já estava tocando, continua tocando a nova faixa imediatamente
            if (isPlaying) {
                audioRef.current.play().catch(err => {
                    console.log("Autoplay bloqueado pelo navegador.", err)
                })
            }
        }
    }, [currentSongIndex])

    // 🌟 CORREÇÃO 2: Controle manual de Play/Pause sem tocar no '.src'
    const togglePlay = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause() // Apenas pausa, mantendo o currentTime intacto
        } else {
            audioRef.current.play().catch(err => {
                console.log("Requer interação do usuário.", err)
            })
        }
        setIsPlaying(!isPlaying)
    }

    const handlePrev = () => {
        setSpinCounter(prev => prev - 1)
        setCurrentSongIndex(prev => (prev - 1 + playlist.length) % playlist.length)
    }

    const handleNext = () => {
        setSpinCounter(prev => prev + 1)
        setCurrentSongIndex(prev => (prev + 1) % playlist.length)
    }

    return (
        <div style={{ padding: '10px', maxWidth: '500px', margin: '0 auto', marginLeft: '270px' }}>
            <style>{`
                .user-canvas-container canvas {
                    cursor: url('/assets/grab_cursor.svg') 16 16, auto !important;
                }
                .user-canvas-container canvas:active {
                    cursor: url('/assets/drag_cursor.svg') 16 16, grabbing !important;
                }
                .user-canvas-container {
                    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
                    will-change: transform;
                }
                .user-canvas-container.is-dragging {
                    transform: scale(1.02); 
                }
            `}</style>

            <div
                className={`aero-canvas-container user-canvas-container ${isDragging ? 'is-dragging' : ''}`}
                style={{
                    width: '100%',
                    height: '450px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'transparent'
                }}
            >
                <Canvas
                    camera={{ position: [10, 1, -10], fov: 30 }}
                    gl={{ toneMappingExposure: 1.2 }}
                    onPointerDown={() => setIsDragging(true)}
                    onPointerUp={() => setIsDragging(false)}
                    onPointerLeave={() => setIsDragging(false)}
                >
                    <ambientLight intensity={0.0} />
                    <directionalLight position={[600, 0, 0]} intensity={light_intensity} color={light} />
                    <directionalLight position={[-600, 0, 0]} intensity={light_intensity * 1.6} color={light} />
                    <directionalLight position={[0, 0, 600]} intensity={light_intensity} color={light} />
                    <directionalLight position={[0, 0, -600]} intensity={light_intensity} color={light} />

                    <Suspense fallback={null}>
                        <Modelo3D spinCounter={spinCounter} />
                        <Environment preset="dawn" />
                    </Suspense>

                    <EffectComposer>
                        <Bloom luminanceThreshold={7.0} intensity={0.0} mipmapBlur />
                    </EffectComposer>
                </Canvas>
            </div>

            <AeroBox
                variant="sky"
                label={currentSong.title}
                style={{ flex: '1', minWidth: '100%', display: 'flex', marginTop: '16px' }}
            >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '50px' }}>
                   <AeroBtn variant="aqua" onClick={handlePrev} style={{ padding: '8px 12px' }}>
                        ⏮
                    </AeroBtn>

                    <AeroBtn variant="aqua" onClick={togglePlay} style={{ padding: '8px 16px', fontWeight: 'bold' }}>
                        {isPlaying ? "⏸" : "▶"}
                    </AeroBtn>

                    <AeroBtn variant="aqua" onClick={handleNext} style={{ padding: '8px 12px' }}>
                        ⏭
                    </AeroBtn>
                </div>
            </AeroBox>
        </div>
    )
}

useGLTF.preload('/models/soundFile_aero.glb')
import React, { Suspense } from 'react' // 1. Adicionado o useState aqui
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, useTexture } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function GradientAero() {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')

    // Gradiente vertical (mude as coordenadas se quiser diagonal ou horizontal)
    const gradiente = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradiente.addColorStop(0, '#3fd9f5')   // Topo: O azul atual do seu projeto
    gradiente.addColorStop(0.2, '#00ffcc')   // Base: Um verde-água / ciano bem brilhante
    gradiente.addColorStop(1, '#00aeff')

    ctx.fillStyle = gradiente
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const textura = new THREE.CanvasTexture(canvas)

    // Ajustes de mapeamento essenciais para o Three.js ler as cores corretamente
    textura.colorSpace = THREE.SRGBColorSpace

    return textura
}

// Componente que renderiza o arquivo 3D
function Modelo3D() {
    const { scene } = useGLTF('/models/city_aero.glb')
    const GrassTexture = useTexture('/textures/grass.jpg')
    const FoliageTexture = useTexture('/textures/foliage.jpg')

    React.useMemo(() => {
        const texturaGradiente = GradientAero()

        scene.traverse((object) => {
            if (object.isMesh && object.material) {
                const nomeDoMaterial = object.material.name.toLowerCase()

                if (nomeDoMaterial === 'material.002') {
                    object.material = new THREE.MeshPhysicalMaterial({
                        map: texturaGradiente,
                        roughness: 0.0,
                        metalness: 0.1,
                        transmission: 0.5, // Subi um pouquinho para destacar o gradiente interno
                        ior: 1.0,          // Ajustado para dar uma refração mais realista na borda fosca
                        envMapIntensity: 0.5,
                    })
                }
                if (nomeDoMaterial === 'material.003') {
                    object.material = new THREE.MeshPhysicalMaterial({
                        map: GrassTexture,
                        roughness: 10.0,
                        envMapIntensity: 1.5,
                        metalness: 1.0,
                    })
                }
                if (nomeDoMaterial === 'material.005') {
                    object.material = new THREE.MeshPhysicalMaterial({
                        map: FoliageTexture,
                        roughness: 10.0,
                        envMapIntensity: 1.5,
                        metalness: 1.0,
                    })
                }
            }
        })
    }, [scene, GrassTexture, FoliageTexture])

    return <primitive object={scene} scale={1.8} position={[0, -13, 0]} />
}

export function CityViewer3D() {
    const light = '#fff9d6'
    const light_intensity = 1.0

    return (
        // 🌟 Modificado para ser um fundo absoluto
        <div
            className={`aero-canvas-container`}
            style={{
                position: 'absolute',
                top: -10,
                left: '50%',                  // Joga o início pro centro da tela
                transform: 'translateX(-50%)',
                width: '158.5%',
                height: '950px',
                zIndex: 1,              // Fica acima das partículas (que são 0)
                pointerEvents: 'none',  // Deixa os cliques vazarem para os botões abaixo!
                background: 'transparent'
            }}
        >
            <Canvas camera={{ position: [50, 4, -10], fov: 20 }} gl={{ toneMappingExposure: 1.2 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[600, 0, 0]} intensity={light_intensity} color={light} />
                <directionalLight position={[-600, 0, 0]} intensity={light_intensity * 1.6} color={light} />
                <directionalLight position={[0, 0, 600]} intensity={light_intensity} color={light} />
                <directionalLight position={[0, 0, -600]} intensity={light_intensity} color={light} />

                <Suspense fallback={null}>
                    <Modelo3D />
                    <Environment preset="city" />
                </Suspense>

                <EffectComposer>
                    <Bloom luminanceThreshold={10.0} intensity={0.005} mipmapBlur />
                </EffectComposer>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                    
                    minDistance={150}
                    maxDistance={150}
                    autoRotate={true}
                    autoRotateSpeed={-10.04}
                    makeDefault
                    target={[0, 4.0, 0]}
                />
            </Canvas>
        </div>
    )
}

// Pré-carrega o modelo para evitar delays ao navegar pelo portfólio
useGLTF.preload('/models/city_aero.glb')
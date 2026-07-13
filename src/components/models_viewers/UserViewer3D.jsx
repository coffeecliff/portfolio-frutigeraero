import React, { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, ContactShadows, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function Modelo3D() {
    const { scene } = useGLTF('/models/user_aero.glb')

    React.useMemo(() => {
        scene.traverse((object) => {
            if (object.isMesh && object.material) {
                const nomeDoMaterial = object.material.name.toLowerCase()
                if (nomeDoMaterial === 'material.001') {
                    object.material = new THREE.MeshPhysicalMaterial({
                        color: new THREE.Color('#5bac36'),
                        roughness: 0.1,
                        metalness: 0.0,
                        transmission: 0.5,
                        transparent: true,
                        opacity: 0.9,
                        ior: 1.0,
                        envMapIntensity: 1.5,
                    })
                }
            }
        })
    }, [scene])

    return <primitive object={scene} scale={1.8} position={[0, -1, 0]} />
}

// 🌟 Componente que controla o comportamento do OrbitControls e o Timer de 10s
function ControlledControls({ isDragging }) {
    const { camera } = useThree()
    const controlsRef = useRef()

    const lastInteracted = useRef(null)
    const initialSpherical = useRef(new THREE.Spherical())
    const hasInteracted = useRef(false)

    useEffect(() => {
        lastInteracted.current = Date.now()
    }, [])

    useEffect(() => {
        if (camera) {
            initialSpherical.current.setFromVector3(camera.position)
        }
    }, [camera])

    useEffect(() => {
        if (isDragging) {
            lastInteracted.current = Date.now()
            hasInteracted.current = true
        }
    }, [isDragging])

    useFrame((state, delta) => {
        if (!controlsRef.current || !lastInteracted.current) return

        const tempoInativo = Date.now() - lastInteracted.current

        if (isDragging) {
            controlsRef.current.autoRotate = false
            lastInteracted.current = Date.now()
        } else if (tempoInativo < 5000) {
            controlsRef.current.autoRotate = true
        } else {
            if (!hasInteracted.current) {
                controlsRef.current.autoRotate = true;
            } else {
                // Desligamos o autoRotate nativo para não dar conflito de escrita na câmera
                controlsRef.current.autoRotate = false

                const currentSpherical = new THREE.Spherical().setFromVector3(camera.position)
                currentSpherical.radius = initialSpherical.current.radius

                // 🌟 AQUI ESTÁ O TRUQUE: Calculamos o avanço da rotação horizontal manualmente.
                // 0.8 é a sua autoRotateSpeed. O OrbitControls rotaciona usando a fórmula: velocidade * delta * (2 * Math.PI / 60)
                const velocidadeGiro = 0.8 * delta * (Math.PI / 30)
                const thetaRotacionado = currentSpherical.theta - velocidadeGiro

                const targetPhi = initialSpherical.current.phi
                const diferencaPhi = Math.abs(currentSpherical.phi - targetPhi)

                if (diferencaPhi < 0.01) {
                    // Se o alinhamento vertical chegou no lugar, preserva o giro manual acumulado
                    currentSpherical.theta = thetaRotacionado
                    currentSpherical.phi = targetPhi
                    camera.position.setFromSpherical(currentSpherical)

                    hasInteracted.current = false
                    lastInteracted.current = Date.now()
                } else {
                    // 🌟 Enquanto aplica o lerp no plano Vertical (Phi), 
                    // ele continua atualizando o giro horizontal constantemente!
                    currentSpherical.theta = thetaRotacionado
                    currentSpherical.phi = THREE.MathUtils.lerp(currentSpherical.phi, targetPhi, 1.2 * delta)
                    camera.position.setFromSpherical(currentSpherical)
                }
            }
        }

        controlsRef.current.update()
    })

    return (
        <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            minDistance={4}
            maxDistance={4}
            autoRotate={true}
            autoRotateSpeed={0.8}
            makeDefault
            target={[0, -0.4, 0]}
        />
    )
}

export function UserViewer3D() {
    const [isDragging, setIsDragging] = useState(false)
    const light = '#00ff0d'
    const light_intensity = 2.5

    return (
        <div style={{ padding: '10px', maxWidth: '500px', margin: '0 auto' }}>
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
                    transform: scale(1.04); 
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
                {/* Controlamos o clique direto pelos ponteiros do Canvas para precisão total */}
                <Canvas
                    camera={{ position: [10, 1, -10], fov: 30 }}
                    gl={{ toneMappingExposure: 1.2 }}
                    onPointerDown={() => setIsDragging(true)}
                    onPointerUp={() => setIsDragging(false)}
                    onPointerLeave={() => setIsDragging(false)} // 🌟 Segurança extra se o mouse "fugir" do Canvas
                >
                    <ambientLight intensity={1.6} />
                    <directionalLight position={[600, 0, 0]} intensity={light_intensity} color={light} />
                    <directionalLight position={[-600, 0, 0]} intensity={light_intensity * 1.6} color={light} />
                    <directionalLight position={[0, 0, 600]} intensity={light_intensity} color={light} />
                    <directionalLight position={[0, 0, -600]} intensity={light_intensity} color={light} />

                    <Suspense fallback={null}>
                        <Modelo3D />
                        <Environment preset="dawn" />
                        <ContactShadows position={[0, -1, 0]} opacity={0.12} scale={3} blur={0.1} far={6} />
                    </Suspense>

                    <EffectComposer>
                        <Bloom luminanceThreshold={7.0} intensity={0.0} mipmapBlur />
                    </EffectComposer>

                    <ControlledControls isDragging={isDragging} />
                </Canvas>
            </div>
        </div>
    )
}

useGLTF.preload('/models/user_aero.glb')
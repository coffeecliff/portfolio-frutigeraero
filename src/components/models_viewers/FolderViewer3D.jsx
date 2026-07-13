import React, { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

let localDragDelta = { x: 0, y: 0 }
let localLastMousePos = { x: 0, y: 0 }

function FolderModelo3D({ isDraggingHTML }) {
    const { scene } = useGLTF('/models/folder_aero.glb')
    const groupRef = useRef()
    const clonedScene = React.useMemo(() => scene.clone(), [scene])

    React.useMemo(() => {
        clonedScene.traverse((object) => {
            if (object.isMesh && object.material) {
                const nomeDoMaterial = object.material.name.toLowerCase()
                if (nomeDoMaterial === 'folder_material') {
                    object.material = new THREE.MeshPhysicalMaterial({
                        color: new THREE.Color('#d6c043'),
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
    }, [clonedScene])

    useFrame(() => {
        if (!groupRef.current) return

        if (isDraggingHTML) {

            localDragDelta.x = 0
            localDragDelta.y = 0
        }
    })

    return (
        <group ref={groupRef}>
            <primitive object={clonedScene} scale={2.6} position={[0, -2, 0]} rotation={[0, 15.5, 0]} />
        </group>
    )
}

export function FolderViewer3D({ top, left, color = '#36a8ac' }) {
    // 🌟 1. Estado para controlar se a tela é mobile
    const [isMobile, setIsMobile] = useState(false)
    
    const [position, setPosition] = useState({
        top: top || '20px',
        left: left || '20px'
    })
    
    const [isDraggingHTML, setIsDraggingHTML] = useState(false)
    const containerRef = useRef(null)
    const dragStartOffset = useRef({ x: 0, y: 0 })

    const posRef = useRef({ x: parseInt(left) || 20, y: parseInt(top) || 20 })
    const velRef = useRef({ x: 0, y: 0 })
    const rafRef = useRef(null)

    const light = '#ffffff'
    const light_intensity = 2.0
    const widgetSize = 155

    // 🌟 2. Effect para monitorar o tamanho da tela em tempo real (compatível com SSR/Next.js)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        
        checkScreenSize() // Roda ao montar o componente
        window.addEventListener('resize', checkScreenSize)
        
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    const handlePointerDownHTML = (e) => {
        setIsDraggingHTML(true)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        velRef.current = { x: 0, y: 0 }

        const rect = containerRef.current.getBoundingClientRect()
        dragStartOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }

        localLastMousePos.x = e.clientX
        localLastMousePos.y = e.clientY
        localDragDelta.x = 0
        localDragDelta.y = 0
    }

    useEffect(() => {
        // Se estiver no mobile, nem ativa os listeners de arrasto
        if (isMobile) return 

        const handlePointerMoveGlobal = (e) => {
            if (!isDraggingHTML) return

            localDragDelta.x = e.clientX - localLastMousePos.x
            localDragDelta.y = e.clientY - localLastMousePos.y

            velRef.current.x = e.clientX - localLastMousePos.x
            velRef.current.y = e.clientY - localLastMousePos.y

            localLastMousePos.x = e.clientX
            localLastMousePos.y = e.clientY

            const parentElement = containerRef.current.parentElement
            const parentRect = parentElement
                ? parentElement.getBoundingClientRect()
                : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }

            const targetLeft = e.clientX - dragStartOffset.current.x - parentRect.left
            const targetTop = e.clientY - dragStartOffset.current.y - parentRect.top

            const boundedLeft = Math.max(0, Math.min(parentRect.width - widgetSize - 10, targetLeft))
            const boundedTop = Math.max(0, Math.min(parentRect.height - widgetSize, targetTop))

            posRef.current = { x: boundedLeft, y: boundedTop }
            setPosition({ left: `${boundedLeft}px`, top: `${boundedTop}px` })
        }

        const handlePointerUpGlobal = () => {
            setIsDraggingHTML(false)

            const inertiaLoop = () => {
                velRef.current.x *= 0.92 
                velRef.current.y *= 0.92

                let nextX = posRef.current.x + velRef.current.x
                let nextY = posRef.current.y + velRef.current.y

                const parentElement = containerRef.current.parentElement
                const parentRect = parentElement 
                    ? parentElement.getBoundingClientRect() 
                    : { width: window.innerWidth, height: window.innerHeight }
                
                const maxX = parentRect.width - widgetSize - 10
                const maxY = parentRect.height - widgetSize

                if (nextX <= 0) { nextX = 0; velRef.current.x *= -0.6 }
                else if (nextX >= maxX) { nextX = maxX; velRef.current.x *= -0.6 }

                if (nextY <= 0) { nextY = 0; velRef.current.y *= -0.6 }
                else if (nextY >= maxY) { nextY = maxY; velRef.current.y *= -0.6 }

                posRef.current = { x: nextX, y: nextY }
                setPosition({ left: `${nextX}px`, top: `${nextY}px` })

                if (Math.abs(velRef.current.x) > 0.1 || Math.abs(velRef.current.y) > 0.1) {
                    rafRef.current = requestAnimationFrame(inertiaLoop)
                }
            }

            rafRef.current = requestAnimationFrame(inertiaLoop)
        }

        if (isDraggingHTML) {
            window.addEventListener('pointermove', handlePointerMoveGlobal)
            window.addEventListener('pointerup', handlePointerUpGlobal)
            document.body.style.userSelect = 'none'
        }

        return () => {
            window.removeEventListener('pointermove', handlePointerMoveGlobal)
            window.removeEventListener('pointerup', handlePointerUpGlobal)
            document.body.style.userSelect = ''
        }
    }, [isDraggingHTML, isMobile])

    useEffect(() => {
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    }, [])

    // 🌟 3. TRAVA DO RETURN: Se a tela for menor ou igual a 768px, mata o componente e limpa a memória
    if (isMobile) return null

    return (
        <div
            ref={containerRef}
            className="ball-viewer-absolute-container"
            onPointerDown={handlePointerDownHTML}
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: `${widgetSize}px`,
                height: `${widgetSize}px`,
                zIndex: 2,
                background: 'transparent',
                cursor: isDraggingHTML ? 'grabbing' : 'pointer',
                touchAction: 'none'
            }}
        >
            <style>{`
                .user-canvas-container {
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    will-change: transform;
                }
                .ball-viewer-absolute-container:active .user-canvas-container {
                    transform: scale(1.08);
                }
            `}</style>

            <div
                className="aero-canvas-container user-canvas-container"
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'transparent',
                    pointerEvents: 'none'
                }}
            >
                <Canvas camera={{ position: [10, 1, -10], fov: 30 }} gl={{ toneMappingExposure: 1.2 }}>
                    <ambientLight intensity={1.2} />
                    <directionalLight position={[600, 0, 0]} intensity={light_intensity} color={light} />
                    <directionalLight position={[-600, 0, 0]} intensity={light_intensity * 1.6} color={light} />
                    <directionalLight position={[0, 0, 600]} intensity={light_intensity} color={light} />
                    <directionalLight position={[0, 0, -600]} intensity={light_intensity} color={light} />

                    <Suspense fallback={null}>
                        <FolderModelo3D color={color} isDraggingHTML={isDraggingHTML} />
                        <Environment preset="dawn" />
                    </Suspense>

                    <EffectComposer>
                        <Bloom luminanceThreshold={7.0} intensity={0.0} mipmapBlur />
                    </EffectComposer>
                </Canvas>
            </div>
        </div>
    )
}

useGLTF.preload('/models/folder_aero.glb')
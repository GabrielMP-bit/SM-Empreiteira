"use client"

import {
  useRef, Suspense, useEffect, useState,
  Component, type ReactNode, type ErrorInfo,
} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls, useGLTF, ContactShadows,
  Environment, useProgress, Html,
} from '@react-three/drei'
import * as THREE from 'three'
import { useProjectStore } from '@/store/project-store'

// ─── Error Boundary ───────────────────────────────────────────────────────────
class ModelBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; resetKey: string },
  { error: boolean }
> {
  state = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  componentDidCatch(e: Error) { console.warn('[GLB]', e.message) }
  componentDidUpdate(prev: { resetKey: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: false })
    }
  }
  render() {
    return this.state.error ? this.props.fallback : this.props.children
  }
}

// ─── Loader ───────────────────────────────────────────────────────────────────
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
        <svg width="44" height="44" viewBox="0 0 44 44" style={{ animation:'spin 1s linear infinite' }}>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(201,162,39,0.15)" strokeWidth="2"/>
          <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(201,162,39,0.85)" strokeWidth="2"
            strokeDasharray={`${(progress/100)*113} 113`} strokeLinecap="round" transform="rotate(-90 22 22)"/>
        </svg>
        <span style={{ fontFamily:'monospace', fontSize:10, letterSpacing:3, color:'rgba(201,162,39,0.5)', textTransform:'uppercase' }}>
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  )
}

// ─── GLB Scene ────────────────────────────────────────────────────────────────
function GlbScene({ url, autoRotate, isFloorPlan }: {
  url: string; autoRotate: boolean; isFloorPlan: boolean
}) {
  const gltf       = useGLTF(url)
  const { camera } = useThree()
  const groupRef   = useRef<THREE.Group>(null)
  const fittedRef  = useRef(false)

  useEffect(() => { fittedRef.current = false }, [url])

  useEffect(() => {
    const group = groupRef.current
    if (!group || fittedRef.current) return
    fittedRef.current = true

    const rawBox  = new THREE.Box3().setFromObject(gltf.scene)
    const rawSize = rawBox.getSize(new THREE.Vector3())
    const maxDim  = Math.max(rawSize.x, rawSize.y, rawSize.z)
    if (maxDim === 0) return

    const scale = 10 / maxDim
    group.scale.setScalar(scale)

    const box    = new THREE.Box3().setFromObject(group)
    const center = box.getCenter(new THREE.Vector3())
    const size   = box.getSize(new THREE.Vector3())
    group.position.set(-center.x, -box.min.y, -center.z)

    group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = child.receiveShadow = true
        const mesh = child as THREE.Mesh
        const mats = Array.isArray(mesh.material) ? mesh.material as THREE.Material[]
                                                  : [mesh.material as THREE.Material]
        mats.forEach(m => {
          if (m) { (m as THREE.MeshStandardMaterial).envMapIntensity = 0.9; m.needsUpdate = true }
        })
      }
    })

    const cam    = camera as THREE.PerspectiveCamera
    const fovRad = (cam.fov * Math.PI) / 180
    const fitDist = (Math.max(size.x, size.z) / 2) / Math.tan(fovRad / 2) * 1.55

    if (isFloorPlan) {
      camera.position.set(0, fitDist * 1.6, 0.5)
      camera.lookAt(0, 0, 0)
    } else {
      camera.position.set(fitDist * 0.7, size.y * 0.55 + fitDist * 0.4, fitDist * 0.7)
      camera.lookAt(0, size.y * 0.3, 0)
    }
    camera.updateProjectionMatrix()
  }, [url, camera, isFloorPlan, gltf.scene])

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) groupRef.current.rotation.y += delta * 0.16
  })

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  )
}

// ─── Wireframe placeholder ────────────────────────────────────────────────────
function WireframePlaceholder({ url }: { url: string }) {
  const parts    = url.split('/').filter(Boolean)
  const filename = parts.slice(-2).join('/')
  const groupRef = useRef<THREE.Group>(null)
  useFrame((_, d) => { if (groupRef.current) groupRef.current.rotation.y += d * 0.1 })
  return (
    <>
      <Html center position={[0, 7, 0]}>
        <div style={{ textAlign:'center', userSelect:'none', pointerEvents:'none' }}>
          <p style={{ fontFamily:'monospace', fontSize:9, letterSpacing:2, color:'rgba(201,162,39,0.5)', textTransform:'uppercase', marginBottom:4 }}>
            Modelo não encontrado
          </p>
          <p style={{ fontFamily:'monospace', fontSize:8, color:'rgba(255,255,255,0.18)' }}>
            /public/models/{filename}
          </p>
        </div>
      </Html>
      <group ref={groupRef}>
        <mesh position={[0, 2.5, 0]}>
          <boxGeometry args={[5, 5, 4]} />
          <meshStandardMaterial color="#1a2535" wireframe />
        </mesh>
        <mesh position={[0, 5.8, 0]}>
          <coneGeometry args={[3.6, 2.4, 4]} />
          <meshStandardMaterial color="#C9A227" wireframe opacity={0.3} transparent />
        </mesh>
      </group>
    </>
  )
}

// ─── Ground ───────────────────────────────────────────────────────────────────
function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#06070D" roughness={1} metalness={0} />
      </mesh>
      <gridHelper args={[80, 80, '#111420', '#0C0E16']} />
    </>
  )
}

// ─── Scene Content ────────────────────────────────────────────────────────────
function SceneContent({ modelUrl, resetKey }: { modelUrl: string; resetKey: string }) {
  const { rotating } = useProjectStore()
  const [interacting, setInteracting] = useState(false)
  const isFloorPlan = modelUrl.includes('planta-baixa')
  const doRotate    = rotating && !interacting && !isFloorPlan

  return (
    <>
      <Ground />
      <Suspense fallback={<Loader />}>
        <ModelBoundary resetKey={resetKey} fallback={<WireframePlaceholder url={modelUrl} />}>
          <GlbScene url={modelUrl} autoRotate={doRotate} isFloorPlan={isFloorPlan} />
        </ModelBoundary>
        <ContactShadows position={[0, 0.02, 0]} opacity={0.5} scale={35} blur={3} far={14} color="#000" />
      </Suspense>
      <OrbitControls
        enablePan={false} enableZoom enableRotate={!isFloorPlan}
        minDistance={2} maxDistance={80}
        minPolarAngle={isFloorPlan ? 0 : 0.1}
        maxPolarAngle={isFloorPlan ? 0.01 : Math.PI / 2 - 0.02}
        target={[0, isFloorPlan ? 0 : 2, 0]}
        enableDamping dampingFactor={0.05}
        onStart={() => setInteracting(true)}
        onEnd={() => setInteracting(false)}
        makeDefault
      />
    </>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function ModelViewer() {
  const { rotating, setRotating, getModelUrl, getActiveProject, getActiveView } = useProjectStore()

  const modelUrl    = getModelUrl()
  const resetKey    = modelUrl
  const project     = getActiveProject()
  const activeView  = getActiveView()
  const isFloorPlan = activeView.glbKey === 'planta-baixa'

  return (
    <div className="relative w-full h-full" style={{ background: '#06070D' }}>
      <Canvas
        shadows dpr={[1, 1.5]}
        camera={{ fov: 42, near: 0.1, far: 600, position: [14, 9, 14] }}
        gl={{
          antialias: true, alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#06070D']} />
        <ambientLight intensity={0.45} color="#d0e0f8" />
        <directionalLight position={[12, 22, 12]} intensity={1.6} color="#fff8f0" castShadow
          shadow-mapSize-width={2048} shadow-mapSize-height={2048}
          shadow-camera-left={-24} shadow-camera-right={24}
          shadow-camera-top={24} shadow-camera-bottom={-24}
          shadow-camera-far={90} shadow-bias={-0.0003} />
        <directionalLight position={[-10, 8, -14]} intensity={0.3} color="#a0b8d8" />
        <hemisphereLight args={['#c0d4f0', '#06070D', 0.4]} />
        <Environment preset="city" environmentIntensity={0.3} />

        <SceneContent key={resetKey} modelUrl={modelUrl} resetKey={resetKey} />
      </Canvas>

      {/* HUD — label topo esquerdo */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shrink-0" />
        <div className="flex flex-col">
          <span className="font-mono text-[0.6rem] tracking-[3px] text-white/40 uppercase">
            {project?.label}
          </span>
          <span className="font-mono text-[0.5rem] tracking-[2px] text-white/20 uppercase">
            {activeView.label}
          </span>
        </div>
      </div>

      {/* HUD — botão girar topo direito */}
      {!isFloorPlan && (
        <button
          onClick={() => setRotating(!rotating)}
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md font-mono text-[0.58rem] tracking-[2px] text-white/30 uppercase transition-all duration-200 hover:border-gold/40 hover:text-gold/60"
          style={{
            background: 'rgba(6,7,13,0.7)',
            borderColor: rotating ? 'rgba(201,162,39,0.3)' : 'rgba(255,255,255,0.08)',
            color: rotating ? 'rgba(201,162,39,0.7)' : 'rgba(255,255,255,0.28)',
          }}
        >
          {rotating
            ? <><svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>Pausar</>
            : <><svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>Girar</>
          }
        </button>
      )}

      {/* HUD — hint rodapé */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="font-mono text-[0.5rem] tracking-[2px] text-white/15 uppercase whitespace-nowrap">
          {isFloorPlan ? 'Vista superior · Scroll para zoom' : 'Arraste para orbitar · Scroll para zoom'}
        </span>
      </div>
    </div>
  )
}

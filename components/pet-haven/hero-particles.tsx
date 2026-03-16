"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function ChasingParticles() {
  const count = 120
  const mesh = useRef<THREE.Points>(null)

  const { positions, baseY, radii, phaseOffsets } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const baseY: number[] = []
    const rad: number[] = []
    const phase: number[] = []

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 0.8 + Math.random() * 1.2
      pos[i * 3] = Math.cos(angle) * radius * 2
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.3
      baseY.push(pos[i * 3 + 1])
      rad.push(radius)
      phase.push(Math.random() * Math.PI * 2)
    }

    return { positions: pos, baseY, radii: rad, phaseOffsets: phase }
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    const pos = mesh.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const angle = time * 0.4 + phaseOffsets[i]
      const radius = radii[i] * (1 + Math.sin(time * 1.5 + i * 0.3) * 0.08)
      pos[i * 3] = Math.cos(angle) * radius * 2
      pos[i * 3 + 1] = baseY[i] + Math.sin(time * 2 + i * 0.15) * 0.15
      pos[i * 3 + 2] = pos[i * 3 + 2]
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        transparent
        opacity={0.7}
        color="#ffd89b"
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function HeroParticles() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: false }}
      >
        <ChasingParticles />
      </Canvas>
    </div>
  )
}

// FloatingCubes.tsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FloatingCubesProps {
  commitCounts: number[]
}

const colorScale = [
  '#eeeeee', // color-github-0
  '#d6e685', // color-github-1
  '#8cc665', // color-github-2
  '#44a340', // color-github-3
  '#1e6823', // color-github-4
]

const FloatingCube: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const meshRef = React.useRef<THREE.Mesh>(null!)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(meshRef.current.position.x / 5) * 0.01
      meshRef.current.position.x += 0.02
      if (meshRef.current.position.x > 10) meshRef.current.position.x = -10
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const FloatingCubes: React.FC<FloatingCubesProps> = ({ commitCounts }) => {
  if (commitCounts.length === 0) {
    return null
  }

  return (
    <div id="scene">
      <Canvas style={{ width: '100%', height: '100%' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        {commitCounts.map((count, i) => (
          <FloatingCube
            key={i}
            position={[Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10]}
            color={colorScale[Math.min(count, colorScale.length - 1)]}
          />
        ))}
      </Canvas>
    </div>
  )
}

export default FloatingCubes

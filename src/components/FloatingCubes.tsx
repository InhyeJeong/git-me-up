import React from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CommitData } from '@/app/store/githubInfoStore'

interface FloatingCubesProps {
  commits: CommitData[]
}

const colorScale = [
  '#eeeeee', // color-github-0
  '#d6e685', // color-github-1
  '#8cc665', // color-github-2
  '#44a340', // color-github-3
  '#1e6823', // color-github-4
]
interface FloatingCubeProps {
  position: [number, number, number]
  color: string
  date: string
  count: number
}
const FloatingCube = ({ position, color, date, count }: FloatingCubeProps) => {
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
      <Text position={[0, 0, 0.6]} fontSize={0.15} color="black">
        {`${date}\nCount : ${count}`}
      </Text>
    </mesh>
  )
}

const FloatingCubes: React.FC<FloatingCubesProps> = ({ commits }) => {
  return (
    <div id="scene">
      <Canvas style={{ width: '100%', height: '100%' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        {commits.map((commit, i) => (
          <FloatingCube
            key={i}
            position={[Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10]}
            color={colorScale[Math.min(commit.count, colorScale.length - 1)]}
            date={commit.date}
            count={commit.count}
          />
        ))}
      </Canvas>
    </div>
  )
}

export default FloatingCubes

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Cloud, Center, Text3D } from '@react-three/drei'
import * as THREE from 'three'
import { RoundedBox } from '@react-three/drei'
import { Color } from 'three'

interface FloatingCubesProps {
  commits: { date: string; count: number }[]
}

const colorScale = ['#eeeeee', '#d6e685', '#8cc665', '#44a340', '#1e6823']

interface FloatingCubeProps {
  position: [number, number, number]
  color: string
  date: string
  count: number
}

const FloatingCube = ({ position, color, date, count }: FloatingCubeProps) => {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y += Math.sin(groupRef.current.position.x / 5) * 0.01
      groupRef.current.position.x += 0.02
      if (groupRef.current.position.x > 10) groupRef.current.position.x = -10
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={4}>
        <meshPhysicalMaterial color={color} roughness={0.1} transmission={0.9} thickness={0.5} reflectivity={0.6} />
      </RoundedBox>
      <Cloud position={[0, 1.3, 0]} opacity={0.2} speed={0.2} segments={12} bounds={[0.2, 0.1, 0.2]} scale={[0.25, 0.25, 0.25]} />
      <Center position={[0, 1.6, 0]}>
        <Text3D
          font="/Inter_Bold.json"
          size={0.08}
          height={0.01}
          curveSegments={16}
          bevelEnabled
          bevelThickness={0.005}
          bevelSize={0.005}
          bevelOffset={0}
          bevelSegments={5}
        >
          {`${date}\nCommits: ${count}`}
          <meshPhongMaterial
            color={new Color("#FFD700")}
            emissive={new Color("#FFA500")}
            specular={new Color("#FFFFFF")}
            shininess={100}
          />
        </Text3D>
      </Center>
    </group>
  )
}

const FloatingCubes: React.FC<FloatingCubesProps> = ({ commits }) => {
  return (
    <div id="scene">
      <Canvas shadows style={{ width: '100%', height: '100%' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} castShadow />
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

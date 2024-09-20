import { Center, OrbitControls, Text3D } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'

const MOBILE_WIDTH = 768
const DEFAULT_FONT_SIZE = 10
const MOBILE_FONT_SIZE = 6

export default function Title() {
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < MOBILE_WIDTH) {
        setFontSize(MOBILE_FONT_SIZE)
      } else {
        setFontSize(DEFAULT_FONT_SIZE)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 10 }} className="cursor-pointer">
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <Center rotation={[-0.5, -0.25, 0]}>
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.5}
          height={0.5}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={fontSize}
          font="/Inter_Bold.json"
        >
          Git me up
          <meshNormalMaterial />
        </Text3D>
      </Center>
      <axesHelper scale={10} position={[0, 0, 0]} onUpdate={(self) => self.setColors('#ff2080', '#20ff80', '#2080ff')} />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  )
}

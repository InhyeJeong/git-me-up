import { TITLE_CONFIG } from '@/app/constants'
import { useIsMobile } from '@/utils/isMobile'
import { Center, OrbitControls, Text3D } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'

export default function Title() {
  const [fontSize, setFontSize] = useState(TITLE_CONFIG.desktop.fontSize)
  const [text, setText] = useState(TITLE_CONFIG.desktop.text)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) {
      setFontSize(TITLE_CONFIG.mobile.fontSize)
      setText(TITLE_CONFIG.mobile.text)
    } else {
      setFontSize(TITLE_CONFIG.desktop.fontSize)
      setText(TITLE_CONFIG.desktop.text)
    }
  }, [isMobile])

  return (
    <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 10 }} className="cursor-pointer">
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <Center rotation={isMobile ? [-0.5, -0.75, 0] : [-0.5, -0.25, 0]}>
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
          {text}
          <meshNormalMaterial />
        </Text3D>
      </Center>
      <axesHelper scale={10} position={[0, 0, 0]} onUpdate={(self) => self.setColors('#ff2080', '#20ff80', '#2080ff')} />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  )
}

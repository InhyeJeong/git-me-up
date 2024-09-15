import { getColorFromCount } from '@/utils/getColorFromCube'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface CubeSceneProps {
  commitCounts: number[]
}

const CubeScene: React.FC<CubeSceneProps> = ({ commitCounts }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || commitCounts.length === 0) return

    // 씬, 카메라, 렌더러 생성
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // 큐브 지오메트리
    const geometry = new THREE.BoxGeometry(1, 1, 1)

    // 커밋 수만큼 큐브 생성
    commitCounts.forEach((count) => {
      const material = new THREE.MeshBasicMaterial({ color: getColorFromCount(count) })
      const cube = new THREE.Mesh(geometry, material)
      cube.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)
      scene.add(cube)
    })

    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0x404040) // 조명 색상
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1).normalize()
    scene.add(directionalLight)

    // 카메라 위치 설정
    camera.position.z = 20

    // 애니메이션 함수
    const animate = () => {
      requestAnimationFrame(animate)
      scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.rotation.x += 0.01
          child.rotation.y += 0.01
        }
      })
      renderer.render(scene, camera)
    }
    animate()

    // 창 크기 변경 시 카메라 비율 조정
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [commitCounts])

  if (commitCounts.length === 0) {
    return null
  }

  return <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
}

export default CubeScene

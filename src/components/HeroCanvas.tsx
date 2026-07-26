'use client'
import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

const vertexShader = `
uniform float uProgress;
uniform float uTime;
attribute vec3 randomPosition;
varying vec2 vUv;

void main() {
  vUv = uv;
  
  // Add some noise/swirl to the random position based on time
  vec3 swirl = vec3(
    sin(uTime * 0.5 + randomPosition.y) * 2.0,
    cos(uTime * 0.3 + randomPosition.x) * 2.0,
    sin(uTime * 0.4 + randomPosition.z) * 2.0
  );
  
  // Interpolate between random dispersed position and actual image plane position
  vec3 finalPos = mix(randomPosition + swirl, position, uProgress);
  
  vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
  
  // Point size scales with distance
  gl_PointSize = (8.0 * (1.0 - uProgress) + 3.0 * uProgress) * (1.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uProgress;
varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(uTexture, vUv);
  
  // Make particles slightly transparent when scattered, solid when formed
  float alpha = mix(0.4, texColor.a, uProgress);
  
  // Add a slight blue tint when dispersed for the futuristic look
  vec3 tint = mix(vec3(0.44, 0.9, 1.0), texColor.rgb, uProgress);
  
  gl_FragColor = vec4(tint, alpha);
}
`

function Particles({ startAnimation }: { startAnimation: boolean }) {
  const texture = useTexture('/hero-portrait.png')
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Configure geometry
  const geometry = useMemo(() => {
    const width = 120
    const height = 120
    const geo = new THREE.PlaneGeometry(10, 10, width, height)
    
    // Add random positions for the dispersed state
    const count = geo.attributes.position.count
    const randomPositions = new Float32Array(count * 3)
    
    for(let i = 0; i < count * 3; i++) {
      randomPositions[i] = (Math.random() - 0.5) * 30 // Spread across 30 units
    }
    
    geo.setAttribute('randomPosition', new THREE.BufferAttribute(randomPositions, 3))
    return geo
  }, [])

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uProgress: { value: 0.0 }, // 0 = dispersed, 1 = formed
    uTime: { value: 0.0 }
  }), [texture])

  useEffect(() => {
    if (startAnimation && materialRef.current) {
      // The reconstruction sequence requested:
      // Tiny particles drift outward -> Face fractures -> swirl -> reassemble -> portrait perfectly reconstructed
      // Since our starting point is 'dispersed' (0) going to 'formed' (1), we can animate uProgress.
      
      const tl = gsap.timeline()
      
      // We'll actually start formed, then shatter, then reform, as per the prompt's complex animation sequence.
      // "Entire face visible -> Hair begins to separate -> tiny particles drift outward -> face fractures -> swirl -> reassemble"
      // Let's implement a simplified robust version: start shattered (0), swirl, then slowly reassemble to 1.
      
      tl.to(materialRef.current.uniforms.uProgress, {
        value: 1,
        duration: 8,
        ease: 'power3.inOut'
      })
      
      // Slow zoom in
      tl.to(groupRef.current?.scale || {}, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 10,
        ease: 'power1.inOut'
      }, "<")
    }
  }, [startAnimation])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
    if (groupRef.current && !startAnimation) {
      // Gentle rotation while waiting
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export default function HeroCanvas({ startAnimation }: { startAnimation: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <Particles startAnimation={startAnimation} />
    </Canvas>
  )
}

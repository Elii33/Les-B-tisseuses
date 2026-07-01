import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingShape({ position, color, shape = 'sphere', speed = 1, scale = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.4;
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.5;
  });

  const geo = useMemo(() => {
    if (shape === 'box') return new THREE.BoxGeometry(1, 1, 1);
    if (shape === 'torus') return new THREE.TorusGeometry(0.6, 0.22, 24, 100);
    if (shape === 'octa') return new THREE.OctahedronGeometry(0.9, 0);
    if (shape === 'ico') return new THREE.IcosahedronGeometry(0.9, 0);
    return new THREE.SphereGeometry(0.7, 48, 48);
  }, [shape]);

  return (
    <mesh ref={ref} position={position} scale={scale} geometry={geo} castShadow>
      <meshPhysicalMaterial
        color={color}
        metalness={0.6}
        roughness={0.15}
        clearcoat={1}
        clearcoatRoughness={0.1}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function Rig() {
  useFrame((state) => {
    const { camera, mouse } = state;
    camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * 1.0 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D({ variant = 'hero' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ff6ec4" />
      <pointLight position={[-4, 2, 3]} intensity={2} color="#a855f7" />
      <pointLight position={[3, -2, 2]} intensity={2} color="#fb923c" />

      <FloatingShape position={[-3.2, 0.8, 0]} color="#a855f7" shape="ico" speed={0.6} scale={1.1} />
      <FloatingShape position={[3.4, -0.5, -1]} color="#ec4899" shape="torus" speed={0.8} scale={1.2} />
      <FloatingShape position={[0, 1.8, -2]} color="#fb923c" shape="octa" speed={0.5} scale={0.9} />
      <FloatingShape position={[-1.8, -1.4, 1]} color="#f472b6" shape="sphere" speed={0.9} scale={0.7} />
      <FloatingShape position={[2.2, 1.5, 1.5]} color="#c084fc" shape="box" speed={0.7} scale={0.6} />
      {variant === 'hero' && (
        <>
          <FloatingShape position={[-4, -1.8, -1]} color="#fbbf24" shape="sphere" speed={0.4} scale={0.5} />
          <FloatingShape position={[4, 2, 0.5]} color="#a78bfa" shape="ico" speed={0.55} scale={0.6} />
        </>
      )}
      <Rig />
    </Canvas>
  );
}

'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function SpaceBackground() {
  const spaceRef = useRef<THREE.Group>(null);
  const nebulaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!spaceRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Slow infinite rotation of the cosmos
    spaceRef.current.rotation.y += 0.0003;
    spaceRef.current.rotation.x += 0.0001;
    
    // Smooth Parallax effect reacting to mouse
    const targetX = (state.pointer.x * Math.PI) / 15;
    const targetY = (state.pointer.y * Math.PI) / 15;
    
    spaceRef.current.rotation.y = THREE.MathUtils.lerp(spaceRef.current.rotation.y, targetX, 0.02);
    spaceRef.current.rotation.x = THREE.MathUtils.lerp(spaceRef.current.rotation.x, -targetY, 0.02);

    if (nebulaRef.current) {
       nebulaRef.current.rotation.z = time * 0.05;
    }
  });

  return (
    <group ref={spaceRef}>
      {/* Deep Space Stars */}
      <Stars radius={150} depth={80} count={7000} factor={6} saturation={1} fade speed={1.5} />
      
      {/* Floating Cyber-Dust (Foreground) */}
      <Sparkles count={200} scale={25} size={2.5} speed={0.5} opacity={0.5} color="#00F0FF" />
      <Sparkles count={150} scale={25} size={3} speed={0.3} opacity={0.3} color="#FFD700" />
      <Sparkles count={100} scale={30} size={4} speed={0.2} opacity={0.2} color="#FF003C" />

      {/* Cosmic Nebula Lights */}
      <mesh ref={nebulaRef} position={[-20, 15, -50]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.03} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[20, -15, -60]}>
        <planeGeometry args={[80, 80]} />
        <meshBasicMaterial color="#FF003C" transparent opacity={0.02} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

interface SceneProps {
  children: React.ReactNode;
}

export function Scene({ children }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // Crucial: lets you click the UI beneath! Robot uses global DOM listeners now.
        zIndex: 9999,
      }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <SpaceBackground />
        
        {/* Soft studio lighting to make Baymax look solid and bright */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-10, 10, -10]} intensity={1.0} color="#ffffff" />
        
        {/* Colorful rim lights */}
        <pointLight position={[3, 3, 2]} intensity={2} color="#FFD700" distance={10} />
        <pointLight position={[-3, -3, 2]} intensity={2} color="#00F0FF" distance={10} />
        
        <Environment preset="city" />
        
        {children}
      </Suspense>
    </Canvas>
  );
}
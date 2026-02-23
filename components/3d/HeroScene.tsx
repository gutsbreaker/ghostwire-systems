'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Float, MeshPortalMaterial, RoundedBox, Stars, Sparkles, MeshTransmissionMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

function PortalExplorerBot() {
  const botRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (!botRef.current) return;
    const targetX = (state.pointer.x * 3);
    const targetY = (state.pointer.y * 2);
    botRef.current.position.x = THREE.MathUtils.damp(botRef.current.position.x, targetX, 4, delta);
    botRef.current.position.y = THREE.MathUtils.damp(botRef.current.position.y, targetY, 4, delta);
    botRef.current.rotation.y = THREE.MathUtils.damp(botRef.current.rotation.y, (state.pointer.x * Math.PI) / 4, 4, delta);
    botRef.current.rotation.x = THREE.MathUtils.damp(botRef.current.rotation.x, -(state.pointer.y * Math.PI) / 4, 4, delta);
    botRef.current.rotation.z = THREE.MathUtils.damp(botRef.current.rotation.z, -state.pointer.x * 0.5, 4, delta);
  });

  return (
    <group ref={botRef} scale={0.6}>
      <mesh position={[0, 0, 0]}><capsuleGeometry args={[0.4, 0.6, 16, 16]} /><meshStandardMaterial color="#E0E5EC" roughness={0.2} metalness={0.8} /></mesh>
      <mesh position={[0, 0.2, 0.35]}><boxGeometry args={[0.5, 0.2, 0.2]} /><meshBasicMaterial color="#00F0FF" /></mesh>
      <mesh position={[0, 0, -0.4]}><boxGeometry args={[0.4, 0.6, 0.2]} /><meshStandardMaterial color="#2A2D34" /></mesh>
      <mesh position={[-0.15, -0.4, -0.4]}><coneGeometry args={[0.1, 0.4, 16]} /><meshBasicMaterial color="#39FF14" transparent opacity={0.8} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0.15, -0.4, -0.4]}><coneGeometry args={[0.1, 0.4, 16]} /><meshBasicMaterial color="#39FF14" transparent opacity={0.8} blending={THREE.AdditiveBlending} /></mesh>
    </group>
  );
}

function AbstractDataNode({ position, color }: { position: [number, number, number], color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={ref} position={position} scale={0.5}>
      <mesh><boxGeometry args={[1, 0.3, 0.3]} /><meshStandardMaterial color={color} roughness={0.1} metalness={0.8} /></mesh>
      <mesh><boxGeometry args={[0.3, 1, 0.3]} /><meshStandardMaterial color={color} roughness={0.1} metalness={0.8} /></mesh>
      <mesh><boxGeometry args={[0.3, 0.3, 1]} /><meshStandardMaterial color={color} roughness={0.1} metalness={0.8} /></mesh>
    </group>
  );
}

function InteractiveTablet() {
  const [hovered, setHovered] = useState(false);

  return (
    <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <RoundedBox args={[4.2, 2.8, 0.1]} radius={0.15} smoothness={4}>
        <meshStandardMaterial color="#0A0A0A" roughness={0.1} metalness={0.9} />
      </RoundedBox>
      <mesh position={[0, 0, 0.051]}>
        <planeGeometry args={[4.0, 2.6]} />
        <MeshPortalMaterial blend={hovered ? 0.05 : 0}>
          <color attach="background" args={['#020202']} />
          <Stars radius={50} depth={50} count={2000} factor={4} saturation={1} fade speed={1} />
          <Sparkles count={50} scale={10} size={2} color="#BF00FF" speed={0.4} />
          <Text position={[-1.5, 1, -2]} fontSize={0.3} color="#39FF14" font="/fonts/Orbitron.ttf">TX_APPROVED</Text>
          <Text position={[1.5, -1, -3]} fontSize={0.2} color="#00F0FF" font="/fonts/Orbitron.ttf">SYNCING_NODES...</Text>
          <PortalExplorerBot />
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#00F0FF" />
      <directionalLight position={[-10, -10, -10]} intensity={1} color="#BF00FF" />

      {/* FIX: Changed snap to true for strict TypeScript compiler */}
      <PresentationControls
        global
        config={{ mass: 2, tension: 400, friction: 26 }}
        snap={true} 
        rotation={[0, 0.1, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]} 
        azimuth={[-Math.PI / 3, Math.PI / 3]} 
      >
        <Float rotationIntensity={0.5} floatIntensity={1.5} speed={2}>
          <AbstractDataNode position={[-3, 1.5, -1]} color="#39FF14" />
          <AbstractDataNode position={[3, -1.5, 0]} color="#00F0FF" />
          <AbstractDataNode position={[-2.5, -2, -2]} color="#BF00FF" />
          
          <Float rotationIntensity={1} floatIntensity={2} speed={3}>
            <RoundedBox args={[1.6, 1.0, 0.05]} radius={0.05} position={[2.5, 1.2, 1.5]} rotation={[0.2, -0.4, 0.1]}>
               <MeshTransmissionMaterial thickness={0.5} roughness={0.1} transmission={1} ior={1.5} color="#BF00FF" />
            </RoundedBox>
          </Float>

          <InteractiveTablet />
        </Float>
      </PresentationControls>
    </Canvas>
  );
}
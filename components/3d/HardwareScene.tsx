'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, PresentationControls, RoundedBox, Cylinder, Box } from '@react-three/drei';

export function HardwareScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#00F0FF" />
      <directionalLight position={[-10, -10, -10]} intensity={1} color="#BF00FF" />
      <directionalLight position={[0, 10, -10]} intensity={1.5} color="#39FF14" />

      {/* FIX: Changed snap to true for strict TypeScript compiler */}
      <PresentationControls 
        global 
        config={{ mass: 2, tension: 400, friction: 26 }} 
        snap={true} 
        rotation={[0.2, -0.4, 0]} 
        polar={[-Math.PI / 3, Math.PI / 3]} 
        azimuth={[-Math.PI / 2, Math.PI / 2]}
      >
        <Float rotationIntensity={1.5} floatIntensity={2} speed={2}>
          <RoundedBox args={[2.5, 0.4, 2]} position={[0, -1, 0]} radius={0.1} smoothness={4}>
             <meshStandardMaterial color="#1A1A1A" roughness={0.2} metalness={0.8} />
          </RoundedBox>

          <Float rotationIntensity={0.5} floatIntensity={1} speed={3}>
            <RoundedBox args={[2.2, 1.4, 0.1]} position={[0, 0.6, 0.5]} rotation={[-0.2, 0, 0]} radius={0.05}>
               <meshStandardMaterial color="#0A0A0A" roughness={0.1} metalness={0.9} />
            </RoundedBox>
            <mesh position={[0, 0.6, 0.56]} rotation={[-0.2, 0, 0]}>
              <planeGeometry args={[2.0, 1.2]} />
              <meshBasicMaterial color="#00F0FF" transparent opacity={0.2} />
            </mesh>
          </Float>

          <Float rotationIntensity={2} floatIntensity={3} speed={4}>
            <group position={[2, 0.5, 0.5]} rotation={[0.5, -0.5, 0.2]}>
              <Cylinder args={[0.15, 0.15, 1]} position={[0, -0.2, 0]}>
                <meshStandardMaterial color="#2A2D34" roughness={0.4} />
              </Cylinder>
              <Box args={[0.4, 0.3, 0.6]} position={[0, 0.4, 0.2]}>
                <meshStandardMaterial color="#1A1A1A" />
              </Box>
              <mesh position={[0, 0.4, 0.51]}>
                <planeGeometry args={[0.3, 0.1]} />
                <meshBasicMaterial color="#FF003C" />
              </mesh>
            </group>
          </Float>

          <Float rotationIntensity={1} floatIntensity={1.5} speed={2.5}>
            <Cylinder args={[0.4, 0.4, 0.8]} position={[-1.8, 0, -0.5]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
               <meshStandardMaterial color="#F0F0F0" roughness={0.9} />
            </Cylinder>
            <Cylinder args={[0.1, 0.1, 0.82]} position={[-1.8, 0, -0.5]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
               <meshStandardMaterial color="#0A0A0A" />
            </Cylinder>
          </Float>

          <mesh position={[1, -0.2, -1]}><sphereGeometry args={[0.1]} /><meshBasicMaterial color="#39FF14" /></mesh>
          <mesh position={[-1, 1.5, -0.5]}><sphereGeometry args={[0.08]} /><meshBasicMaterial color="#BF00FF" /></mesh>
          <mesh position={[0, 1.8, 1]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#00F0FF" /></mesh>

        </Float>
      </PresentationControls>
    </Canvas>
  );
}
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, RoundedBox, Cylinder, Box, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D PRIMITIVES FOR HARDWARE ---

const materials = {
  darkMetal: new THREE.MeshStandardMaterial({ color: '#1A1A1A', roughness: 0.2, metalness: 0.8 }),
  blackPlastic: new THREE.MeshStandardMaterial({ color: '#0A0A0A', roughness: 0.6, metalness: 0.3 }),
  screenCyan: new THREE.MeshBasicMaterial({ color: '#00F0FF' }),
  screenRed: new THREE.MeshBasicMaterial({ color: '#FF003C' }),
  screenPurple: new THREE.MeshBasicMaterial({ color: '#BF00FF' }),
  paper: new THREE.MeshStandardMaterial({ color: '#F0F0F0', roughness: 0.9 }),
  laser: new THREE.MeshBasicMaterial({ color: '#39FF14', transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending }),
};

function CashDrawer({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={new THREE.Vector3(...position)}>
      <RoundedBox args={[2.5, 0.3, 2.5]} radius={0.05} material={materials.darkMetal} />
      {/* Drawer line */}
      <Box args={[2.4, 0.02, 0.05]} position={[0, 0, 1.25]} material={materials.blackPlastic} />
    </group>
  );
}

function Tablet({ position = [0, 0, 0], rotation = [0, 0, 0], screenColor = materials.screenCyan }: { position?: [number, number, number], rotation?: [number, number, number], screenColor?: any }) {
  return (
    <group position={new THREE.Vector3(...position)} rotation={new THREE.Euler(...rotation)}>
      <Cylinder args={[0.2, 0.3, 0.6]} position={[0, 0.3, 0]} material={materials.blackPlastic} />
      <RoundedBox args={[1.8, 1.2, 0.1]} position={[0, 0.8, 0.1]} rotation={[-0.2, 0, 0]} radius={0.05} material={materials.darkMetal} />
      <mesh position={[0, 0.8, 0.16]} rotation={[-0.2, 0, 0]} material={screenColor}>
        <planeGeometry args={[1.6, 1.0]} />
      </mesh>
    </group>
  );
}

function ThermalPrinter({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={new THREE.Vector3(...position)}>
      <Box args={[0.6, 0.5, 0.8]} position={[0, 0.25, 0]} material={materials.blackPlastic} />
      <Cylinder args={[0.2, 0.2, 0.4]} position={[0, 0.55, -0.1]} rotation={[0, 0, Math.PI / 2]} material={materials.paper} />
      <Box args={[0.4, 0.3, 0.02]} position={[0, 0.6, 0.1]} rotation={[-0.5, 0, 0]} material={materials.paper} />
      <mesh position={[0.2, 0.4, 0.41]} material={materials.laser}><circleGeometry args={[0.03, 16]} /></mesh>
    </group>
  );
}

function BarcodeScanner({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={new THREE.Vector3(...position)}>
      {/* Base */}
      <Cylinder args={[0.15, 0.2, 0.1]} position={[0, 0.05, 0]} material={materials.blackPlastic} />
      {/* Handle */}
      <Box args={[0.1, 0.5, 0.15]} position={[0, 0.3, 0]} rotation={[0.3, 0, 0]} material={materials.darkMetal} />
      {/* Head */}
      <Box args={[0.25, 0.25, 0.5]} position={[0, 0.6, 0.1]} material={materials.blackPlastic} />
      {/* Laser line */}
      <Box args={[1.5, 0.02, 0.02]} position={[0, 0.6, 0.5]} material={materials.laser} />
    </group>
  );
}

function PCSet({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={new THREE.Vector3(...position)}>
      {/* Monitor Base */}
      <Box args={[0.6, 0.05, 0.4]} position={[0, 0.025, -0.5]} material={materials.blackPlastic} />
      <Cylinder args={[0.05, 0.05, 0.8]} position={[0, 0.4, -0.5]} material={materials.darkMetal} />
      {/* Monitor Screen (22") */}
      <RoundedBox args={[2.4, 1.4, 0.1]} position={[0, 1.0, -0.4]} radius={0.02} material={materials.darkMetal} />
      <mesh position={[0, 1.0, -0.34]} material={materials.screenPurple}><planeGeometry args={[2.3, 1.3]} /></mesh>
      
      {/* Keyboard & Mouse */}
      <Box args={[1.2, 0.05, 0.4]} position={[-0.2, 0.025, 0.4]} material={materials.blackPlastic} />
      <RoundedBox args={[0.2, 0.05, 0.3]} position={[0.6, 0.025, 0.4]} radius={0.05} material={materials.darkMetal} />
      <mesh position={[0.6, 0.06, 0.4]} rotation={[-Math.PI/2, 0, 0]} material={materials.laser}><circleGeometry args={[0.02, 16]} /></mesh>

      {/* CPU Tower */}
      <Box args={[0.6, 1.5, 1.5]} position={[-1.8, 0.75, 0]} material={materials.darkMetal} />
      <Box args={[0.05, 1.2, 0.05]} position={[-1.5, 0.75, 0.76]} material={materials.screenPurple} />
    </group>
  );
}

function SoftwareOnly() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if(ref.current) { ref.current.rotation.y += delta * 0.5; ref.current.rotation.x += delta * 0.2; }});
  return (
    <group ref={ref}>
      <mesh><boxGeometry args={[1, 1, 1]} /><meshBasicMaterial color="#39FF14" wireframe /></mesh>
      <mesh><boxGeometry args={[0.8, 0.8, 0.8]} /><meshBasicMaterial color="#00F0FF" transparent opacity={0.5} /></mesh>
    </group>
  );
}

// --- MAIN SHOWCASE COMPONENT ---

export function HardwareShowcase({ activePackage }: { activePackage: string }) {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 10, 5]} intensity={2} angle={0.5} penumbra={1} castShadow />
        <Environment preset="city" />
        
       <PresentationControls global rotation={[0.1, -0.3, 0]} polar={[-Math.PI / 4, Math.PI / 4]} azimuth={[-Math.PI / 2, Math.PI / 2]} snap>
          <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
            
            {/* SOFTWARE ONLY */}
            {activePackage === 'software' && <SoftwareOnly />}

            {/* F&B: TABLET PKG */}
            {activePackage === 'fnb-tablet' && (
              <group>
                <CashDrawer position={[0, 0.15, 0]} />
                <Tablet position={[0, 0.3, 0]} />
                <ThermalPrinter position={[1.6, 0, 0]} />
              </group>
            )}

            {/* F&B: KDS */}
            {activePackage === 'fnb-kds' && (
              <group>
                <Tablet position={[0, 0, 0]} rotation={[0.2, 0, 0]} screenColor={materials.screenRed} />
              </group>
            )}

            {/* F&B: CFD */}
            {activePackage === 'fnb-cfd' && (
              <group>
                <Tablet position={[0, 0, 0]} rotation={[0, Math.PI, 0]} screenColor={materials.screenCyan} />
              </group>
            )}

            {/* F&B: WHOLE SETUP */}
            {activePackage === 'fnb-whole' && (
              <group>
                <CashDrawer position={[0, 0.15, 0]} />
                <Tablet position={[0, 0.3, 0]} />
                <Tablet position={[0, 0.3, -0.5]} rotation={[0, Math.PI, 0]} screenColor={materials.screenCyan} /> {/* CFD */}
                <ThermalPrinter position={[1.6, 0, 0]} />
                <Tablet position={[-2.5, 1.5, -1]} rotation={[0.2, 0.5, 0]} screenColor={materials.screenRed} /> {/* Floating KDS */}
              </group>
            )}

            {/* RETAIL: PC SET */}
            {activePackage === 'retail-pc' && (
              <group>
                <CashDrawer position={[0, 0.15, 0]} />
                <PCSet position={[0, 0.3, 0]} />
                <ThermalPrinter position={[1.6, 0, 0]} />
                <BarcodeScanner position={[-1.5, 0, 1]} />
              </group>
            )}

            {/* RETAIL: TABLET SET */}
            {activePackage === 'retail-tablet' && (
              <group>
                <CashDrawer position={[0, 0.15, 0]} />
                <Tablet position={[0, 0.3, 0]} screenColor={materials.screenPurple} />
                <ThermalPrinter position={[1.6, 0, 0]} />
                <BarcodeScanner position={[-1.5, 0, 1]} />
              </group>
            )}

            {/* RETAIL: WHOLE SETUP */}
            {activePackage === 'retail-whole' && (
              <group>
                <CashDrawer position={[0, 0.15, 0]} />
                <PCSet position={[0, 0.3, 0]} />
                <Tablet position={[0, 0.3, -1]} rotation={[0, Math.PI, 0]} screenColor={materials.screenCyan} /> {/* CFD */}
                <ThermalPrinter position={[1.6, 0, 0]} />
                <BarcodeScanner position={[-1.5, 0, 1]} />
              </group>
            )}

            {/* Ground Shadow */}
            <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          </Float>
        </PresentationControls>
      </Canvas>
    </div>
  );
}
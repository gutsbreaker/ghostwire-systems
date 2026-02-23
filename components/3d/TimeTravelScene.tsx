'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, RoundedBox, Sphere, MeshPortalMaterial, Environment, Capsule, Box } from '@react-three/drei';
import * as THREE from 'three';

// --- CUSTOM HOOK: SCROLL PROGRESS ---
function useSectionScroll() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('lusion-scroll-section');
      if (el) {
        const scrollY = window.scrollY;
        const offsetTop = el.offsetTop;
        const maxScroll = el.offsetHeight - window.innerHeight;
        let p = (scrollY - offsetTop) / maxScroll;
        setProgress(Math.max(0, Math.min(1, p)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return progress;
}

// --- CUSTOM HOOK: BULLET TIME (SLOW MO ON HOLD) ---
function useSlowTime() {
  const timeRef = useRef(0);
  const targetSpeed = useRef(1);
  const currentSpeed = useRef(1);

  useEffect(() => {
    const handleDown = () => { targetSpeed.current = 0.05; }; // Matrix slow-mo
    const handleUp = () => { targetSpeed.current = 1.0; };    // Normal speed
    
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
    };
  }, []);

  useFrame((_, delta) => {
    currentSpeed.current = THREE.MathUtils.damp(currentSpeed.current, targetSpeed.current, 5, delta);
    timeRef.current += delta * currentSpeed.current;
  });

  return timeRef;
}

// --- THE ASTRONAUT ---
function Astronaut({ timeRef }: { timeRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);

  const materials = useMemo(() => ({
    suit: new THREE.MeshStandardMaterial({ color: '#E0E5EC', roughness: 0.2, metalness: 0.1 }),
    visor: new THREE.MeshStandardMaterial({ color: '#0A0A0A', roughness: 0.1, metalness: 0.9, envMapIntensity: 2 }),
    joints: new THREE.MeshStandardMaterial({ color: '#2A2D34', roughness: 0.8 }),
  }), []);

  useFrame((state) => {
    if (!group.current || !head.current || !leftArm.current || !rightArm.current) return;
    const t = timeRef.current; // Driven by slow-mo time

    // Floating body animation
    group.current.position.y = Math.sin(t * 1.5) * 0.15 - 0.5;
    group.current.position.x = Math.cos(t * 1) * 0.1;

    // Head flawlessly tracks the mouse cursor
    const targetX = state.pointer.x * 1.5;
    const targetY = state.pointer.y * 1.5;
    head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, targetX, 0.1);
    head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -targetY, 0.1);

    // Arms waving in zero gravity
    leftArm.current.rotation.z = Math.sin(t * 2) * 0.2 + 0.5;
    leftArm.current.rotation.x = Math.cos(t * 1.5) * 0.2;
    rightArm.current.rotation.z = -Math.sin(t * 2.2) * 0.2 - 0.5;
    rightArm.current.rotation.x = Math.cos(t * 1.7) * 0.2;
  });

  return (
    <group ref={group} scale={0.8}>
      <Capsule args={[0.3, 0.5, 16, 16]} material={materials.suit} position={[0, -0.2, 0]} />
      <Box args={[0.4, 0.5, 0.2]} position={[0, -0.1, -0.3]} material={materials.suit} /> 
      
      <group ref={head} position={[0, 0.5, 0]}>
        <Sphere args={[0.32, 32, 32]} material={materials.suit} />
        {/* Glowing Neon Visor Reflection */}
        <mesh position={[0, 0.02, 0.2]}>
          <boxGeometry args={[0.45, 0.35, 0.2]} />
          <primitive object={materials.visor} attach="material" />
        </mesh>
      </group>

      <group ref={leftArm} position={[0.4, 0.2, 0]}>
        <Sphere args={[0.12]} material={materials.joints} />
        <Capsule args={[0.08, 0.4]} position={[0.2, -0.2, 0]} rotation={[0, 0, -Math.PI/4]} material={materials.suit} />
      </group>

      <group ref={rightArm} position={[-0.4, 0.2, 0]}>
        <Sphere args={[0.12]} material={materials.joints} />
        <Capsule args={[0.08, 0.4]} position={[-0.2, -0.2, 0]} rotation={[0, 0, Math.PI/4]} material={materials.suit} />
      </group>

      <group position={[0.15, -0.7, 0]}><Capsule args={[0.1, 0.5]} material={materials.suit} /></group>
      <group position={[-0.15, -0.7, 0]}><Capsule args={[0.1, 0.5]} material={materials.suit} /></group>
    </group>
  );
}

// --- THE IPAD FRAME & PORTAL ---
function LusionDevice() {
  const deviceRef = useRef<THREE.Group>(null);
  const progress = useSectionScroll();
  const timeRef = useSlowTime();
  const { viewport } = useThree(); // Use viewport to calculate exact screen width

  useFrame((state, delta) => {
    if (!deviceRef.current) return;

    // 1. SCROLL SCRUBBING LOGIC
    // Calculate the perfect Left-Side position based on screen size
    const restingX = -(viewport.width / 4); // Placed exactly at 25% of the screen width (left half)
    
    let targetY = -8; // Starts offscreen bottom
    let targetX = restingX;
    let targetScale = 1;

    // Animate based on scroll progress
    if (progress > 0 && progress < 0.2) {
      // Entering screen (flies up)
      const p = progress / 0.2;
      targetY = -8 + (p * 8); 
    } else if (progress >= 0.2 && progress <= 0.8) {
      // Resting on screen comfortably
      targetY = 0;
    } else if (progress > 0.8) {
      // Exiting screen (flies up and slightly towards camera)
      const p = (progress - 0.8) / 0.2;
      targetY = p * 4;
      targetScale = 1 + (p * 0.1);
    }

    // Apply movement smoothly
    deviceRef.current.position.y = THREE.MathUtils.damp(deviceRef.current.position.y, targetY, 4, delta);
    deviceRef.current.position.x = THREE.MathUtils.damp(deviceRef.current.position.x, targetX, 4, delta);
    deviceRef.current.scale.setScalar(THREE.MathUtils.damp(deviceRef.current.scale.x, targetScale, 4, delta));

    // 2. MOUSE HOVER PARALLAX (Tilting the iPad)
    const tiltX = state.pointer.y * 0.15;
    const tiltY = state.pointer.x * 0.2;
    deviceRef.current.rotation.x = THREE.MathUtils.damp(deviceRef.current.rotation.x, tiltX, 5, delta);
    deviceRef.current.rotation.y = THREE.MathUtils.damp(deviceRef.current.rotation.y, tiltY + 0.1, 5, delta); 
  });

  return (
    <group ref={deviceRef}>
      <Float floatIntensity={0.5} rotationIntensity={0.2} speed={2}>
        
        {/* Sleek Dark Cyberpunk iPad Bezel */}
        <RoundedBox args={[4.8, 3.4, 0.1]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color="#0A0A0A" roughness={0.1} metalness={0.9} />
        </RoundedBox>

        {/* The Screen Portal */}
        <mesh position={[0, 0, 0.051]}>
          <planeGeometry args={[4.5, 3.1]} />
          <MeshPortalMaterial blend={0}>
            
            {/* Environment inside the portal - Deep Space */}
            <color attach="background" args={['#02050A']} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
            
            {/* Neon Rim Lights for Cyberpunk Vibe inside the portal */}
            <pointLight position={[-3, 0, 2]} intensity={5} color="#00F0FF" distance={10} />
            <pointLight position={[3, 0, 2]} intensity={5} color="#BF00FF" distance={10} />
            
            <Environment preset="city" />

            {/* Glowing Earth */}
            <Sphere args={[5, 64, 64]} position={[0, -5.5, -3]}>
              <meshStandardMaterial color="#0A4D8C" emissive="#00F0FF" emissiveIntensity={0.2} roughness={0.4} />
            </Sphere>
            {/* Earth Atmosphere Halo */}
            <mesh position={[0, -5.5, -3.1]}>
              <sphereGeometry args={[5.2, 32, 32]} />
              <meshBasicMaterial color="#00F0FF" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
            </mesh>

            {/* The Hero Astronaut */}
            <Astronaut timeRef={timeRef} />

          </MeshPortalMaterial>
        </mesh>

      </Float>
    </group>
  );
}

export function TimeTravelScene() {
  return (
    // Transparent Canvas lets the bg-deep-black from HTML show through perfectly
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }} style={{ pointerEvents: 'none' }}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <LusionDevice />
    </Canvas>
  );
}
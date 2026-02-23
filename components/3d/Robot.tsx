'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Trail, Sphere, Cylinder, Capsule, Box } from '@react-three/drei';
import * as THREE from 'three';
import { useRobotStore } from '@/lib/store';

// --- HIGHLY DETAILED & ANIMATED POS ASSISTANT BOT ---
function ChubbyBot({ actionState }: { actionState: string }) {
  const wrapperRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const jetpackFlameRef = useRef<THREE.Mesh>(null);
  const scannerBeamRef = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => ({
    body: new THREE.MeshStandardMaterial({ color: '#E0E5EC', roughness: 0.2, metalness: 0.2 }),
    darkMetal: new THREE.MeshStandardMaterial({ color: '#2A2D34', roughness: 0.6, metalness: 0.8 }),
  redArmor: new THREE.MeshPhysicalMaterial({ color: '#FF003C', roughness: 0.3, metalness: 0.6, clearcoat: 1.0 }),
    blueArmor: new THREE.MeshPhysicalMaterial({ color: '#00F0FF', roughness: 0.3, metalness: 0.6, clearcoat: 1.0 }),
    yellowArmor: new THREE.MeshPhysicalMaterial({ color: '#FFD700', roughness: 0.3, metalness: 0.6, clearcoat: 1.0 }),
    eye: new THREE.MeshBasicMaterial({ color: '#0A0A0A' }),
    glowVisor: new THREE.MeshBasicMaterial({ color: '#00F0FF', transparent: true, opacity: 0.8 }),
    scannerLaser: new THREE.MeshBasicMaterial({ color: '#39FF14', transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending }),
  }), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (wrapperRef.current && actionState !== 'spinning') {
      wrapperRef.current.rotation.y = THREE.MathUtils.lerp(wrapperRef.current.rotation.y, 0, 0.1);
    }

    if (actionState === 'crashing') {
      if (headRef.current) headRef.current.rotation.y += 0.4;
      if (rightArmRef.current) rightArmRef.current.rotation.z = Math.sin(time * 20) * 0.5 + 2; 
      if (leftArmRef.current) leftArmRef.current.rotation.z = -Math.sin(time * 20) * 0.5 - 2;
      if (jetpackFlameRef.current) jetpackFlameRef.current.scale.set(0, 0, 0); 
      if (scannerBeamRef.current) scannerBeamRef.current.scale.set(0, 0, 0);
    } 
    else if (actionState === 'escaping' || actionState === 'dodging') {
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 2.5 + Math.sin(time * 30) * 0.2, 0.2); 
        rightArmRef.current.rotation.x = Math.sin(time * 20) * 0.2;
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -2.5 - Math.sin(time * 30) * 0.2, 0.2);
        leftArmRef.current.rotation.x = -Math.sin(time * 20) * 0.2;
      }
      if (headRef.current) headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0, 0.2);
      if (jetpackFlameRef.current) jetpackFlameRef.current.scale.set(1.5, 2 + Math.sin(time * 30), 1.5); 
      if (scannerBeamRef.current) scannerBeamRef.current.scale.set(0, 0, 0);
    } 
    else if (actionState === 'climbing') {
      if (rightArmRef.current) rightArmRef.current.rotation.z = Math.sin(time * 2) * 0.2 + 0.5;
      if (leftArmRef.current) leftArmRef.current.rotation.z = -Math.sin(time * 2) * 0.2 - 0.5;
      if (jetpackFlameRef.current) jetpackFlameRef.current.scale.set(0.5, 0.5 + Math.sin(time * 10) * 0.2, 0.5); 
      if (scannerBeamRef.current) scannerBeamRef.current.scale.set(0, 0, 0);
    } 
    else if (actionState === 'waving') {
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 2.8 + Math.sin(time * 15) * 0.6, 0.2);
        rightArmRef.current.rotation.x = 0;
      }
      if (leftArmRef.current) leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.2, 0.1);
      if (headRef.current) headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, Math.sin(time * 2) * 0.2, 0.1);
      if (jetpackFlameRef.current) jetpackFlameRef.current.scale.set(1, 1 + Math.sin(time * 5) * 0.2, 1);
      if (scannerBeamRef.current) scannerBeamRef.current.scale.set(0, 0, 0);
    } 
    else if (actionState === 'scanning') {
      if (rightArmRef.current) rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.2, 0.1);
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -1.0, 0.1);
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.5 + Math.sin(time * 3) * 0.5, 0.1); 
      }
      if (headRef.current) headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, Math.sin(time * 3) * 0.3, 0.1); 
      if (scannerBeamRef.current) {
        scannerBeamRef.current.scale.set(1, 1, 1 + Math.sin(time * 15) * 0.2); 
      }
    } 
    else if (actionState === 'spinning') {
      if (wrapperRef.current) wrapperRef.current.rotation.y += 0.15;
      if (rightArmRef.current) rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 1.5, 0.2);
      if (leftArmRef.current) leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -1.5, 0.2);
      if (scannerBeamRef.current) scannerBeamRef.current.scale.set(0, 0, 0);
    } 
    else if (actionState === 'sleeping') {
      if (headRef.current) {
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0.3, 0.1); 
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0, 0.1);
      }
      if (rightArmRef.current) rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.1, 0.1);
      if (leftArmRef.current) leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.1, 0.1);
      if (jetpackFlameRef.current) jetpackFlameRef.current.scale.set(0.3, 0.3 + Math.sin(time * 2) * 0.1, 0.3); 
      if (scannerBeamRef.current) scannerBeamRef.current.scale.set(0, 0, 0);
      materials.glowVisor.opacity = 0.2; 
    } 
    else {
      materials.glowVisor.opacity = 0.8;
      if (headRef.current) headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, 0.1);
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.2 + Math.sin(time * 2) * 0.05, 0.1);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.1, 0.1);
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.2 - Math.sin(time * 2) * 0.05, 0.1);
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.1, 0.1);
      }
      if (headRef.current) headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, Math.sin(time * 1.5) * 0.2, 0.05); 
      if (bodyRef.current) bodyRef.current.position.y = Math.sin(time * 3) * 0.05; 
      if (jetpackFlameRef.current) jetpackFlameRef.current.scale.set(1, 1 + Math.sin(time * 10) * 0.2, 1); 
      if (scannerBeamRef.current) scannerBeamRef.current.scale.set(0, 0, 0);
    }
  });

  return (
    <group ref={wrapperRef} scale={0.7} position={[0, -0.2, 0]}>
      {/* BODY */}
      <group ref={bodyRef}>
        <Capsule args={[0.5, 0.6, 32, 32]} material={materials.body} />
        <mesh position={[0, 0.1, 0.42]} material={materials.redArmor}><boxGeometry args={[0.55, 0.45, 0.2]} /></mesh>
        <mesh position={[0, 0.1, 0.53]} material={materials.darkMetal}><boxGeometry args={[0.2, 0.2, 0.02]} /></mesh>
        <mesh position={[0, -0.25, 0.48]} material={materials.glowVisor}><capsuleGeometry args={[0.08, 0.1, 8, 16]} /></mesh>
      </group>

      {/* HEAD */}
      <group ref={headRef} position={[0, 0.95, 0]}>
        <Cylinder args={[0.15, 0.2, 0.2]} position={[0, -0.2, 0]} material={materials.darkMetal} />
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.28, 0.35, 32, 32]} />
          <primitive object={materials.body} attach="material" />
        </mesh>
        <mesh position={[0, 0.05, 0.26]} material={materials.darkMetal}><boxGeometry args={[0.6, 0.2, 0.1]} /></mesh>
        
        <group position={[0, 0.05, 0.32]}>
          {actionState === 'crashing' ? (
            <group>
              <mesh position={[-0.15, 0, 0]} rotation={[0, 0, Math.PI/4]} material={materials.redArmor}><boxGeometry args={[0.1, 0.02, 0.01]}/></mesh>
              <mesh position={[-0.15, 0, 0]} rotation={[0, 0, -Math.PI/4]} material={materials.redArmor}><boxGeometry args={[0.1, 0.02, 0.01]}/></mesh>
              <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI/4]} material={materials.redArmor}><boxGeometry args={[0.1, 0.02, 0.01]}/></mesh>
              <mesh position={[0.15, 0, 0]} rotation={[0, 0, -Math.PI/4]} material={materials.redArmor}><boxGeometry args={[0.1, 0.02, 0.01]}/></mesh>
            </group>
          ) : actionState === 'sleeping' ? (
            <group>
               <mesh position={[-0.15, 0, 0]} material={materials.glowVisor}><boxGeometry args={[0.08, 0.01, 0.01]}/></mesh>
               <mesh position={[0.15, 0, 0]} material={materials.glowVisor}><boxGeometry args={[0.08, 0.01, 0.01]}/></mesh>
            </group>
          ) : (
            <group>
              <Sphere args={[0.03]} position={[-0.15, 0, 0]} material={materials.glowVisor} />
              <Sphere args={[0.03]} position={[0.15, 0, 0]} material={materials.glowVisor} />
              <Cylinder args={[0.005, 0.005, 0.3]} rotation={[0, 0, Math.PI / 2]} material={materials.glowVisor} />
            </group>
          )}
        </group>
      </group>

      {/* RIGHT ARM */}
      <group position={[0.65, 0.4, 0]} ref={rightArmRef}>
        <Sphere args={[0.18]} material={materials.blueArmor} />
        <Cylinder args={[0.16, 0.16, 0.1]} rotation={[0, 0, Math.PI/2]} material={materials.darkMetal} />
        <group position={[0, -0.35, 0]}>
          <Capsule args={[0.12, 0.4]} material={materials.body} />
          <Sphere args={[0.13]} position={[0, -0.28, 0]} material={materials.yellowArmor} />
          <Cylinder args={[0.03, 0.03, 0.1]} position={[-0.08, -0.38, 0]} rotation={[0, 0, 0.2]} material={materials.darkMetal} />
          <Cylinder args={[0.03, 0.03, 0.1]} position={[0.08, -0.38, 0]} rotation={[0, 0, -0.2]} material={materials.darkMetal} />
        </group>
      </group>

      {/* LEFT ARM */}
      <group position={[-0.65, 0.4, 0]} ref={leftArmRef}>
        <Sphere args={[0.18]} material={materials.blueArmor} />
        <Cylinder args={[0.16, 0.16, 0.1]} rotation={[0, 0, Math.PI/2]} material={materials.darkMetal} />
        <group position={[0, -0.35, 0]}>
          <Capsule args={[0.12, 0.4]} material={materials.body} />
          <Box args={[0.18, 0.2, 0.18]} position={[0, -0.25, 0]} material={materials.darkMetal} />
          <mesh position={[0, -0.35, 0.0]} rotation={[Math.PI/2, 0, 0]} material={materials.scannerLaser}>
            <circleGeometry args={[0.08, 16]} />
          </mesh>
          <mesh ref={scannerBeamRef} position={[0, -1.5, 0.0]} rotation={[0, 0, 0]}>
            <coneGeometry args={[0.5, 2.5, 16]} />
            <primitive object={materials.scannerLaser} attach="material" />
          </mesh>
        </group>
      </group>

      {/* LEGS */}
      <group position={[0.25, -0.8, 0]}>
        <Capsule args={[0.15, 0.3]} material={materials.body} />
        <mesh position={[0, -0.2, 0.1]} material={materials.yellowArmor}><boxGeometry args={[0.3, 0.18, 0.4]} /></mesh>
        <mesh position={[0, -0.1, 0.31]} material={materials.darkMetal}><boxGeometry args={[0.1, 0.05, 0.05]} /></mesh>
      </group>
      <group position={[-0.25, -0.8, 0]}>
        <Capsule args={[0.15, 0.3]} material={materials.body} />
        <mesh position={[0, -0.2, 0.1]} material={materials.yellowArmor}><boxGeometry args={[0.3, 0.18, 0.4]} /></mesh>
        <mesh position={[0, -0.1, 0.31]} material={materials.darkMetal}><boxGeometry args={[0.1, 0.05, 0.05]} /></mesh>
      </group>

      {/* JETPACK */}
      <group position={[0, 0.1, -0.45]}>
        <mesh material={materials.darkMetal}><boxGeometry args={[0.6, 0.7, 0.3]} /></mesh>
        <mesh position={[0, 0, 0.16]} material={materials.yellowArmor}><boxGeometry args={[0.4, 0.5, 0.1]} /></mesh>
        <Cylinder args={[0.12, 0.18, 0.3]} position={[-0.2, -0.4, 0]} material={materials.darkMetal} />
        <Cylinder args={[0.12, 0.18, 0.3]} position={[0.2, -0.4, 0]} material={materials.darkMetal} />
        <group position={[0, -0.7, 0]}>
          <mesh ref={jetpackFlameRef}>
            <coneGeometry args={[0.3, 0.8, 16]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      </group>
    </group>
  );
}


// --- MAIN CONTROLLER ---
export function Robot() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree(); 
  
  const [actionState, setActionState] = useState('idle');
  const [customTaunt, setCustomTaunt] = useState('');
  
  const lastStateChange = useRef(0);
  const tapStartTime = useRef(0);
  const [tapProgress, setTapProgress] = useState(0);
  
  // Get Chat State from store
  const { isChatting, chatMessage } = useRobotStore();
  
  const homeBasePos = useRef({ x: 0, y: 0 }); 
  const currentPos = useRef({ x: 0, y: 0 });
  const randomTarget = useRef({ x: 0, y: 0 });
  const escapeTarget = useRef<{x: number, y: number} | null>(null);
  const lastRandomChange = useRef(0);
  const prevPos = useRef({ x: 0, y: 0 });

  const globalMouse = useRef(new THREE.Vector2(-999, -999));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const asteroid = useRef({
    active: false, pos: new THREE.Vector3(0, 0, 0), vel: new THREE.Vector3(0, 0, 0),
    nextSpawn: 5, rot: new THREE.Vector3(0,0,0)
  });
  const asteroidRef = useRef<THREE.Group>(null);

  const panicTaunts = [
    "Ahhh! Evasive maneuvers! 💨", "Too close! 🚨", "Initiating retreat! 🏃‍♂️", 
    "Zoooom! ⚡", "Personal space violated! 🛡️"
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // FIX: Fetch live Zustand state inside the useFrame to avoid stale closures
    const store = useRobotStore.getState();
    const liveIsChatting = store.isChatting;
    const liveIsFlying = store.isFlying;
    const liveTargetPosition = store.targetPosition;
    
    const botWidth = 1.0;
    const botHeightTop = 2.2; 
    const botHeightBottom = 1.5; 
    
    const maxSafeX = (viewport.width / 2) - botWidth;
    const maxSafeYTop = (viewport.height / 2) - botHeightTop;
    const maxSafeYBottom = -(viewport.height / 2) + botHeightBottom;

    // --- CONTINUOUS MOUSE REPEL (Disabled if chatting!) ---
    const worldMouseX = (globalMouse.current.x * viewport.width) / 2;
    const worldMouseY = (globalMouse.current.y * viewport.height) / 2;
    const distToMouse = Math.hypot(currentPos.current.x - worldMouseX, currentPos.current.y - worldMouseY);

    if (distToMouse < 3.5 && !liveIsFlying && !liveIsChatting && actionState !== 'crashing' && actionState !== 'climbing') {
       const dx = currentPos.current.x - worldMouseX;
       const dy = currentPos.current.y - worldMouseY;
       const mag = Math.sqrt(dx*dx + dy*dy) || 1;
       const repelForce = (3.5 - distToMouse) * 0.15;

       let newTargetX = currentPos.current.x + (dx/mag) * repelForce;
       let newTargetY = currentPos.current.y + (dy/mag) * repelForce;

       newTargetX = Math.max(-maxSafeX, Math.min(maxSafeX, newTargetX));
       newTargetY = Math.max(maxSafeYBottom, Math.min(maxSafeYTop, newTargetY));

       escapeTarget.current = { x: newTargetX, y: newTargetY };
       
       if (actionState !== 'escaping') {
         setActionState('escaping'); 
         setCustomTaunt(panicTaunts[Math.floor(Math.random() * panicTaunts.length)]);
         lastStateChange.current = time;
       }
    }

    // --- ASTEROID LOGIC (Disabled if chatting) ---
    if (!asteroid.current.active && time > asteroid.current.nextSpawn && !liveIsFlying && !liveIsChatting && actionState !== 'crashing' && actionState !== 'climbing') {
      asteroid.current.active = true;
      const startRight = Math.random() > 0.5;
      asteroid.current.pos.set(
        startRight ? viewport.width / 2 + 3 : -viewport.width / 2 - 3,
        Math.random() * (viewport.height - 4) - (viewport.height / 2 - 2), 0
      );
      const targetY = currentPos.current.y + (Math.random() - 0.5);
      asteroid.current.vel.set(startRight ? -10 : 10, (targetY - asteroid.current.pos.y) * 2, 0).normalize().multiplyScalar(0.15 + Math.random() * 0.1); 
      asteroid.current.rot.set(Math.random(), Math.random(), Math.random());
    }

    if (asteroid.current.active && asteroidRef.current) {
      asteroid.current.pos.add(asteroid.current.vel);
      asteroidRef.current.position.copy(asteroid.current.pos);
      asteroidRef.current.rotation.x += asteroid.current.rot.x * 0.2;
      asteroidRef.current.rotation.y += asteroid.current.rot.y * 0.2;

      const distToAsteroid = Math.hypot(currentPos.current.x - asteroid.current.pos.x, currentPos.current.y - asteroid.current.pos.y);
      if (distToAsteroid < 1.8 && !liveIsChatting && actionState !== 'dodging' && actionState !== 'crashing' && actionState !== 'climbing' && !liveIsFlying) {
        if (Math.random() > 0.3) { 
          setActionState('dodging');
          setCustomTaunt("Whoa there! ☄️");
          const dodgeDir = asteroid.current.pos.y > currentPos.current.y ? -3 : 3;
          escapeTarget.current = { x: Math.max(-maxSafeX, Math.min(maxSafeX, currentPos.current.x)), y: Math.max(maxSafeYBottom, Math.min(maxSafeYTop, currentPos.current.y + dodgeDir)) };
          lastStateChange.current = time;
        } else {
          setActionState('crashing');
          setCustomTaunt("Armor breached! 😵💫");
          escapeTarget.current = { x: currentPos.current.x, y: -viewport.height / 2 - 3 }; 
          lastStateChange.current = time;
        }
      }
      if (Math.abs(asteroid.current.pos.x) > viewport.width / 2 + 4) {
        asteroid.current.active = false;
        asteroid.current.nextSpawn = time + 6 + Math.random() * 6;
        asteroidRef.current.position.set(0, 999, 0); 
      }
    }

    // --- IDLE RANDOM ANIMATION SELECTOR ---
    const isSpecialIdleState = ['idle', 'waving', 'spinning', 'scanning', 'sleeping'].includes(actionState);
    if (isSpecialIdleState && !liveIsFlying && !liveIsChatting && distToMouse > 4.0) {
      if (time - lastStateChange.current > 4 + Math.random() * 3) {
        const rand = Math.random();
        if (rand > 0.85) { setActionState('sleeping'); setCustomTaunt('Zzz... power saving...'); }
        else if (rand > 0.70) { setActionState('spinning'); setCustomTaunt('Wheeee! 🌀'); }
        else if (rand > 0.55) { setActionState('scanning'); setCustomTaunt('Scanning matrix... 📊'); }
        else if (rand > 0.40) { setActionState('waving'); setCustomTaunt('Hello human! 👋'); }
        else { setActionState('idle'); setCustomTaunt(''); }
        lastStateChange.current = time;
      }
    }

    // --- STATE MACHINE TIMERS ---
    if (actionState === 'crashing') {
      if (time - lastStateChange.current > 3.0) { 
        setActionState('climbing');
        setCustomTaunt("Rebooting systems... 🎈");
        currentPos.current.y = -viewport.height / 2 - 2.0; 
        escapeTarget.current = { x: currentPos.current.x, y: 0 }; 
      }
    } else if (actionState === 'climbing') {
      if (Math.abs(currentPos.current.y - (escapeTarget.current?.y || 0)) < 0.2) {
        setActionState('idle');
        setCustomTaunt("All systems nominal! ✨");
        setTimeout(() => setCustomTaunt(''), 3000);
      }
    } else if (actionState === 'tapping') {
      const progress = (time - tapStartTime.current) / 1.5; 
      setTapProgress(progress);
      if (progress < 0.4) groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0.2, 0.1); 
      else if (progress < 0.7) groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 1.5, 0.4); 
      else groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.1); 
      if (progress > 0.6 && progress < 0.65 && liveIsFlying) store.arrive();
      if (progress > 1) { setActionState('idle'); lastStateChange.current = time; setCustomTaunt(''); }
    } else if (actionState === 'dodging' || actionState === 'escaping') {
       if (distToMouse > 4.0 && time - lastStateChange.current > 1.5) {
          setActionState('idle');
          escapeTarget.current = null;
          homeBasePos.current = { x: currentPos.current.x, y: currentPos.current.y };
          setTimeout(() => setCustomTaunt(''), 2000);
       }
    } 

    // --- SMOOTH POSITION MOVEMENT ---
    let targetX = currentPos.current.x;
    let targetY = currentPos.current.y;
    let lerpSpeed = 0.05;

    // IF CHATTING: Anchor him Next to the Chatbox!
    if (liveIsChatting) {
      targetX = maxSafeX * 0.45; // Move to the right side
      targetY = maxSafeYBottom * 0.7; // Hover above bottom
      lerpSpeed = 0.08;
      if (actionState !== 'idle') setActionState('idle');
    }
    else if (liveIsFlying && liveTargetPosition) {
      targetX = (liveTargetPosition.x / window.innerWidth) * viewport.width - viewport.width / 2;
      targetY = -(liveTargetPosition.y / window.innerHeight) * viewport.height + viewport.height / 2;
      targetX = Math.max(-maxSafeX, Math.min(maxSafeX, targetX));
      targetY = Math.max(maxSafeYBottom, Math.min(maxSafeYTop, targetY));
      lerpSpeed = 0.08;
      if (Math.abs(currentPos.current.x - targetX) < 0.2 && Math.abs(currentPos.current.y - targetY) < 0.2 && actionState !== 'tapping') {
        setActionState('tapping');
        tapStartTime.current = time;
        homeBasePos.current = { x: targetX, y: targetY }; 
      }
    } else if ((actionState === 'escaping' || actionState === 'dodging' || actionState === 'crashing' || actionState === 'climbing') && escapeTarget.current) {
      targetX = escapeTarget.current.x;
      targetY = escapeTarget.current.y;
      lerpSpeed = actionState === 'crashing' ? 0.05 : (actionState === 'climbing' ? 0.02 : 0.1); 
    } else if (isSpecialIdleState && actionState !== 'sleeping') {
      if (time - lastRandomChange.current > 5) {
        randomTarget.current = {
          x: Math.max(-maxSafeX, Math.min(maxSafeX, homeBasePos.current.x + (Math.random() - 0.5) * viewport.width * 0.4)),
          y: Math.max(maxSafeYBottom, Math.min(maxSafeYTop, homeBasePos.current.y + (Math.random() - 0.5) * viewport.height * 0.4)),
        };
        lastRandomChange.current = time;
      }
      targetX = randomTarget.current.x;
      targetY = randomTarget.current.y;
      lerpSpeed = 0.015;
    }

    prevPos.current.x = currentPos.current.x;
    prevPos.current.y = currentPos.current.y;
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, lerpSpeed);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, lerpSpeed);
    groupRef.current.position.set(currentPos.current.x, currentPos.current.y, groupRef.current.position.z);

    // --- DYNAMIC VELOCITY-BASED FLIGHT ROTATION ---
    const vx = currentPos.current.x - prevPos.current.x;
    const vy = currentPos.current.y - prevPos.current.y;

    if (actionState === 'crashing') {
      groupRef.current.rotation.y += 0.3; groupRef.current.rotation.x += 0.2; groupRef.current.rotation.z += 0.1;
    } else if (actionState === 'tapping' || actionState === 'spinning') {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.2); 
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.2);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.2);
    } else if (liveIsChatting) {
      // Look right towards the chatbox!
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0.6, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.1, 0.1);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.1);
    } else {
      const targetRoll = -vx * 8.0; 
      const targetPitch = (vy * 8.0) + (Math.abs(vx) + Math.abs(vy)) * 3.0; 
      const targetYaw = vx * 5.0;
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRoll, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetPitch, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetYaw, 0.1);
    }
  });

  // Decide speech text (Chat mode overrides everything!)
  let speechText = '👋 POS Assistant Online.';
  if (isChatting) speechText = chatMessage || 'How can I assist you?';
  else if (customTaunt) speechText = customTaunt;
  else if (useRobotStore.getState().isFlying) speechText = '🚀 Navigating...';
  else if (actionState === 'tapping') speechText = tapProgress < 0.5 ? '🎯 Selecting...' : '⚡ Beep!';

  const bubbleColor = actionState === 'crashing' ? '#FF003C' : actionState === 'sleeping' ? '#555555' : actionState === 'scanning' ? '#39FF14' : isChatting ? '#BF00FF' : '#00F0FF';

  return (
    <>
      <group ref={groupRef}>
        <Trail width={1.5} length={8} color={isChatting ? '#BF00FF' : '#00F0FF'} attenuation={(t) => t * t}>
          <ChubbyBot actionState={actionState} />
        </Trail>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.0, 0]}>
          <ringGeometry args={[0.3, 0.5, 32]} />
          <meshBasicMaterial color={bubbleColor} transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>

        <Html position={[0, 1.6, 0]} center distanceFactor={10} style={{ pointerEvents: 'none', zIndex: 10000, opacity: actionState === 'sleeping' && !customTaunt ? 0 : 1, transition: 'opacity 0.3s' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
            backdropFilter: 'blur(10px)', border: `2px solid ${bubbleColor}`, boxShadow: `0 0 20px ${bubbleColor}55`,
            borderRadius: '16px', padding: '10px 18px', whiteSpace: 'nowrap', transition: 'all 0.3s ease', 
            transform: useRobotStore.getState().isFlying || actionState === 'escaping' || actionState === 'dodging' ? 'scale(0.9)' : 'scale(1)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: bubbleColor, boxShadow: `0 0 10px ${bubbleColor}`, animation: actionState === 'sleeping' ? 'none' : 'pulse 1s infinite' }} />
              <span style={{ fontSize: '15px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, color: '#F0F0F0' }}>{speechText}</span>
            </div>
          </div>
          <div style={{ width: 0, height: 0, margin: '0 auto', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: `8px solid ${bubbleColor}` }} />
        </Html>
      </group>

      <group ref={asteroidRef} position={[0, 999, 0]}>
        <mesh><dodecahedronGeometry args={[0.4, 1]} /><meshStandardMaterial color="#444" roughness={1} metalness={0.1} /></mesh>
        <mesh scale={1.2}><dodecahedronGeometry args={[0.4, 1]} /><meshBasicMaterial color="#FF3300" wireframe transparent opacity={0.6} /></mesh>
        <Trail width={3} length={12} color={'#FF5500'} attenuation={(t) => t * t}><meshBasicMaterial color="#FF0000" /></Trail>
      </group>
    </>
  );
}
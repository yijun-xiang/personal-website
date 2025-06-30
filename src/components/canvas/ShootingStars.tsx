'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ShootingStar = ({ delay = 0 }: { delay?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);
  const time = useRef(delay);
  const speed = 0.5 + Math.random() * 0.5;

  useFrame((state, delta) => {
    if (!ref.current || !trailRef.current) return;
    
    time.current += delta * speed;
    
    const t = (time.current % 3) / 3;
    
    const startX = -15 + Math.random() * 10;
    const startY = 10 + Math.random() * 5;
    const startZ = -5 + Math.random() * 10;
    
    const endX = startX + 20;
    const endY = startY - 15;
    const endZ = startZ;
    
    ref.current.position.x = startX + (endX - startX) * t;
    ref.current.position.y = startY + (endY - startY) * t;
    ref.current.position.z = startZ + (endZ - startZ) * t;
    
    trailRef.current.position.copy(ref.current.position);
    trailRef.current.scale.x = t < 0.1 ? t * 10 : t > 0.9 ? (1 - t) * 10 : 1;
    
    const opacity = t < 0.1 ? t * 10 : t > 0.9 ? (1 - t) * 10 : 1;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    (trailRef.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.5;
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent />
      </mesh>
      <mesh ref={trailRef} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[3, 0.01, 0.01]} />
        <meshBasicMaterial color="#88bbff" transparent />
      </mesh>
    </group>
  );
};

const ShootingStars = () => {
  return (
    <group>
      {[...Array(5)].map((_, i) => (
        <ShootingStar key={i} delay={i * 0.6} />
      ))}
    </group>
  );
};

export default ShootingStars;
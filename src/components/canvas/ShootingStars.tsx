'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ShootingStar = ({ delay = 0, index = 0 }: { delay?: number; index?: number }) => {
  const lineRef = useRef<THREE.Line>(null);
  const time = useRef(delay);
  const isActive = useRef(false);
  
  const startPosition = useMemo(() => {
    const spread = 40;
    const height = 15 + Math.random() * 10;
    return new THREE.Vector3(
      -spread + Math.random() * spread * 2,
      height,
      -10 + Math.random() * 20
    );
  }, []);
  
  const velocity = useMemo(() => {
    const speed = 15 + Math.random() * 10;
    const angle = Math.PI / 4 + (Math.random() - 0.5) * Math.PI / 6;
    return new THREE.Vector3(
      Math.cos(angle) * speed,
      -Math.sin(angle) * speed,
      0
    );
  }, []);

  const geometry = useMemo(() => {
    const points = [];
    const tailLength = 20;
    for (let i = 0; i < tailLength; i++) {
      points.push(new THREE.Vector3(0, 0, 0));
    }
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const colors = new Float32Array(tailLength * 3);
    const sizes = new Float32Array(tailLength);
    
    for (let i = 0; i < tailLength; i++) {
      const intensity = 1 - i / tailLength;
      colors[i * 3] = 0.9;
      colors[i * 3 + 1] = 0.95;
      colors[i * 3 + 2] = 1.0;
      sizes[i] = intensity;
    }
    
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    return geom;
  }, []);

  useFrame((state, delta) => {
    if (!lineRef.current) return;
    
    time.current += delta;
    
    if (time.current > 1 && !isActive.current) {
      isActive.current = true;
      lineRef.current.visible = true;
    }
    
    if (!isActive.current) {
      lineRef.current.visible = false;
      return;
    }
    
    const progress = time.current - 1;
    const fadeInOut = progress < 0.1 ? progress * 10 : progress > 1.5 ? Math.max(0, 2 - progress) : 1;
    
    if (progress > 2) {
      time.current = -Math.random() * 5 - 2;
      isActive.current = false;
      lineRef.current.visible = false;
      return;
    }
    
    const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
    const tailLength = positions.length / 3;
    
    for (let i = 0; i < tailLength; i++) {
      const t = progress - i * 0.003;
      if (t > 0) {
        positions[i * 3] = startPosition.x + velocity.x * t;
        positions[i * 3 + 1] = startPosition.y + velocity.y * t;
        positions[i * 3 + 2] = startPosition.z;
      } else {
        positions[i * 3] = startPosition.x;
        positions[i * 3 + 1] = startPosition.y;
        positions[i * 3 + 2] = startPosition.z;
      }
    }
    
    lineRef.current.geometry.attributes.position.needsUpdate = true;
    
    if (lineRef.current.material instanceof THREE.LineBasicMaterial) {
      lineRef.current.material.opacity = fadeInOut * 0.8;
    }
  });

  return (
    <>
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          linewidth={2}
          vertexColors
        />
      </line>
      <mesh position={startPosition}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0}
        />
      </mesh>
    </>
  );
};

const ShootingStars = () => {
  return (
    <group>
      {[...Array(8)].map((_, i) => (
        <ShootingStar key={i} delay={i * 1.5} index={i} />
      ))}
    </group>
  );
};

export default ShootingStars;
'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleWave = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const time = useRef(0);

  const { geometry, originalPositions } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 4 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      colors[i3] = 0.5 + Math.random() * 0.5;
      colors[i3 + 1] = 0.7 + Math.random() * 0.3;
      colors[i3 + 2] = 1;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    return { geometry: geo, originalPositions };
  }, []);

  useFrame((state, delta) => {
    time.current += delta * 0.2;
    
    if (pointsRef.current && geometry.attributes.position) {
      pointsRef.current.rotation.y = time.current * 0.1;
      pointsRef.current.rotation.x = Math.sin(time.current * 0.5) * 0.2;
      
      const positions = geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const z = originalPositions[i + 2];
        
        positions[i] = x;
        positions[i + 1] = y + Math.sin(time.current + x * 2) * 0.2;
        positions[i + 2] = z;
      }
      
      geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} args={[geometry]}>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleWave;
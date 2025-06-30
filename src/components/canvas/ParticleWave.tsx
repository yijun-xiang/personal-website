'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleWave = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const time = useRef(0);

  const { geometry, originalPositions } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 3 + 1;
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

      const intensity = 0.3 + Math.random() * 0.7;
      colors[i3] = intensity * 0.6;
      colors[i3 + 1] = intensity * 0.8;
      colors[i3 + 2] = intensity;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    return { geometry: geo, originalPositions };
  }, []);

  useFrame((state, delta) => {
    time.current += delta * 0.1;
    
    if (pointsRef.current && geometry.attributes.position) {
      pointsRef.current.rotation.y = time.current * 0.05;
      
      const positions = geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const z = originalPositions[i + 2];
        
        const wave = Math.sin(time.current + x * 2) * 0.1;
        const wave2 = Math.cos(time.current * 0.5 + y) * 0.1;
        
        positions[i] = x + wave;
        positions[i + 1] = y + wave2;
        positions[i + 2] = z;
      }
      
      geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} args={[geometry]}>
      <pointsMaterial
        size={0.01}
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default ParticleWave;
'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Mesh } from 'three';

const AuroraEffect = () => {
  const mesh1Ref = useRef<Mesh>(null);
  const mesh2Ref = useRef<Mesh>(null);
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;

    if (mesh1Ref.current) {
      mesh1Ref.current.position.y = 5 + Math.sin(time.current * 0.3) * 0.5;
      mesh1Ref.current.rotation.z = Math.sin(time.current * 0.2) * 0.1;
      (mesh1Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(time.current) * 0.1;
    }

    if (mesh2Ref.current) {
      mesh2Ref.current.position.y = 6 + Math.sin(time.current * 0.4 + 1) * 0.5;
      mesh2Ref.current.rotation.z = Math.sin(time.current * 0.25 + 0.5) * 0.1;
      (mesh2Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.25 + Math.sin(time.current + 1) * 0.1;
    }
  });

  return (
    <group position={[0, 0, -15]}>
      <mesh ref={mesh1Ref} rotation={[-0.3, 0, 0]}>
        <planeGeometry args={[25, 8, 32, 16]} />
        <meshBasicMaterial
          color="#4ade80"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={mesh2Ref} rotation={[-0.3, 0, 0]}>
        <planeGeometry args={[20, 6, 32, 16]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default AuroraEffect;
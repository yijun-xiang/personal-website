'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GlobeBackground = () => {
    const meshRef = useRef<THREE.Group>(null);

    const geometry = useMemo(() => {
        const sphere = new THREE.SphereGeometry(1.5, 45, 45);
        const vertices = sphere.attributes.position.array;
        const buffer = new Float32Array(vertices);
        const geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.BufferAttribute(buffer, 3));
        return geom;
    }, []);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <group ref={meshRef}>
            <points geometry={geometry}>
                <pointsMaterial
                    size={0.008}
                    color="#4f8bda"
                    sizeAttenuation
                    transparent={false}
                    alphaTest={0.5}
                    opacity={1.0}
                />
            </points>
        </group>
    );
};
export default GlobeBackground;
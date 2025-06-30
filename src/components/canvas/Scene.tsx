'use client';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import GlobeBackground from './GlobeBackground';
import ShootingStars from './ShootingStars';
import ParticleWave from './ParticleWave';
import AuroraEffect from './AuroraEffect';
import React from 'react';

class ErrorBoundary extends React.Component<{children: React.ReactNode, fallback: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode, fallback: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    console.error("Caught a rendering error in Scene component:", error);
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const Scene = () => {
    return (
        <ErrorBoundary fallback={<div className="absolute top-0 left-0 w-full h-full bg-gray-900 -z-10" />}>
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <fog attach="fog" args={['#030712', 5, 30]} />
                    <ambientLight intensity={0.1} />
                    <pointLight color="#61dafb" position={[10, 10, 10]} intensity={1} />
                    <pointLight color="#ff6b6b" position={[-10, -10, -10]} intensity={0.5} />
                    <pointLight color="#bb86fc" position={[0, 15, 0]} intensity={0.3} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <GlobeBackground />
                    <ShootingStars />
                    <ParticleWave />
                    <AuroraEffect />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} minPolarAngle={Math.PI/2} maxPolarAngle={Math.PI/2} />
                </Canvas>
            </div>
        </ErrorBoundary>
    );
};
export default Scene;
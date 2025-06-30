'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ShootingStar = ({ delay = 0 }: { delay?: number }) => {
  const trailRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const timeRef = useRef(delay);
  const configRef = useRef(generateConfig());
  
  function generateConfig() {
    const zones = ['topLeft', 'topCenter', 'topRight', 'leftTop', 'leftMiddle'];
    const zone = zones[Math.floor(Math.random() * zones.length)];
    
    let startX, startY;
    switch(zone) {
      case 'topLeft':
        startX = -20 - Math.random() * 5;
        startY = 12 + Math.random() * 3;
        break;
      case 'topCenter':
        startX = -5 + Math.random() * 10;
        startY = 15 + Math.random() * 3;
        break;
      case 'topRight':
        startX = 15 + Math.random() * 5;
        startY = 12 + Math.random() * 3;
        break;
      case 'leftTop':
        startX = -22 - Math.random() * 3;
        startY = 8 + Math.random() * 4;
        break;
      default:
        startX = -22 - Math.random() * 3;
        startY = Math.random() * 8;
    }
    
    const angle = -Math.PI / 3.5 + (Math.random() - 0.5) * 0.3;
    
    return {
      startX,
      startY,
      angle,
      speed: 28 + Math.random() * 12,
      duration: 0.5 + Math.random() * 0.2,
      resetDelay: 1.2 + Math.random() * 2
    };
  }

  const trailTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createLinearGradient(0, 0, 512, 0);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.7, 'rgba(255, 245, 230, 0.2)');
    gradient.addColorStop(0.8, 'rgba(255, 240, 220, 0.6)');
    gradient.addColorStop(0.85, 'rgba(255, 235, 210, 0.9)');
    gradient.addColorStop(0.9, 'rgba(255, 250, 245, 1)');
    gradient.addColorStop(0.95, 'rgba(200, 220, 255, 1)');
    gradient.addColorStop(1, 'rgba(180, 210, 255, 1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 32);
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    timeRef.current += delta;
    
    if (timeRef.current < 0) {
      if (trailRef.current) trailRef.current.visible = false;
      if (glowRef.current) glowRef.current.visible = false;
      return;
    }
    
    const config = configRef.current;
    const progress = timeRef.current / config.duration;
    
    if (progress > 1) {
      if (trailRef.current) trailRef.current.visible = false;
      if (glowRef.current) glowRef.current.visible = false;
      
      if (timeRef.current > config.duration + config.resetDelay) {
        timeRef.current = -Math.random() * 0.5;
        configRef.current = generateConfig();
      }
      return;
    }
    
    const distance = config.speed * timeRef.current;
    const x = config.startX + Math.cos(config.angle) * distance;
    const y = config.startY + Math.sin(config.angle) * distance;
    
    const fadeIn = Math.min(progress * 15, 1);
    const fadeOut = progress > 0.7 ? Math.max(0, (1 - progress) * 3.33) : 1;
    const opacity = fadeIn * fadeOut;
    
    const trailLength = 3.5 + progress * 1.5;
    
    if (trailRef.current) {
      trailRef.current.visible = true;
      trailRef.current.position.set(x - Math.cos(config.angle) * trailLength * 0.5, y - Math.sin(config.angle) * trailLength * 0.5, 0);
      trailRef.current.rotation.z = config.angle;
      trailRef.current.scale.set(trailLength, 0.03, 1);
      
      const material = trailRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = opacity * 0.95;
    }
    
    if (glowRef.current) {
      glowRef.current.visible = true;
      glowRef.current.position.set(x - Math.cos(config.angle) * trailLength * 0.5, y - Math.sin(config.angle) * trailLength * 0.5, -0.01);
      glowRef.current.rotation.z = config.angle;
      glowRef.current.scale.set(trailLength * 1.1, 0.15, 1);
      
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = opacity * 0.2;
    }
  });

  return (
    <>
      <mesh ref={glowRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#FFB366"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh ref={trailRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={trailTexture}
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

const ShootingStars = () => {
  return (
    <group position={[0, 0, -1]}>
      <ShootingStar delay={0} />
      <ShootingStar delay={-0.5} />
      <ShootingStar delay={-1} />
      <ShootingStar delay={-1.5} />
      <ShootingStar delay={-2} />
      <ShootingStar delay={-2.5} />
      <ShootingStar delay={-3} />
      <ShootingStar delay={-3.5} />
    </group>
  );
};

export default ShootingStars;
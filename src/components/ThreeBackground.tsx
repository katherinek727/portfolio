import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const FloatingGeometry = ({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.y += 0.005 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const FloatingTorus = ({ position, color }: { position: [number, number, number], color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.5, 0.15, 16, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const FloatingIcosahedron = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#e8c4b8"
          transparent
          opacity={0.25}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const points = useRef<THREE.Points>(null);
  
  const particlesCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#e8c4b8"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#e8c4b8" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#c49ab0" />
      
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <ParticleField />
      
      {/* Floating geometries */}
      <FloatingGeometry position={[-3, 2, -2]} color="#e8c4b8" speed={0.8} />
      <FloatingGeometry position={[3, -1, -3]} color="#c49ab0" speed={1.2} />
      <FloatingGeometry position={[-2, -2, -4]} color="#d4b8c8" speed={1} />
      <FloatingGeometry position={[4, 1, -5]} color="#c49ab0" speed={0.6} />
      
      <FloatingTorus position={[2, 2, -3]} color="#e8c4b8" />
      <FloatingTorus position={[-3, -1, -4]} color="#c49ab0" />
      
      <FloatingIcosahedron position={[0, 0, -4]} />
      <FloatingIcosahedron position={[-4, 2, -6]} />
      <FloatingIcosahedron position={[3, -2, -5]} />
    </>
  );
};

const ThreeBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
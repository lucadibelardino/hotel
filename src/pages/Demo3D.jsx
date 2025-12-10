import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';

function Room() {
    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#e5e7eb" />
            </mesh>

            {/* Back Wall */}
            <mesh position={[0, 2, -5]}>
                <boxGeometry args={[10, 5, 0.2]} />
                <meshStandardMaterial color="#f3f4f6" />
            </mesh>

            {/* Left Wall */}
            <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[10, 5, 0.2]} />
                <meshStandardMaterial color="#d1d5db" />
            </mesh>

            {/* Bed Base */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[3, 1, 4]} />
                <meshStandardMaterial color="#854d0e" />
            </mesh>

            {/* Mattress */}
            <mesh position={[0, 0.7, 0]}>
                <boxGeometry args={[2.8, 0.4, 3.8]} />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* Pillow */}
            <mesh position={[0, 1, -1.5]}>
                <boxGeometry args={[1.5, 0.3, 0.8]} />
                <meshStandardMaterial color="#e0f2fe" />
            </mesh>

            {/* Side Table */}
            <mesh position={[2, 0, -1]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#4b5563" />
            </mesh>
        </group>
    );
}

const Demo3D = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
            <Suspense fallback={<div style={{ color: 'white', paddingTop: '50vh', textAlign: 'center' }}>Caricamento 3D...</div>}>
                <Canvas>
                    <PerspectiveCamera makeDefault position={[5, 5, 8]} fov={50} />
                    <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />

                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />

                    <color attach="background" args={['#101010']} />
                    <Room />
                    <gridHelper args={[20, 20, 0x444444, 0x222222]} />
                </Canvas>
            </Suspense>

            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                color: 'white',
                zIndex: 10,
                pointerEvents: 'none'
            }}>
                <h1>Camera 3D Interactive Demo</h1>
                <p>Usa il mouse per ruotare (Click sinistro) e zoomare (Rotella)</p>
                <a href="/" style={{ pointerEvents: 'auto', color: '#60a5fa', textDecoration: 'underline' }}>Torna alla Home</a>
            </div>
        </div>
    );
};

export default Demo3D;

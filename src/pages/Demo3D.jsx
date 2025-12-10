import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text, Float } from '@react-three/drei';
import { useParams, useNavigate } from 'react-router-dom';
import { ROOMS_DATA } from '../data/rooms';

// --- Reusable 3D Components ---

const Wall = ({ position, rotation, args, color }) => (
    <mesh position={position} rotation={rotation}>
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
);

const Floor = ({ args, color }) => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={args} />
        <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
);

const Bed = ({ position, color = "#854d0e" }) => (
    <group position={position}>
        {/* Base */}
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3, 1, 4]} />
            <meshStandardMaterial color={color} />
        </mesh>
        {/* Mattress */}
        <mesh position={[0, 0.7, 0]}>
            <boxGeometry args={[2.8, 0.4, 3.8]} />
            <meshStandardMaterial color="white" />
        </mesh>
        {/* Pillows */}
        <mesh position={[-0.8, 1, -1.5]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[1, 0.3, 0.6]} />
            <meshStandardMaterial color="#e0f2fe" />
        </mesh>
        <mesh position={[0.8, 1, -1.5]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[1, 0.3, 0.6]} />
            <meshStandardMaterial color="#e0f2fe" />
        </mesh>
        {/* Blanket */}
        <mesh position={[0, 0.75, 1]} rotation={[0.1, 0, 0]}>
            <boxGeometry args={[2.9, 0.1, 1.8]} />
            <meshStandardMaterial color={color} />
        </mesh>
    </group>
);

const Lamp = ({ position }) => (
    <group position={position}>
        <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.2, 1.5]} />
            <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[0, 1, 0]}>
            <coneGeometry args={[0.5, 0.5, 0]} />
            <meshStandardMaterial color="#fef3c7" emissive="#fef3c7" emissiveIntensity={0.5} />
        </mesh>
        <pointLight position={[0, 0.5, 0]} intensity={0.5} color="#fff7ed" distance={3} />
    </group>
);

const Window = ({ position, rotation }) => (
    <mesh position={position} rotation={rotation}>
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial color="#bae6fd" transparent opacity={0.6} metalness={0.9} />
    </mesh>
);

const Rug = ({ position, color }) => (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial color={color} />
    </mesh>
);

// --- Room Layouts ---

const StandardRoom = () => (
    <group>
        <Floor args={[10, 10]} color="#d6d3d1" /> {/* Stone floor */}
        <Wall position={[0, 2, -5]} args={[10, 5, 0.2]} color="#e5e5e5" /> {/* Back */}
        <Wall position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]} args={[10, 5, 0.2]} color="#d4d4d4" /> {/* Left */}
        <Wall position={[5, 2, 0]} rotation={[0, Math.PI / 2, 0]} args={[10, 5, 0.2]} color="#d4d4d4" /> {/* Right */}

        <Bed position={[0, 0, -2]} color="#57534e" />
        <Lamp position={[-2, 0, -4]} />
        <Lamp position={[2, 0, -4]} />
        <Window position={[0, 2, -4.9]} />
    </group>
);

const SuperiorRoom = () => (
    <group>
        <Floor args={[12, 12]} color="#a8a29e" /> {/* Wood floor tone */}
        <Wall position={[0, 2, -6]} args={[12, 5, 0.2]} color="#f0f9ff" />
        <Wall position={[-6, 2, 0]} rotation={[0, Math.PI / 2, 0]} args={[12, 5, 0.2]} color="#e0f2fe" />
        <Wall position={[6, 2, 0]} rotation={[0, Math.PI / 2, 0]} args={[12, 5, 0.2]} color="#e0f2fe" />

        <Bed position={[-2, 0, -2]} color="#0369a1" /> {/* Blue theme */}
        <Rug position={[-2, -0.49, 1]} color="#bfdbfe" />

        {/* Seating Area */}
        <mesh position={[3, 0, 0]} rotation={[0, -0.5, 0]}>
            <boxGeometry args={[2, 1, 2]} />
            <meshStandardMaterial color="#ea580c" />
        </mesh>

        <Lamp position={[-4, 0, -5]} />
        <Window position={[0, 2, -5.9]} />
        <Window position={[3, 2, -5.9]} />
    </group>
);

const SuiteRoom = () => (
    <group>
        <Floor args={[15, 12]} color="#78716c" /> {/* Dark wood */}
        <Wall position={[0, 2, -6]} args={[15, 5, 0.2]} color="#fff1f2" /> {/* Warm/Pinkish */}
        <Wall position={[-7.5, 2, 0]} rotation={[0, Math.PI / 2, 0]} args={[12, 5, 0.2]} color="#ffe4e6" />

        {/* Divider Wall */}
        <Wall position={[1, 2, -2]} rotation={[0, Math.PI / 2, 0]} args={[6, 5, 0.2]} color="#fecdd3" />

        {/* Bedroom Area */}
        <Bed position={[-4, 0, -3]} color="#be123c" /> {/* Red/Luxury */}
        <Rug position={[-4, -0.49, 0]} color="#fecdd3" />
        <Lamp position={[-6, 0, -5]} />

        {/* Living Area */}
        <group position={[4, 0, -1]}>
            <mesh position={[0, 0, 0]}> {/* Sofa */}
                <boxGeometry args={[3, 1, 1.5]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0.5, 2]}> {/* Table */}
                <boxGeometry args={[2, 0.5, 1]} />
                <meshStandardMaterial color="#475569" />
            </mesh>
        </group>

        <Window position={[-4, 2, -5.9]} />
        <Window position={[4, 2, -5.9]} />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[4, 2, 2]}>
            <Text fontSize={0.5} color="#be123c">
                VISTA MARE
            </Text>
        </Float>
    </group>
);


const Demo3D = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [roomData, setRoomData] = useState(null);

    useEffect(() => {
        // Default to standard if no ID or invalid
        const r = ROOMS_DATA.find(r => r.id === roomId) || ROOMS_DATA[0];
        setRoomData(r);
    }, [roomId]);

    if (!roomData) return <div style={{ color: 'white' }}>Caricamento...</div>;

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#050505', position: 'relative' }}>
            <Suspense fallback={<div style={{ color: 'white', paddingTop: '50vh', textAlign: 'center' }}>Caricamento Stanza 3D...</div>}>
                <Canvas shadows camera={{ position: [0, 6, 12], fov: 50 }}>
                    <PerspectiveCamera makeDefault position={[0, 8, 12]} fov={45} />
                    <OrbitControls
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2.1}
                        maxDistance={20}
                        minDistance={5}
                    />

                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
                    <pointLight position={[-10, 10, -5]} intensity={0.5} color="#e0f2fe" />

                    <color attach="background" args={['#050505']} />

                    {/* Render specific room type */}
                    {roomId === 'standard' && <StandardRoom />}
                    {roomId === 'superior' && <SuperiorRoom />}
                    {roomId === 'suite' && <SuiteRoom />}
                    {/* Default fallback */}
                    {!['standard', 'superior', 'suite'].includes(roomId) && <StandardRoom />}

                    <gridHelper args={[40, 40, 0x222222, 0x111111]} position={[0, -0.51, 0]} />
                </Canvas>
            </Suspense>

            {/* UI Overlay */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                pointerEvents: 'none'
            }}>
                <div style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                    <h1 style={{ margin: 0, fontSize: '2rem' }}>{roomData.name}</h1>
                    <p style={{ margin: '5px 0', opacity: 0.8 }}>Esplorazione Interattiva 3D</p>
                    <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                        {ROOMS_DATA.map(r => (
                            <button
                                key={r.id}
                                style={{
                                    pointerEvents: 'auto',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: '1px solid white',
                                    background: r.id === roomId ? 'white' : 'transparent',
                                    color: r.id === roomId ? 'black' : 'white',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                                onClick={() => navigate(`/3d/${r.id}`)}
                            >
                                {r.name.split(' ')[1]} {/* Show just 'Doppia', 'Superior', 'Suite' approx */}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '10px' }}>
                    <a href="/" style={{ pointerEvents: 'auto', color: 'white', textDecoration: 'none', fontSize: '0.9rem', opacity: 0.7, borderBottom: '1px solid white' }}>
                        Torna alla Home
                    </a>
                    <button
                        style={{
                            pointerEvents: 'auto',
                            padding: '12px 24px',
                            backgroundColor: '#2563eb', // Blue primary
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                        }}
                        onClick={() => navigate(`/camere?roomId=${roomId}`)} // Go to booking with this room selected
                    >
                        Prenota da €{roomData.basePrice}
                    </button>

                </div>
            </div>

            <div style={{
                position: 'absolute',
                bottom: '30px',
                width: '100%',
                textAlign: 'center',
                color: 'white',
                opacity: 0.5,
                fontSize: '0.9rem',
                pointerEvents: 'none'
            }}>
                Ruota per esplorare • Scorri per zoomare
            </div>
        </div>
    );
};

export default Demo3D;

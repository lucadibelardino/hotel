import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text, Float, Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { useParams, useNavigate } from 'react-router-dom';
import { ROOMS_DATA } from '../data/rooms';

// --- Procedural High-Fidelity Components ---

// Materials helpers
const WoodMaterial = ({ color = "#8b5a2b" }) => <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />;
const MetalMaterial = ({ color = "#444" }) => <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />;
const FabricMaterial = ({ color = "#fff" }) => <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />;
const GlassMaterial = () => <meshStandardMaterial color="#88ccff" roughness={0.1} metalness={0.9} transparent opacity={0.3} />;

const DetailedBed = ({ position, rotation, primaryColor = "#1e3a8a", beddingColor = "#ffffff" }) => (
    <group position={position} rotation={rotation}>
        {/* Legs */}
        {[[-1.4, 0.1, -1.9], [1.4, 0.1, -1.9], [-1.4, 0.1, 1.9], [1.4, 0.1, 1.9]].map((pos, i) => (
            <mesh key={i} position={pos}>
                <cylinderGeometry args={[0.05, 0.04, 0.2]} />
                <WoodMaterial color="#3f2e18" />
            </mesh>
        ))}

        {/* Frame */}
        <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[3, 0.4, 4.1]} />
            <WoodMaterial color="#554433" />
        </mesh>

        {/* Headboard */}
        <mesh position={[0, 1.2, -2.1]}>
            <boxGeometry args={[3.2, 1.5, 0.2]} />
            <FabricMaterial color={primaryColor} />
        </mesh>

        {/* Mattress */}
        <mesh position={[0, 0.7, 0]}>
            <boxGeometry args={[2.9, 0.35, 3.9]} />
            <FabricMaterial color="#f8fafc" />
        </mesh>

        {/* Duvet / Blanket */}
        <mesh position={[0, 0.75, 0.5]}>
            <boxGeometry args={[3.0, 0.36, 2.8]} />
            <FabricMaterial color={beddingColor} />
        </mesh>

        {/* Pillows - Detailed */}
        {[[-0.8, 0.95, -1.6], [0.8, 0.95, -1.6]].map((pos, i) => (
            <mesh key={i} position={pos} rotation={[0.4, 0, 0]}>
                <boxGeometry args={[1, 0.2, 0.5]} />
                <meshStandardMaterial color="#fff" roughness={1} />
            </mesh>
        ))}

        {/* Decorative Pillows */}
        <mesh position={[0, 0.95, -1.4]} rotation={[0.5, 0, 0]}>
            <boxGeometry args={[0.6, 0.2, 0.4]} />
            <FabricMaterial color={primaryColor} />
        </mesh>
    </group>
);

const Nightstand = ({ position }) => (
    <group position={position}>
        <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <WoodMaterial />
        </mesh>
        <mesh position={[0, 0.3, 0.31]}> {/* Drawer Front */}
            <boxGeometry args={[0.5, 0.2, 0.02]} />
            <WoodMaterial color="#6b4620" />
        </mesh>
    </group>
);

const DetailedLamp = ({ position }) => (
    <group position={position}>
        <mesh position={[0, 0.02, 0]}> {/* Base */}
            <cylinderGeometry args={[0.1, 0.12, 0.04]} />
            <MetalMaterial />
        </mesh>
        <mesh position={[0, 0.3, 0]}> {/* Stem */}
            <cylinderGeometry args={[0.02, 0.02, 0.6]} />
            <MetalMaterial />
        </mesh>
        <mesh position={[0, 0.7, 0]}> {/* Shade */}
            <cylinderGeometry args={[0.2, 0.3, 0.4, 32, 1, true]} />
            <meshStandardMaterial color="#fffbeb" emissive="#ffedd5" emissiveIntensity={0.6} side={2} transparent opacity={0.9} />
        </mesh>
        <pointLight position={[0, 0.6, 0]} intensity={2} distance={3} color="#ffedd5" />
    </group>
);

const Sofa = ({ position, color = "#334155" }) => (
    <group position={position}>
        <mesh position={[0, 0.25, 0]}> {/* Seat */}
            <boxGeometry args={[2.2, 0.4, 0.8]} />
            <FabricMaterial color={color} />
        </mesh>
        <mesh position={[0, 0.6, -0.35]}> {/* Back */}
            <boxGeometry args={[2.2, 0.8, 0.2]} />
            <FabricMaterial color={color} />
        </mesh>
        <mesh position={[-1.2, 0.4, 0]}> {/* Arm Left */}
            <boxGeometry args={[0.3, 0.6, 0.8]} />
            <FabricMaterial color={color} />
        </mesh>
        <mesh position={[1.2, 0.4, 0]}> {/* Arm Right */}
            <boxGeometry args={[0.3, 0.6, 0.8]} />
            <FabricMaterial color={color} />
        </mesh>
    </group>
);

const CoffeeTable = ({ position }) => (
    <group position={position}>
        <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
            <GlassMaterial />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.2]} />
            <MetalMaterial />
        </mesh>
    </group>
);

const WindowFrame = ({ position, width = 2, height = 3 }) => (
    <group position={position}>
        <mesh>
            <planeGeometry args={[width, height]} />
            <meshStandardMaterial color="#a5f3fc" emissive="#a5f3fc" emissiveIntensity={0.5} transparent opacity={0.3} />
        </mesh>
        {/* Frame lines */}
        <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[width, 0.1, 0.05]} />
            <WoodMaterial color="#fff" />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[0.1, height, 0.05]} />
            <WoodMaterial color="#fff" />
        </mesh>
    </group>
);

// --- Room Types ---

const StandardRoom = () => (
    <group>
        {/* Room Shell */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[12, 12]} />
            <meshStandardMaterial color="#e5e5e5" />
        </mesh>
        <mesh position={[0, 2.5, -4]} receivesShadow>
            <boxGeometry args={[12, 5, 0.2]} />
            <meshStandardMaterial color="#f3f4f6" />
        </mesh>
        <mesh position={[-4, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receivesShadow>
            <boxGeometry args={[12, 5, 0.2]} />
            <meshStandardMaterial color="#e5e7eb" />
        </mesh>

        <DetailedBed position={[0, 0, -2]} primaryColor="#4b5563" beddingColor="#f3f4f6" />

        <Nightstand position={[-2, 0, -3.5]} />
        <DetailedLamp position={[-2, 0.6, -3.5]} />

        <Nightstand position={[2, 0, -3.5]} />
        <DetailedLamp position={[2, 0.6, -3.5]} />

        <WindowFrame position={[4, 2, -1]} width={3} height={2.5} />
    </group>
);

const SuperiorRoom = () => (
    <group>
        {/* Parquet Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[14, 14]} />
            <meshStandardMaterial color="#854d0e" roughness={0.4} />
        </mesh>
        <mesh position={[0, 2.5, -5]} receivesShadow>
            <boxGeometry args={[14, 5, 0.2]} />
            <meshStandardMaterial color="#ecfeff" />
        </mesh>

        <DetailedBed position={[-2, 0, -2.5]} primaryColor="#0e7490" beddingColor="#cffafe" />

        <Nightstand position={[-4, 0, -4]} />
        <DetailedLamp position={[-4, 0.6, -4]} />

        {/* Sitting Corner */}
        <Sofa position={[3, 0, -1]} color="#f97316" />
        <CoffeeTable position={[3, 0, 1]} />

        <WindowFrame position={[0, 2.5, -4.9]} width={2} height={3} />
        <WindowFrame position={[3, 2.5, -4.9]} width={2} height={3} />

        {/* Rug */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, 0.01, 1]}>
            <circleGeometry args={[1.5, 32]} />
            <FabricMaterial color="#ffedd5" />
        </mesh>
    </group>
);

const SuiteRoom = () => (
    <group>
        {/* Dark Elegance Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#1c1917" roughness={0.3} metalness={0.2} />
        </mesh>

        {/* Feature Wall */}
        <mesh position={[0, 2.5, -6]} receivesShadow>
            <boxGeometry args={[20, 5, 0.2]} />
            <meshStandardMaterial color="#4c0519" />
        </mesh>

        <DetailedBed position={[-4, 0, -3]} primaryColor="#be123c" beddingColor="#fff1f2" />

        {/* Huge Living Area */}
        <group position={[4, 0, -1]}>
            <Sofa position={[0, 0, 0]} color="#0f172a" />
            <Sofa position={[2.5, 0, 1]} rotation={[0, -Math.PI / 2, 0]} color="#0f172a" />
            <CoffeeTable position={[1, 0, 1]} />
        </group>

        {/* Chandeliers (Abstract) */}
        <pointLight position={[-4, 4, -3]} intensity={1} color="#fecdd3" distance={8} />
        <pointLight position={[4, 4, 1]} intensity={1} color="#fff" distance={8} />

        <WindowFrame position={[-6, 2.5, -2]} width={0.1} height={4} />

        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5} position={[0, 3, 0]}>
            <Text
                fontSize={0.4}
                color="#f43f5e"
                maxWidth={2}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign="center"
            >
                VISTA PANORAMICA
            </Text>
        </Float>
    </group>
);


const Demo3D = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [roomData, setRoomData] = useState(null);

    useEffect(() => {
        const r = ROOMS_DATA.find(r => r.id === roomId) || ROOMS_DATA[0];
        setRoomData(r);
    }, [roomId]);

    if (!roomData) return <div style={{ color: 'white' }}>Caricamento...</div>;

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#050505', position: 'relative' }}>
            <Suspense fallback={<div style={{ color: 'white', paddingTop: '50vh', textAlign: 'center' }}>Caricamento Alta Definizione...</div>}>
                <Canvas shadows camera={{ position: [0, 5, 12], fov: 40 }} gl={{ antialias: false }}>
                    <PerspectiveCamera makeDefault position={[0, 6, 10]} fov={50} />
                    <OrbitControls
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2.1}
                        maxDistance={18}
                        minDistance={4}
                        target={[0, 1, 0]}
                    />

                    {/* Accurate Lighting */}
                    <ambientLight intensity={0.2} />
                    <directionalLight
                        position={[5, 10, 5]}
                        intensity={1}
                        castShadow
                        shadow-mapSize={[1024, 1024]}
                    />

                    {/* Add Environment for PBR reflections, but handle failure gracefully if disconnected */}
                    <Environment preset="apartment" background={false} blur={0.8} />

                    <color attach="background" args={['#000']} />

                    <group position={[0, -1, 0]}>
                        {roomId === 'standard' && <StandardRoom />}
                        {roomId === 'superior' && <SuperiorRoom />}
                        {roomId === 'suite' && <SuiteRoom />}
                        {!['standard', 'superior', 'suite'].includes(roomId) && <StandardRoom />}
                    </group>

                    <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.4} far={1} color="#000" />

                    {/* Post Processing for Cinematic Look */}
                    <EffectComposer disableNormalPass>
                        <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.8} radius={0.4} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                        <Noise opacity={0.02} />
                    </EffectComposer>

                </Canvas>
            </Suspense>

            {/* UI Overlay */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                padding: '30px',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
                display: 'flex',
                justifyContent: 'space-between',
                pointerEvents: 'none'
            }}>
                <div style={{ color: 'white' }}>
                    <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 300 }}>{roomData.name}</h1>
                    <p style={{ margin: '5px 0', opacity: 0.7, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Interattivo 3D • Alta Fedeltà</p>
                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                        {ROOMS_DATA.map(r => (
                            <button
                                key={r.id}
                                style={{
                                    pointerEvents: 'auto',
                                    padding: '8px 20px',
                                    borderRadius: '30px',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    background: r.id === roomId ? 'white' : 'rgba(0,0,0,0.5)',
                                    color: r.id === roomId ? 'black' : 'white',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    backdropFilter: 'blur(5px)',
                                    transition: 'all 0.3s'
                                }}
                                onClick={() => navigate(`/3d/${r.id}`)}
                            >
                                {r.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '15px' }}>
                    <button
                        style={{
                            pointerEvents: 'auto',
                            padding: '16px 32px',
                            backgroundColor: 'white',
                            color: 'black',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)'
                        }}
                        onClick={() => navigate(`/camere?roomId=${roomId}`)}
                    >
                        Prenota Suite
                    </button>
                    <a href="/" style={{ pointerEvents: 'auto', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                        <span style={{ marginRight: '5px' }}>←</span> Torna alla Home
                    </a>
                </div>
            </div>

            <div style={{
                position: 'absolute',
                bottom: '30px',
                width: '100%',
                textAlign: 'center',
                color: 'white',
                opacity: 0.4,
                fontSize: '0.8rem',
                letterSpacing: '2px',
                pointerEvents: 'none'
            }}>
                RUOTA • ZOOM • ESPLORA
            </div>
        </div>
    );
};

export default Demo3D;

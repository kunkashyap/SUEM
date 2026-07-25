import { Canvas } from "@react-three/fiber";
import Heart from "../Heart";
import { Environment, OrbitControls } from "@react-three/drei";

function HeartViewer() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas
                shadows
                camera={{
                position: [0, 0, 5],
                    fov: 45
                }}
            >

            <hemisphereLight
                intensity={2}
                groundColor="#555555"
            />
            


            <color
            attach="background"
            args={["#111111"]}
            />
                                            
                
                <ambientLight intensity={2.5} />

                <directionalLight
                    castShadow
                    position={[6,8,6]}
                    intensity={6}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />

                <directionalLight
                    position={[0, 0, 10]}
                    intensity={3}
                />

                <directionalLight
                    position={[-5, 5, -5]}
                    intensity={2}
                />

                <directionalLight
                    position={[0, -5, 5]}
                    intensity={2}
                />

                <directionalLight
                    position={[0, 5, -10]}
                    intensity={2}
                />

                <Environment
                    files="/hdr/studio_small_03_1k.hdr"
                    background={false}
                />

                <OrbitControls/>

                <Heart/>


                <mesh
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1.2, 0]}
                >

                <planeGeometry args={[20,20]} />

                <shadowMaterial
                    transparent
                    opacity={0.25}
                />

            </mesh>
            </Canvas>
        </div>
    );
}

export default HeartViewer;
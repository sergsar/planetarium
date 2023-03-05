import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import React from "react";
import SolarSystem from "./SolarSystem";

const Scene: React.FC = () => {
    return (
        <Canvas
            className="planetarium-canvas"
            camera={{
                position: [10, 10, 10]
            }}
        >
            <ambientLight />
            <pointLight position={[1000, 1000, 1000]} />
            <gridHelper
                args={[50, 25]}
            />
            <OrbitControls/>

            <SolarSystem />
        </Canvas>
    )
}

export default Scene

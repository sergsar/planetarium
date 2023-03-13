import {useFrame, useThree} from "@react-three/fiber";
import {OrbitControls } from "@react-three/drei";
import React, {useEffect, useRef, useState} from "react";
import {Vector3} from "three"
import {OrbitControls as OrbitControlsType} from "three-stdlib";
import SolarSystem from "./SolarSystem";
import useEquirectangularTexture from "../hooks/useEquirectangularTexture";

const Scene: React.FC = () => {
    const [speed, setSpeed] = useState(100)
    const { camera } = useThree()
    const controls = useRef<OrbitControlsType>(null)

    const { texture } = useEquirectangularTexture({ path: 'textures/solarsystemscope.com/8k_stars_milky_way.jpg'})

    useEffect(() => {
        camera.position.set(-10, 10, 10)
    }, [camera])

    useFrame(() => {
        const { current } = controls
        if (!current) {
            return
        }
        if (speed < 100) {
            setSpeed(speed + 0.3)
        }
        const target = current.target
        camera.position
            .sub(target)
            .applyAxisAngle(new Vector3(0, 1, 0), -0.000005 * speed)
            .add(target)
        camera.lookAt(target)
    })

    return (
        <>
            {texture && <primitive attach='background' object={texture} />}
            <ambientLight intensity={0.1} />
            <pointLight intensity={2} position={[0, 0, 0]} />
            <gridHelper
                visible={false}
                args={[50, 25]}
            />
            <OrbitControls
                ref={controls}
                maxDistance={35}
                minDistance={5}
                enablePan={false}
                zoomSpeed={0.3}
                dampingFactor={1}
                onStart={() => setSpeed(0)}
            />

            <SolarSystem />
        </>
    )
}

export default Scene

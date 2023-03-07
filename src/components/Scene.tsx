import {useFrame, useThree} from "@react-three/fiber";
import {OrbitControls } from "@react-three/drei";
import React, {useEffect, useRef} from "react";
import {Vector3} from "three"
import {OrbitControls as OrbitControlsType} from "three-stdlib";
import SolarSystem from "./SolarSystem";
import useEquirectangularMap from "../hooks/useEquirectangularMap";

const Scene: React.FC = () => {
    const { camera } = useThree()
    const controls = useRef<OrbitControlsType>(null)

    const { cube } = useEquirectangularMap({ path: 'textures/solarsystemscope.com/8k_stars_milky_way.jpg'})

    useEffect(() => {
        camera.position.set(10, 10, 10)
    }, [camera])

    useFrame(() => {
        const { current } = controls
        if (!current) {
            return
        }

        const target = current.target
        camera.position
            .sub(target)
            .applyAxisAngle(new Vector3(0, 1, 0), 0.0005)
            .add(target)
    })

    return (
        <>
            {cube && <primitive attach='background' object={cube.texture} />}
            <ambientLight />
            <pointLight position={[1000, 1000, 1000]} />
            <gridHelper
                visible={false}
                args={[50, 25]}
            />
            <OrbitControls
                ref={controls}
            />

            <SolarSystem />
        </>
    )
}

export default Scene

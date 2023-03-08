import React, {useEffect, useRef} from "react";
import {Euler, Group, Matrix4, Mesh, Quaternion, Vector3} from "three";
import {RADIUS_MULTIPLIER, SELF_ROTATION_MULTIPLIER} from "../constants/solar-system-parameters";
import {CelestialObjectSnapshot} from "../models/celestial-object-snapshot";
import useEquirectangularTexture from "../hooks/useEquirectangularTexture";
import {useFrame} from "@react-three/fiber";
import {DEG_TO_RAD} from "../constants/math";

interface PlanetProps {
    object: CelestialObjectSnapshot
}

const CelestialObject: React.FC<PlanetProps> = ({ object }) => {

    const mesh = useRef<Mesh>(null)
    const group = useRef<Group>(null)

    const { name, radius, radiusMultiplier, eqImageUrl } = object

    const { texture } = useEquirectangularTexture({ path: eqImageUrl })

    useEffect(() => {
        const position = new Vector3(
            object.position.x,
            object.position.z,
            -object.position.y
        ).multiplyScalar(object.distance)
        group.current?.position.copy(position)
    }, [object])

    useFrame(() => {
        group.current
            ?.rotation.setFromVector3(new Vector3(object.rotationAxis.x, object.rotationAxis.z, -object.rotationAxis.y))
        mesh.current?.setRotationFromAxisAngle(
            new Vector3(0, 1, 0),
            object.rotationAngle * DEG_TO_RAD * SELF_ROTATION_MULTIPLIER * object.rotationMultiplier
        )
    })

    return (
        <group ref={group}>
            <mesh
                ref={mesh}
            >
                <sphereGeometry args={[radius * RADIUS_MULTIPLIER * radiusMultiplier]} />
                {texture && (name === 'Sun' ? <meshBasicMaterial map={texture} color="white" wireframe={false}/> : <meshPhongMaterial map={texture} color="white" wireframe={false}/>)}
            </mesh>
        </group>
    )
}

export default CelestialObject

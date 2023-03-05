import React, {useEffect, useRef} from "react";
import {Mesh, Vector3} from "three";
import {RADIUS_MULTIPLIER} from "../constants/solar-system-dimensions";
import {CelestialObjectPlaced} from "../models/celestial-object-placed";

interface PlanetProps {
    object: CelestialObjectPlaced
}

const CelestialObject: React.FC<PlanetProps> = ({ object }) => {
    const mesh = useRef<Mesh>(null)

    const { name, radius, radiusMultiplier } = object

    useEffect(() => {
        const position = new Vector3(
            object.position.x,
            object.position.z,
            object.position.y
        ).multiplyScalar(object.distance)
        mesh.current?.position.copy(position)
    }, [object])

    const color = name === 'Sun' ? 'yellow' : 'green'
    return (
        <mesh
            ref={mesh}
        >
            <sphereGeometry args={[radius * RADIUS_MULTIPLIER * radiusMultiplier]} />
            <meshStandardMaterial color={color} wireframe={false} />
        </mesh>
    )
}

export default CelestialObject

import React, {useState} from "react";
import {BarycentricSolarSystem} from "../clases/BarycentricSolarSystem";
import {CelestialObjectSnapshot} from "../models/celestial-object-snapshot";
import {useFrame} from "@react-three/fiber";
import CelestialObject from "./CelestialObject";

interface CelestialObjectsProps {
    system: BarycentricSolarSystem
}

const CelestialObjects: React.FC<CelestialObjectsProps> = ({ system }) => {
    const [data, setData] = useState<CelestialObjectSnapshot[]>(system.getNextState())

    useFrame(() => setData(system.getNextState()))

    return (
        <>
            {data
                .map((object, index) =>
                    <CelestialObject object={object} key={index} />
                )}
        </>
    )
}

export default CelestialObjects

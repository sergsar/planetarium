import React, {useState} from "react";
import {BarycentricSolarSystem} from "../clases/BarycentricSolarSystem";
import {CelestialObjectSnapshot} from "../models/celestial-object-snapshot";
import {useFrame} from "@react-three/fiber";
import CelestialObject from "./CelestialObject";
import {useRecoilValue} from "recoil";
import timeSpeedSelector from "../contexts/timeSpeedSelector";

interface CelestialObjectsProps {
    system: BarycentricSolarSystem
}

const CelestialObjects: React.FC<CelestialObjectsProps> = ({ system }) => {
    const speed = useRecoilValue(timeSpeedSelector)
    const [data, setData] = useState<CelestialObjectSnapshot[]>(system.getNextState(speed))

    useFrame(() => setData(system.getNextState(speed)))

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

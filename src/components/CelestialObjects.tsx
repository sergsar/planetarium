import React, {useState} from "react";
import {BarycentricSolarSystem} from "../classes/BarycentricSolarSystem";
import {CelestialObjectSnapshot} from "../models/celestial-object-snapshot";
import {useFrame} from "@react-three/fiber";
import CelestialObject from "./CelestialObject";
import {useRecoilValue} from "recoil";
import {timeSelector} from "../contexts/timeCycleState";

interface CelestialObjectsProps {
    system: BarycentricSolarSystem
}

const CelestialObjects: React.FC<CelestialObjectsProps> = ({ system }) => {

    const time = useRecoilValue(timeSelector)

    const [data, setData] = useState<CelestialObjectSnapshot[]>(system.getNextState(time))

    useFrame(() => setData(system.getNextState(time)))

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
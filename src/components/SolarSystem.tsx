import React, {useState} from "react";
import CelestialObject from "./CelestialObject";
import {useFrame} from "@react-three/fiber";
import {CelestialObjectSnapshot} from "../models/celestial-object-snapshot";
import useSolarSystem from "../hooks/useSolarSystem";

const SolarSystem: React.FC = () => {
    const [data, setData] = useState<CelestialObjectSnapshot[]>()


    const solarSystem = useSolarSystem()


    useFrame(() => setData(solarSystem?.getNextState()))

    if (!data) {
        return <></>
    }

    return (
        <>
            {data
                .map((object, index) =>
                    <CelestialObject object={object} key={index} />
                )}
        </>
    )
}

export default SolarSystem

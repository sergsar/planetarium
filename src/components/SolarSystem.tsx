import React, {useState} from "react";
import CelestialObject from "./CelestialObject";
import {useFrame} from "@react-three/fiber";
import {CelestialObjectPlaced} from "../models/celestial-object-placed";
import useSolarSystem from "../hooks/useSolarSystem";

const SolarSystem: React.FC = () => {
    const [data, setData] = useState<CelestialObjectPlaced[]>()


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

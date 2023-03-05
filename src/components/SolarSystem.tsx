import React, {useMemo, useState} from "react";
import CelestialObject from "./CelestialObject";
import {useCelestialObjects} from "../hooks/useCelestialObjects";
import {useFrame} from "@react-three/fiber";
import {BarycentricSolarSystem} from "../clases/BarycentricSolarSystem";
import {CelestialObjectPlaced} from "../models/celestial-object-placed";

const SolarSystem: React.FC = () => {
    const [data, setData] = useState<CelestialObjectPlaced[]>()
    const [time, setTime] = useState(0)

    const { data: inputData } = useCelestialObjects()

    const solarSystem = useMemo(() => {
        if (!inputData) {
            return null
        }
        return new BarycentricSolarSystem(inputData)
    }, [inputData])

    useFrame(() => {
        if (!(inputData && solarSystem)) {
            return;
        }
        const nextTime = time + 5000000
        setTime(nextTime)
        setData(
            solarSystem.getBarycentricData(nextTime)
        )
    })

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

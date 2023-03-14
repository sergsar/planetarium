import React from "react";
import CelestialObjects from "./CelestialObjects";
import Orbits from "./Orbits";
import useSolarSystem from "../hooks/useSolarSystem";

const SolarSystem: React.FC = () => {

    const { system } = useSolarSystem()

    return (
        <>
            <CelestialObjects system={system} />
            <Orbits system={system} />
        </>
    )
}

export default SolarSystem

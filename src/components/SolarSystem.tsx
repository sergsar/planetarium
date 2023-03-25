import React from "react";
import CelestialObjects from "./CelestialObjects";
import Orbits from "./Orbits";
import {useRecoilValue} from "recoil";
import solarSystemState from "../contexts/solarSystemState";

const SolarSystem: React.FC = () => {

    const system = useRecoilValue(solarSystemState)


    return (
        <>
            <CelestialObjects system={system} />
            <Orbits system={system} />
        </>
    )
}

export default SolarSystem

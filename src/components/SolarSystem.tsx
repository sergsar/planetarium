import React from "react";
import {useRecoilValue} from "recoil";
import solarSystemSelector from "../contexts/solarSystemSelector";
import CelestialObjects from "./CelestialObjects";
import Orbits from "./Orbits";

const SolarSystem: React.FC = () => {

    const { system } = useRecoilValue(solarSystemSelector)

    return (
        <>
            <CelestialObjects system={system} />
            <Orbits system={system} />
        </>
    )
}

export default SolarSystem

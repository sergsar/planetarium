import {useRecoilValue} from "recoil";
import celestialObjectsSelector from "../contexts/celestialObjectsSelector";
import {useMemo} from "react";
import {BarycentricSolarSystem} from "../clases/BarycentricSolarSystem";

const useSolarSystem = () => {
    const { data } = useRecoilValue(celestialObjectsSelector)

    const solarSystem = useMemo(
        () => data ? new BarycentricSolarSystem(data) : null,
        [data]
    )

    return solarSystem
}

export default useSolarSystem

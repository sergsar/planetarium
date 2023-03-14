import celestialObjectsSelector from "../contexts/celestialObjectsSelector";
import {useRecoilValue} from "recoil";
import {BarycentricSolarSystem} from "../clases/BarycentricSolarSystem";
import {useMemo} from "react";

const useSolarSystem = () => {
    const { data } = useRecoilValue(celestialObjectsSelector)
    const system = useMemo(() => new BarycentricSolarSystem(data), [data])

    return { system }
}

export default useSolarSystem

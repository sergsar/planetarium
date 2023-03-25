import celestialObjectsSelector from "../contexts/celestialObjectsSelector";
import {useRecoilValue} from "recoil";
import {BarycentricSolarSystem} from "../clases/BarycentricSolarSystem";
import {useMemo} from "react";
import {timeSelector} from "../contexts/timeCycleState";

const useSolarSystem = () => {
    const { data } = useRecoilValue(celestialObjectsSelector)
    const time = useRecoilValue(timeSelector)

    const system = useMemo(() => {
        return new BarycentricSolarSystem(data, time)
    }, [data])

    return { system }
}

export default useSolarSystem

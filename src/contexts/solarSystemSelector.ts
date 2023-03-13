import {selector} from "recoil";
import celestialObjectsSelector from "./celestialObjectsSelector";
import {BarycentricSolarSystem} from "../clases/BarycentricSolarSystem";

const solarSystemSelector = selector<{ system: BarycentricSolarSystem }>({
    key: 'SolarSystem',
    get: async ({ get }) => {
        const { data } = get(celestialObjectsSelector)
        return { system: new BarycentricSolarSystem(data) }
    },
    dangerouslyAllowMutability: true
})

export default solarSystemSelector

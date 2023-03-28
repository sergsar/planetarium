import {atom} from "recoil";
import {timeState} from "./timeCycleState";
import celestialObjectsSelector from "./celestialObjectsSelector";
import {BarycentricSolarSystem} from "../classes/BarycentricSolarSystem";

const solarSystemState = atom<BarycentricSolarSystem>({
    key: 'SolarSystemState',
    effects: [
        ({ getPromise, setSelf }) => {
            Promise.all([
                getPromise(timeState),
                getPromise(celestialObjectsSelector)
            ]).then(([time, { data }]) => {
                setSelf(new BarycentricSolarSystem(data, time))
            })
        }
    ]
})

export default solarSystemState

import {selector} from "recoil";
import celestialObjectsDataSelector from "./celestialObjectsDataSelector";
import {CelestialObjectModel} from "../models/celestial-objects-model";
import {convertObjectToModel} from "../utils/celestial-objects";

const celestialObjectsSelector = selector<{ data: CelestialObjectModel[] }>({
    key: 'CelestialObjects',
    get: async ({ get }) => {
        const data = get(celestialObjectsDataSelector)
            .data
            .objects
            .map((item) =>
                convertObjectToModel(item)
            )
        return { data }
    }
})

export default celestialObjectsSelector

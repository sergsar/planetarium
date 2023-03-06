import {selector} from "recoil";
import axios from "axios";
import {CelestialObjectsContract} from "../contracts/celestial-object-contract";

const celestialObjectsDataSelector = selector<{ data: CelestialObjectsContract }>({
    key: 'CelestialObjectsData',
    get: async () => {
        const { data } = await axios.get<CelestialObjectsContract>(`data/celestial-objects-data.json`)
        return { data }
    }
})

export default celestialObjectsDataSelector

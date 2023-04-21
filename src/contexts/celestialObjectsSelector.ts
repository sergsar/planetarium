import axios from 'axios'
import { selector } from 'recoil'

import { CelestialObjectsContract } from '../contracts/celestial-object-contract'
import { CelestialObjectModel } from '../models/celestial-objects-model'
import { convertObjectToModel } from '../utils/celestial-objects'

const celestialObjectsDataSelector = selector<{
  data: CelestialObjectsContract
}>({
  key: 'CelestialObjectsData',
  get: async () => {
    const { data } = await axios.get<CelestialObjectsContract>(
      `data/celestial-objects-data.json`
    )
    return { data }
  }
})

const celestialObjectsSelector = selector<{ data: CelestialObjectModel[] }>({
  key: 'CelestialObjects',
  get: ({ get }) => {
    const data = get(celestialObjectsDataSelector).data.objects.map((item) =>
      convertObjectToModel(item)
    )
    return { data }
  }
})

export default celestialObjectsSelector

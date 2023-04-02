import { selector } from 'recoil'

import { CelestialObjectModel } from '../models/celestial-objects-model'
import { convertObjectToModel } from '../utils/celestial-objects'
import celestialObjectsDataSelector from './celestialObjectsDataSelector'

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

import { atom } from 'recoil'

import { BarycentricSolarSystem } from '../classes/BarycentricSolarSystem'
import celestialObjectsSelector from './celestialObjectsSelector'
import { timeSelector } from './clockSelectors'

const solarSystemState = atom<BarycentricSolarSystem>({
  key: 'SolarSystemState',
  effects: [
    ({ getPromise, setSelf }) => {
      Promise.all([
        getPromise(timeSelector),
        getPromise(celestialObjectsSelector)
      ]).then(([time, { data }]) => {
        setSelf(new BarycentricSolarSystem(data, time))
      })
    }
  ]
})

export default solarSystemState

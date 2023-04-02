import React from 'react'
import { useRecoilValue } from 'recoil'

import solarSystemState from '../contexts/solarSystemState'
import CelestialObjects from './CelestialObjects'
import Orbits from './Orbits'

const SolarSystem: React.FC = () => {
  const system = useRecoilValue(solarSystemState)

  return (
    <>
      <CelestialObjects system={system} />
      <Orbits system={system} />
    </>
  )
}

export default SolarSystem

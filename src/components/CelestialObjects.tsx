import { useFrame } from '@react-three/fiber'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { BarycentricSolarSystem } from '../classes/BarycentricSolarSystem'
import { clockSelector } from '../contexts/clockSelectors'
import { CelestialObjectSnapshot } from '../models/celestial-object-snapshot'
import CelestialObject from './CelestialObject'

interface CelestialObjectsProps {
  system: BarycentricSolarSystem
}

const CelestialObjects: React.FC<CelestialObjectsProps> = ({ system }) => {
  const clock = useRecoilValue(clockSelector)

  const [data, setData] = useState<CelestialObjectSnapshot[]>(
    system.getNextState(clock.getTime())
  )

  useFrame(() => setData(system.getNextState(clock.getTime())))

  return (
    <>
      {data.map((object, index) => (
        <CelestialObject object={object} key={index} />
      ))}
    </>
  )
}

export default CelestialObjects

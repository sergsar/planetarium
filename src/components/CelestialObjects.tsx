import { useFrame } from '@react-three/fiber'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { BarycentricSolarSystem } from '../classes/BarycentricSolarSystem'
import { timeSelector } from '../contexts/timeCycleState'
import { CelestialObjectSnapshot } from '../models/celestial-object-snapshot'
import CelestialObject from './CelestialObject'

interface CelestialObjectsProps {
  system: BarycentricSolarSystem
}

const CelestialObjects: React.FC<CelestialObjectsProps> = ({ system }) => {
  const time = useRecoilValue(timeSelector)

  const [data, setData] = useState<CelestialObjectSnapshot[]>(
    system.getNextState(time)
  )

  useFrame(() => setData(system.getNextState(time)))

  return (
    <>
      {data.map((object, index) => (
        <CelestialObject object={object} key={index} />
      ))}
    </>
  )
}

export default CelestialObjects

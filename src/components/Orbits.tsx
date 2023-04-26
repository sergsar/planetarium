import { extend, useThree } from '@react-three/fiber'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { ShaderChunk, Vector2 } from 'three'
import { NormalBlending } from 'three/src/constants'

import { BarycentricSolarSystem } from '../classes/BarycentricSolarSystem'
import objectNameState from '../contexts/objectNameState'
import textureSelector from '../contexts/textureSelector'

extend({ MeshLineGeometry, MeshLineMaterial })

interface OrbitsProps {
  system: BarycentricSolarSystem
}

interface OrbitProps {
  path: Array<{ x: number; y: number; z: number }>
  name: string
}

const Orbit: React.FC<OrbitProps> = ({ path, name }) => {
  const objectName = useRecoilValue(objectNameState)
  const { gl } = useThree()
  const { texture } = useRecoilValue(textureSelector('textures/line.png'))
  const points = useMemo(
    () =>
      path.reduce(
        (acc, curr) => [...acc, curr.x, curr.z, -curr.y],
        [] as number[]
      ),
    [path]
  )

  const opacity = useMemo(
    () => (objectName === name ? 0.55 : 0.24),
    [objectName]
  )

  return (
    <mesh>
      <meshLineGeometry points={points} />
      <meshLineMaterial
        sizeAttenuation={0}
        resolution={gl.getSize(new Vector2())}
        // depthTest={false}
        depthWrite={false}
        transparent={true}
        blending={NormalBlending}
        color={'#3f82cf'}
        lineWidth={25}
        opacity={opacity}
        useMap={1}
        repeat={new Vector2(12, 1)}
        map={texture}
        fragmentShader={ShaderChunk['meshline_frag']}
      />
    </mesh>
  )
}

const Orbits: React.FC<OrbitsProps> = ({ system }) => {
  const paths = useMemo(() => {
    return system.paths.filter((path) => path.name !== 'Sun')
  }, [system])

  return (
    <>
      {paths.map((item, index) => (
        <Orbit key={index} path={item.path} name={item.name} />
      ))}
    </>
  )
}

export default Orbits

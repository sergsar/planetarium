import { useFrame } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  DoubleSide,
  Group,
  Mesh,
  MeshPhongMaterial,
  ShaderMaterial,
  Texture,
  Vector3
} from 'three'

import { DEG_TO_RAD } from '../constants/math'
import {
  RADIUS_MULTIPLIER,
  SELF_ROTATION_MULTIPLIER
} from '../constants/solar-system-parameters'
import fbxSelector from '../contexts/fbxSelector'
import objectNameState from '../contexts/objectNameState'
import useEquirectangularTexture from '../hooks/useEquirectangularTexture'
import { CelestialObjectSnapshot } from '../models/celestial-object-snapshot'
import * as atmosphereShaders from '../shaders/atmosphere-shaders'
import * as sunShaders from '../shaders/sun-shaders'

interface CelestialObjectProps {
  object: CelestialObjectSnapshot
}

interface CelestialObjectMaterialProps {
  name: string
  texture: Texture
  wireframe: boolean
}

interface SunMaterialProps {
  texture: Texture
  wireframe: boolean
}

const SunMaterial: React.FC<SunMaterialProps> = ({ texture }) => {
  const material = useRef<ShaderMaterial>(null)

  const sunMaterialParameters = useMemo(() => {
    return {
      uniforms: {
        map: { value: texture }
      },
      vertexShader: sunShaders.vertex,
      fragmentShader: sunShaders.fragment
    }
  }, [texture])

  return (
    <shaderMaterial
      ref={material}
      transparent={true}
      {...sunMaterialParameters}
    />
  )
}

const CelestialObjectMaterial: React.FC<CelestialObjectMaterialProps> = ({
  name,
  texture,
  wireframe
}) => {
  if (name === 'Sun') {
    texture.generateMipmaps = false
    return <SunMaterial texture={texture} wireframe={wireframe} />
  }
  return <meshPhongMaterial map={texture} color="white" wireframe={wireframe} />
}

const Atmosphere: React.FC<{
  color: Vector3
  scale: number
  melt?: number
}> = ({ color, scale, melt = 1 }) => {
  const material = useRef<ShaderMaterial>(null)

  const atmMaterialParameters = useMemo(() => {
    return {
      vertexShader: atmosphereShaders.vertex,
      fragmentShader: atmosphereShaders.fragment,
      uniforms: {
        color: { value: color },
        melt: { value: melt }
      }
    }
  }, [])

  return (
    <mesh scale={scale}>
      <sphereGeometry />
      <shaderMaterial
        ref={material}
        {...atmMaterialParameters}
        transparent={true}
      />
    </mesh>
  )
}

const Rings: React.FC<{ name: string }> = ({ name }) => {
  const { group } = useRecoilValue(fbxSelector(`fbx/${name}.fbx`))

  const [model, setModel] = useState<Group>()

  useEffect(() => {
    const model = group.clone(true)
    model.children.forEach((item) => {
      if (!(item instanceof Mesh)) {
        return
      }
      const material = item.material
      if (!(material instanceof MeshPhongMaterial)) {
        return
      }
      material.side = DoubleSide
      material.emissive.set('white')
    })
    setModel(model)
  }, [group])
  if (!model) {
    return <></>
  }
  return <primitive object={model} position={0} scale={1.9} />
}

const SEGMENTS: { [key: string]: number } = {
  Sun: 64,
  Earth: 32,
  Jupiter: 32,
  Saturn: 32
}

const CelestialObject: React.FC<CelestialObjectProps> = ({ object }) => {
  const [objectName, setObjectName] = useRecoilState(objectNameState)
  const mesh = useRef<Mesh>(null)
  const group = useRef<Group>(null)

  const { name, radius, radiusMultiplier, eqImageUrl } = object

  const scaledRadius = useMemo(
    () => radius * RADIUS_MULTIPLIER * radiusMultiplier,
    [radius, radiusMultiplier]
  )

  const { texture } = useEquirectangularTexture({ path: eqImageUrl })

  const segments = useMemo(() => SEGMENTS[object.name] || 16, [object])

  useEffect(() => {
    const position = new Vector3(
      object.position.x,
      object.position.z,
      -object.position.y
    )
    group.current?.position.copy(position)
  }, [object])

  useFrame(() => {
    group.current?.rotation.setFromVector3(
      new Vector3(
        object.rotationAxis.x,
        object.rotationAxis.z,
        -object.rotationAxis.y
      )
    )
    mesh.current?.setRotationFromAxisAngle(
      new Vector3(0, 1, 0),
      object.rotationAngle *
        DEG_TO_RAD *
        SELF_ROTATION_MULTIPLIER *
        object.rotationMultiplier
    )
  })

  return (
    <group ref={group} scale={scaledRadius}>
      {['Saturn'].includes(name) && <Rings name="saturn" />}
      {['Uranus'].includes(name) && <Rings name="uranus" />}
      {['Earth'].includes(name) && (
        <Atmosphere color={new Vector3(0.7, 0.7, 1)} scale={1.1} melt={0.25} />
      )}
      {objectName === name && (
        <Atmosphere color={new Vector3(1, 1, 1)} scale={1.15} melt={0.4} />
      )}

      <mesh ref={mesh} visible={true}>
        <sphereGeometry args={[1, segments, segments]} />
        {texture && (
          <CelestialObjectMaterial
            name={name}
            texture={texture}
            wireframe={false}
          />
        )}
      </mesh>
      <mesh
        onClick={(e) => {
          setObjectName(objectName === name ? null : name)
          e.stopPropagation()
        }}
        scale={Math.max(1, 1 / scaledRadius)}
        visible={false}
      >
        <sphereGeometry args={[1, segments, segments]} />
      </mesh>
    </group>
  )
}

export default CelestialObject

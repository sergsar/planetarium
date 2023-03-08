import React, {useEffect, useMemo, useRef} from "react";
import {Group, Mesh, ShaderMaterial, Texture, Vector3} from "three";
import {RADIUS_MULTIPLIER, SELF_ROTATION_MULTIPLIER} from "../constants/solar-system-parameters";
import {CelestialObjectSnapshot} from "../models/celestial-object-snapshot";
import useEquirectangularTexture from "../hooks/useEquirectangularTexture";
import {useFrame, useThree} from "@react-three/fiber";
import {DEG_TO_RAD} from "../constants/math";
import * as sunShaders from "../shaders/sun-shaders"

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
    const { camera } = useThree()

    const material = useRef<ShaderMaterial>(null)

    const sunMaterialParameters = useMemo(() => {
        return {
            uniforms: {
                map: { value: texture},
                cameraVector: { type: "v3", value: camera.position }
            },
            vertexShader: sunShaders.vertex,
            fragmentShader: sunShaders.fragment
        }
    }, [])


    useFrame(() => {
        if (material.current) {
            material.current.uniforms.cameraVector.value = camera.position
        }
    })

    return <shaderMaterial ref={material} {...sunMaterialParameters} transparent={true} />
}

const CelestialObjectMaterial: React.FC<CelestialObjectMaterialProps> = ({ name, texture, wireframe }) => {


    if (name === 'Sun') {
        return <SunMaterial texture={texture} wireframe={wireframe} />
    }
    return <meshPhongMaterial map={texture} color="white" wireframe={wireframe}/>
}

const CelestialObject: React.FC<CelestialObjectProps> = ({ object }) => {

    const mesh = useRef<Mesh>(null)
    const group = useRef<Group>(null)

    const { name, radius, radiusMultiplier, eqImageUrl } = object

    const { texture } = useEquirectangularTexture({ path: eqImageUrl })

    useEffect(() => {
        const position = new Vector3(
            object.position.x,
            object.position.z,
            -object.position.y
        ).multiplyScalar(object.distance)
        group.current?.position.copy(position)
    }, [object])

    useFrame(() => {
        group.current
            ?.rotation.setFromVector3(new Vector3(object.rotationAxis.x, object.rotationAxis.z, -object.rotationAxis.y))
        mesh.current?.setRotationFromAxisAngle(
            new Vector3(0, 1, 0),
            object.rotationAngle * DEG_TO_RAD * SELF_ROTATION_MULTIPLIER * object.rotationMultiplier
        )
    })

    return (
        <group ref={group}>
            <mesh
                ref={mesh}
            >
                <sphereGeometry args={[radius * RADIUS_MULTIPLIER * radiusMultiplier]} />
                {texture && <CelestialObjectMaterial name={name} texture={texture} wireframe={false} />}
            </mesh>
        </group>
    )
}

export default CelestialObject

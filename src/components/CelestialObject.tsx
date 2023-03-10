import React, {useEffect, useMemo, useRef, useState} from "react";
import {DoubleSide, Group, Mesh, MeshPhongMaterial, ShaderMaterial, Texture, Vector3} from "three";
import {RADIUS_MULTIPLIER, SELF_ROTATION_MULTIPLIER} from "../constants/solar-system-parameters";
import {CelestialObjectSnapshot} from "../models/celestial-object-snapshot";
import useEquirectangularTexture from "../hooks/useEquirectangularTexture";
import {useFrame} from "@react-three/fiber";
import {DEG_TO_RAD} from "../constants/math";
import * as sunShaders from "../shaders/sun-shaders"
import * as atmosphereShaders from "../shaders/atmosphere-shaders"
import {useFBX} from "@react-three/drei";
import {useRecoilValue} from "recoil";
import fbxSelector from "../contexts/fbxSelector";

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
                map: { value: texture},
            },
            vertexShader: sunShaders.vertex,
            fragmentShader: sunShaders.fragment
        }
    }, [texture])



    return <shaderMaterial ref={material} {...sunMaterialParameters} transparent={true} />
}

const CelestialObjectMaterial: React.FC<CelestialObjectMaterialProps> = ({ name, texture, wireframe }) => {


    if (name === 'Sun') {
        texture.generateMipmaps = false
        return <SunMaterial texture={texture} wireframe={wireframe} />
    }
    return <meshPhongMaterial map={texture} color="white" wireframe={wireframe}/>
}

const Atmosphere: React.FC = () => {
    const material = useRef<ShaderMaterial>(null)

    const atmMaterialParameters = useMemo(() => {
        return {
            vertexShader: atmosphereShaders.vertex,
            fragmentShader: atmosphereShaders.fragment
        }
    }, [])

    return (
        <mesh scale={1.1}>
            <sphereGeometry />
            <shaderMaterial  ref={material} {...atmMaterialParameters} transparent={true} />
        </mesh>
    )
}

const SaturnRings: React.FC = () => {
    const { group } = useRecoilValue(fbxSelector('fbx/saturn.fbx'))

    const [model, setModel] = useState<Group>()

    useEffect(() => {
        const model = group.clone(true)
        model.children.forEach((item) => {
            if (!(item instanceof Mesh)) {
                return
            }
            const material = item.material
            if (!(material instanceof MeshPhongMaterial)) {
                return;
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
        <group ref={group} scale={radius * RADIUS_MULTIPLIER * radiusMultiplier}>
            {['Saturn'].includes(name) && <SaturnRings />}
            {['Earth'].includes(name) && <Atmosphere />}
            <mesh
                ref={mesh}
            >
                <sphereGeometry />
                {texture && <CelestialObjectMaterial name={name} texture={texture} wireframe={false} />}
            </mesh>
        </group>
    )
}

export default CelestialObject

import React, {useMemo} from "react";
import {BarycentricSolarSystem} from "../clases/BarycentricSolarSystem";
import {extend, useThree} from '@react-three/fiber'
import { MeshLineGeometry, MeshLineMaterial } from "meshline"
import {useRecoilValue} from "recoil";
import textureSelector from "../contexts/textureSelector";
import {AdditiveBlending, MultiplyBlending, NoBlending, ShaderChunk, Vector2} from "three";
import {NormalBlending} from "three/src/constants";

extend({ MeshLineGeometry, MeshLineMaterial })

interface OrbitsProps {
    system: BarycentricSolarSystem
}

interface OrbitProps {
    path: Array<{ x: number, y: number, z: number }>
}

const Orbit: React.FC<OrbitProps> = ({ path }) => {
    const { gl } = useThree()
    const { texture } = useRecoilValue(textureSelector('textures/line.png'))
    const points = useMemo(() =>
        path.reduce((acc, curr) =>
            [...acc, curr.x, curr.z, -curr.y],
            [] as number[]
        ),
        [path]
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

                color={0x3f82cf}
                lineWidth={25}
                opacity={0.25}
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
            {paths.map((item, index) => <Orbit key={index} path={item.path} />)}
        </>
    )
}

export default Orbits

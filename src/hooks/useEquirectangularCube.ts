import {useEffect, useState} from "react";
import {Texture, TextureLoader, WebGLCubeRenderTarget} from "three";
import {useThree} from "@react-three/fiber";

const useEquirectangularCube = ({ path }: { path: string }) => {
    const { gl } = useThree()
    const [texture, setTexture] = useState<Texture|null>(null)
    const [cube, setCube] = useState<WebGLCubeRenderTarget|null>(null)
    useEffect(() => {
        if (!path) {
            return
        }
        const textureLoader = new TextureLoader()
        textureLoader.load(path, (texture) => setTexture(texture))
    }, [path])

    useEffect(() => {
        if (!(gl && texture)) {
            return
        }
        const formatted = new WebGLCubeRenderTarget(texture.image.height)
            .fromEquirectangularTexture(gl, texture)
        setCube(formatted)
    }, [texture, gl])

    return { cube }
}

export default useEquirectangularCube

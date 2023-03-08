import {useEffect, useState} from "react";
import {
    ClampToEdgeWrapping,
    EquirectangularReflectionMapping,
    Texture,
    TextureLoader,
    WebGLCubeRenderTarget
} from "three";
import {CubeReflectionMapping} from "three/src/constants";

const useEquirectangularTexture = ({ path }: { path: string }) => {
    const [texture, setTexture] = useState<Texture|null>(null)

    useEffect(() => {
        if (!path) {
            return
        }
        const textureLoader = new TextureLoader()
        textureLoader.load(path, (texture) => setTexture(texture))
    }, [path])

    useEffect(() => {
        if (!texture) {
            return
        }
        texture.mapping = EquirectangularReflectionMapping
    }, [texture])

    return { texture }
}

export default useEquirectangularTexture

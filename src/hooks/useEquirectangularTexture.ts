import {useEffect, useState} from "react";
import {
    EquirectangularReflectionMapping,
    Texture,
    TextureLoader
} from "three";

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

import {useEffect, useState} from "react";
import {
    EquirectangularReflectionMapping,
    Texture,
    TextureLoader
} from "three";
import {useRecoilValue} from "recoil";
import textureSelector from "../contexts/textureSelector";

const useEquirectangularTexture = ({ path }: { path: string }) => {
    const { texture } = useRecoilValue(textureSelector(path))

    useEffect(() => {
        if (!texture) {
            return
        }
        texture.mapping = EquirectangularReflectionMapping
    }, [texture])

    return { texture }
}

export default useEquirectangularTexture

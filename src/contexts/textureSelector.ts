import {selectorFamily} from "recoil";
import {Texture, TextureLoader} from "three";
import {sleep} from "../utils/async";

const textureSelector = selectorFamily<{ texture: Texture }, string>({
    key: 'TextureSelector',
    get: (url) => async () => {
        const textureLoader = new TextureLoader()
        const texture = await textureLoader.loadAsync(url)
        // await sleep(1500)
        return { texture }
    },
    dangerouslyAllowMutability: true
})

export default textureSelector

import { selectorFamily } from 'recoil'
import { Texture, TextureLoader } from 'three'

const textureSelector = selectorFamily<{ texture: Texture }, string>({
  key: 'TextureSelector',
  get: (url) => async () => {
    const textureLoader = new TextureLoader()
    const texture = await textureLoader.loadAsync(url)
    return { texture }
  },
  dangerouslyAllowMutability: true
})

export default textureSelector

import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { EquirectangularReflectionMapping } from 'three'

import textureSelector from '../contexts/textureSelector'

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

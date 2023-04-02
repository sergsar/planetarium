import { useDeferredValue } from 'react'
import { RecoilValue, useRecoilValue } from 'recoil'

const useDeferredRecoilValue = <T>(recoil: RecoilValue<T>) => {
  const value = useRecoilValue(recoil)
  return useDeferredValue(value)
}

export default useDeferredRecoilValue

import { atom } from 'recoil'

const objectNameState = atom<string | null>({
  key: 'objectNameState',
  default: null
})

export default objectNameState

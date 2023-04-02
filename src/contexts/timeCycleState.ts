import { atom, selector } from 'recoil'

import { SECOND_PER_DAY } from '../constants/date-time'
import { sleep } from '../utils/async'

interface IFrameState {
  frame: number
  speed: number
  moment: number
  time: number
}
const incrementFrameState = (state: IFrameState, frame: number) => {
  let { moment } = state
  const { time, speed } = state
  const now = Date.now()
  const delta = now - moment

  moment = now
  return {
    ...state,
    moment,
    frame,
    time: time + delta * SECOND_PER_DAY * speed
  }
}

const frameState = atom<IFrameState>({
  key: 'frameState',
  default: {
    moment: Date.now(),
    frame: 0,
    speed: 1,
    time: Date.now()
  },
  effects: [
    ({ node, getLoadable, setSelf }) => {
      const loadable = getLoadable(node)
      if (loadable.state === 'hasValue') {
        console.log('canceling animation frame: ', loadable.contents.frame)
        cancelAnimationFrame(loadable.contents.frame)
      }
    },
    ({ setSelf }) => {
      // starting frame incrementation
      const callback = () => {
        const frame = requestAnimationFrame(callback)
        if (frame < 100) {
          return
        }
        setSelf((state) => incrementFrameState(state as IFrameState, frame))
      }
      const frame = requestAnimationFrame(callback)
      setSelf((state) => incrementFrameState(state as IFrameState, frame))
    }
  ]
})

export const timeSelector = selector({
  key: 'TimeSelector',
  get: ({ get }) => get(frameState).time,
  set: ({ set }, newValue) => {
    console.log('set time')
    set(frameState, (state: IFrameState) => ({
      ...state,
      time: newValue as number
    }))
  }
})

export const speedSelector = selector({
  key: 'SpeedSelector',
  get: ({ get }) => get(frameState).speed,
  set: ({ set }, newValue) => {
    console.log('set speed')
    set(frameState, (state: IFrameState) => ({
      ...state,
      speed: newValue as number
    }))
  }
})

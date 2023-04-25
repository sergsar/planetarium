import { atom, selector } from 'recoil'

import { SECOND_PER_DAY } from '../constants/date-time'

type ClockData = {
  frame: number
  speed: number
  moment: number
  time: number
}

type ClockState = Clock & {
  setTime: (value: number) => void
  getSpeed: () => number
  setSpeed: (value: number) => void
}

type Clock = {
  getTime: () => number
}

const incrementClock = (data: ClockData, frame: number) => {
  let { moment } = data
  const { time, speed } = data
  const now = Date.now()
  const delta = now - moment

  moment = now

  return {
    ...data,
    moment,
    frame,
    time: time + delta * SECOND_PER_DAY * speed
  }
}

const clockState = atom<ClockState>({
  key: 'FrameState',
  default: (() => {
    let data: ClockData = {
      moment: Date.now(),
      frame: 0,
      speed: 1,
      time: Date.now()
    }

    const callback = () => {
      const frame = requestAnimationFrame(callback)
      data = incrementClock(data, frame)
    }
    const frame = requestAnimationFrame(callback)
    data = incrementClock(data, frame)

    return {
      getTime: () => data.time,
      setTime: (value: number) => (data.time = value),
      setSpeed: (value: number) => (data.speed = value),
      getSpeed: () => data.speed
    }
  })()
})

export const clockSelector = selector<Clock>({
  key: 'ClockSelector',
  get: ({ get }) => {
    return get(clockState)
  }
})

export const timeSelector = selector<number>({
  key: 'TimeSelector',
  get: ({ get }) => get(clockState).getTime(),
  set: ({ get, set }, newValue) => {
    console.log('set time')
    get(clockState).setTime(newValue as number)
    set(clockState, (state) => ({
      ...state
    }))
  }
})

export const speedSelector = selector<number>({
  key: 'SpeedSelector',
  get: ({ get }) => get(clockState).getSpeed(),
  set: ({ get, set }, newValue) => {
    console.log('set time')
    get(clockState).setSpeed(newValue as number)
    set(clockState, (state) => ({
      ...state
    }))
  }
})

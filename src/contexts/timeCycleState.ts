import {atom, selector} from "recoil";
import {ASTRONOMY_TIME_MULTIPLIER} from "../constants/astronomy-engine";

const timeCycleInternalState = atom<{ time: number, moment: number }>({
    key: 'TimeCycleInternalState',
    default: { time: 0, moment: Date.now() },
    effects: [
        ({ getPromise, node, setSelf, trigger, getLoadable }) => {
            const callback = async () => {
                requestAnimationFrame(callback)
                const value = await getPromise(node)
                const speed = await getPromise(speedState)
                let moment = value.moment
                const now = Date.now()
                const delta = now - moment
                moment = now
                setSelf({
                    ...value,
                    time: value.time + delta * 1000 * 60 * 60 * speed * ASTRONOMY_TIME_MULTIPLIER,
                    moment
                })
            }
            requestAnimationFrame(callback)
        }
    ]
})

export const speedState = atom({
    key: 'SpeedState',
    default: 1
})

export const timeSelector = selector({
    key: 'TimeSelector',
    get: ({ get }) => get(timeCycleInternalState).time
})

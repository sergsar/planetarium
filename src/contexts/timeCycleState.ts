import {atom, selector} from "recoil";
import {sleep} from "../utils/async";
import {SECOND_PER_DAY} from "../constants/date-time";

const timeCycleInternalState = atom<{ time: number, moment: number }>({
    key: 'TimeCycleInternalState',
    default: { time: Date.now(), moment: 0 },
    effects: [
        ({ getPromise, node, setSelf }) => {
            const callback = async () => {
                requestAnimationFrame(callback)
                const value = await getPromise(node)
                const speed = await getPromise(speedState)
                let moment = value.moment
                if (!moment) {
                    // recoil freezing hot fix TODO: fix and remove
                    await sleep(500)
                    // initialization
                    moment = value.time
                }
                const now = Date.now()
                const delta = now - moment

                moment = now
                setSelf(() => ({
                    ...value,
                    time: value.time + delta * SECOND_PER_DAY * speed,
                    moment
                }))
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

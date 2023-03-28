import {atom} from "recoil";
import {sleep} from "../utils/async";
import {SECOND_PER_DAY} from "../constants/date-time";

export const timeState = atom<number>({
    key: 'TimeCycleInternalState',
    default: new Promise(async (resolve) => {
        let frame
        resolve(Date.now())
        const callback = () => {
            frame = requestAnimationFrame(callback)
            console.log('frame: ', frame)
            cancelAnimationFrame(frame)
        }
        frame = requestAnimationFrame(callback)
    }),
    effects: [
        ({ getPromise, node, setSelf }) => {
            let moment = 0
            const callback = async () => {
                const value = await getPromise(node)
                const speed = await getPromise(speedState)

                if (!moment) {
                    // recoil freezing hot fix TODO: fix and remove
                    await sleep(500)
                    // initialization
                    console.log('init')
                    moment = value
                }
                const now = Date.now()
                const delta = now - moment

                moment = now
                setSelf(value + delta * SECOND_PER_DAY * speed)
                requestAnimationFrame(callback)
            }
            requestAnimationFrame(callback)
        }
    ]
})

export const speedState = atom({
    key: 'SpeedState',
    default: 1
})

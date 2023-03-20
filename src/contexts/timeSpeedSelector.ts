import {atom} from "recoil";

// Time - hours per second

const timeSpeedSelector = atom({
    key: 'TimePerFrame',
    default: 1
})

export default timeSpeedSelector

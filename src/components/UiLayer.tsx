import {Box, Slider} from "@mui/material";
import React, {useCallback, useDeferredValue, useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import timeSpeedSelector from "../contexts/timeSpeedSelector";

const UiLayer = () => {
    const [speed, setSpeed] = useRecoilState(timeSpeedSelector)
    const [value, setValue] = useState(speed)
    const deferredValue = useDeferredValue(value)
    useEffect(() => setSpeed(deferredValue), [deferredValue])
    const handleChange = useCallback((event: unknown, value: unknown) => {
        if (!(typeof value === 'number')) {
            return
        }

        setValue(value)
    }, [])
    return (
        <Box zIndex={10} position="absolute" color="white" height={200} width="100%" component="div">
            <Slider value={speed} onChange={handleChange} step={0.1} min={0.1} max={10} valueLabelDisplay="auto" />
            Test
        </Box>
    )
}

export default UiLayer

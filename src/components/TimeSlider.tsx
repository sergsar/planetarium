import {useRecoilState} from "recoil";
import {speedState} from "../contexts/timeCycleState";
import React, {useCallback, useDeferredValue, useEffect, useState} from "react";
import {Box, BoxProps, Slider} from "@mui/material";

const TimeSlider: React.FC<{} & BoxProps> = ({ ...props }) => {
    const [speed, setSpeed] = useRecoilState(speedState)
    const [value, setValue] = useState(speed)
    const deferredValue = useDeferredValue(value)
    useEffect(() => {
        setSpeed(deferredValue)
    }, [setSpeed, deferredValue])
    const handleChange = useCallback((event: unknown, value: unknown) => {
        if (!(typeof value === 'number')) {
            return
        }

        setValue(value)
    }, [])

    return (
        <Box {...props} component="div">
            <Slider
                sx={{ alignSelf: 'center' }}
                size="small"
                value={speed}
                onChange={handleChange}
                step={0.1}
                min={-10}
                max={10}
                valueLabelDisplay="off"
            />
        </Box>
    )
}

export default TimeSlider

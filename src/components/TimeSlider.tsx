import { Box, BoxProps, Slider } from '@mui/material'
import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useState
} from 'react'
import { useRecoilState } from 'recoil'

import { speedSelector } from '../contexts/clockSelectors'

const TimeSlider: React.FC<BoxProps> = ({ ...props }) => {
  const [speed, setSpeed] = useRecoilState(speedSelector)
  const [value, setValue] = useState(speed)
  const deferredValue = useDeferredValue(value)
  useEffect(() => {
    setSpeed(deferredValue)
  }, [setSpeed, deferredValue])
  const handleChange = useCallback((event: unknown, value: unknown) => {
    if (!(typeof value === 'number')) {
      return
    }
    let result = value
    if (Math.abs(value) < 0.2) {
      result = 0
    }
    setValue(result)
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

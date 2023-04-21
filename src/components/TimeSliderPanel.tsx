import { Box, BoxProps, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import { useRecoilValue } from 'recoil'

import { speedSelector } from '../contexts/timeCycleState'
import TimeSlider from './TimeSlider'

export const TimeSliderPanel = forwardRef<typeof Box, BoxProps>(
  function TimeSliderPanel(props, ref) {
    const speed = useRecoilValue(speedSelector)
    return (
      <Box
        {...props}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderTop: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.3)'
        }}
        gap="16px"
        padding="4px 16px"
        display="flex"
        flexDirection="row"
        height={50}
        width="100%"
        component="div"
        justifyContent="space-around"
      >
        <TimeSlider
          flex="auto"
          width="auto"
          height="100%"
          display="flex"
          marginBottom="auto"
          marginTop="0"
        />
        <Box
          component="div"
          width="200px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width="100%"
            component="div"
            display="flex"
            justifyContent="center"
          >
            <Typography width="32px" textAlign="end" variant="caption">
              {speed}
            </Typography>
            <Typography width="130px" textAlign="center" variant="caption">
              {!!speed && Math.abs(speed) <= 1 ? 'day' : 'days'} per second
            </Typography>
          </Box>
          <Typography width="100%" textAlign="center" variant="caption">
            ({!speed ? 'freeze' : Math.sign(speed) < 0 ? 'reverse' : 'forward'})
          </Typography>
        </Box>
      </Box>
    )
  }
)

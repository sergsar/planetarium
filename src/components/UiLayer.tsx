import { Box, Typography } from '@mui/material'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { speedSelector } from '../contexts/timeCycleState'
import DatePicker from './DatePicker'
import Information from './Information'
import TimeSlider from './TimeSlider'

const UiLayer = () => {
  const speed = useRecoilValue(speedSelector)

  return (
    <Box
      display="flex"
      flexDirection="column"
      zIndex={9}
      sx={{ pointerEvents: 'none', '> *': { pointerEvents: 'auto' } }}
      position="absolute"
      color="white"
      height="100%"
      width="100%"
      component="div"
    >
      <Box component="div" display="flex" flexDirection="row" zIndex={99}>
        <Information margin="16px" />
        <DatePicker
          margin="16px"
          marginLeft="auto"
          marginRight="16px"
          border="1px solid"
          borderRadius="10px"
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.3)'
          }}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderTop: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.3)'
        }}
        gap="16px"
        padding="4px 16px"
        marginBottom="0"
        marginTop="auto"
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
    </Box>
  )
}

export default UiLayer

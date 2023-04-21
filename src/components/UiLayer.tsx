import { Box } from '@mui/material'
import React from 'react'

import { passPointerEvents } from '../constants/css'
import DatePicker from './DatePicker'
import Information from './Information'
import { ObjectInfoPanel } from './ObjectInfoPanel'
import { TimeSliderPanel } from './TimeSliderPanel'

const UiLayer = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      zIndex={9}
      sx={passPointerEvents}
      position="absolute"
      color="white"
      height="100%"
      width="100%"
      component="div"
    >
      <Box component="div" display="flex" flexDirection="row" zIndex={99}>
        <Information margin="16px" />
        <DatePicker margin="16px" marginLeft="auto" marginRight="16px" />
      </Box>
      <ObjectInfoPanel alignSelf="center" />
      <TimeSliderPanel marginBottom="0" marginTop="auto" />
    </Box>
  )
}

export default UiLayer

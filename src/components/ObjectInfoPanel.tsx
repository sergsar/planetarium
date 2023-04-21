import { Box, BoxProps, Typography } from '@mui/material'
import millify from 'millify'
import { forwardRef, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import celestialObjectsSelector from '../contexts/celestialObjectsSelector'
import objectNameState from '../contexts/objectNameState'

export const ObjectInfoPanel = forwardRef<typeof Box, BoxProps>(
  function ObjectInfoPanel(props, ref) {
    const objectName = useRecoilValue(objectNameState)

    const celestialObjects = useRecoilValue(celestialObjectsSelector)

    const object = useMemo(
      () => celestialObjects.data.find((item) => item.name === objectName),
      [objectName]
    )

    return (
      <Box
        {...props}
        width="230px"
        component="div"
        sx={{ pointerEvents: 'none' }}
      >
        {objectName && (
          <Box
            height="100%"
            width="100%"
            component="div"
            border="1px solid"
            borderRadius="10px"
            padding="16px"
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.3)'
            }}
          >
            <Typography textAlign="center">{objectName}</Typography>
            <Typography>Earth Mass: {millify(object?.mass || 0)}</Typography>
            <Typography>Radius: {millify(object?.radius || 0)} km</Typography>
          </Box>
        )}
      </Box>
    )
  }
)

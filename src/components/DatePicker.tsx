import { Box, BoxProps, Typography } from '@mui/material'
import {
  DateView,
  MobileDatePicker as MuiDatePicker
} from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import React, { useCallback, useMemo, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { timeSelector } from '../contexts/timeCycleState'
import useDeferredRecoilValue from '../hooks/useDeferredRecoilValue'

const DatePicker: React.FC<BoxProps> = ({ ...props }) => {
  const setTime = useSetRecoilState(timeSelector)
  const time = useDeferredRecoilValue(timeSelector)

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Dayjs | null>(dayjs())
  const [view, setView] = useState<DateView>('day')

  const date = useMemo(() => new Date(time), [time])
  const month = useMemo(
    () =>
      date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
    [date]
  )
  const day = useMemo(
    () => date.toLocaleDateString(undefined, { day: 'numeric' }),
    [date]
  )

  const onClick = useCallback(() => {
    setValue(dayjs(time))
    setOpen(true)
  }, [time])

  const onChange = useCallback(
    (value: Dayjs | null) => {
      if (view !== 'day') {
        return
      }
      if (!value) {
        return
      }
      setTime(value.valueOf())
      setValue(value)
      setOpen(false)
    },
    [setTime, view]
  )

  return (
    <Box {...props} component="div" minWidth="200px">
      {useMemo(
        () => (
          <MuiDatePicker
            value={value}
            open={open}
            views={['year', 'month', 'day']}
            sx={{
              position: 'absolute',
              visibility: 'hidden',
              '.MuiPaper-root': {
                backgroundColor: 'rgba(120, 120, 120, 0.2)'
              }
            }}
            slotProps={{ mobilePaper: { color: 'white' } }}
            onClose={() => setOpen(false)}
            onChange={(value) => onChange(value)}
            onViewChange={(view) => setView(view)}
          />
        ),
        [value, open, view]
      )}
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        onClick={() => onClick()}
        padding="16px"
        sx={{
          cursor: 'pointer'
        }}
      >
        <Box
          component="div"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          gap="8px"
        >
          <Typography variant="h6">{month}</Typography>
          <Typography textAlign="center" variant="h6" marginRight="auto">
            {day}
          </Typography>
        </Box>
        <Typography variant="subtitle2" textAlign="center">
          Pick me
        </Typography>
      </Box>
    </Box>
  )
}

export default DatePicker

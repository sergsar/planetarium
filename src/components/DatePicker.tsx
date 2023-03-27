import {Box, BoxProps, Typography} from "@mui/material";
import React, {useCallback, useMemo, useState} from "react";
import {useRecoilState} from "recoil";
import {timeSelector} from "../contexts/timeCycleState";
import { MobileDatePicker as MuiDatePicker, DateView } from "@mui/x-date-pickers"
import dayjs, {Dayjs} from "dayjs";

const DatePicker: React.FC<{} & BoxProps> = ({ ...props }) => {
    const [time, setTime] = useRecoilState(timeSelector)

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<Dayjs|null>(dayjs())
    const [view, setView] = useState<DateView>('day')

    const date = useMemo(() => new Date(time), [time])
    const month = useMemo(() => date
        .toLocaleDateString(undefined, { month: 'short', year: 'numeric'}), [date])
    const day = useMemo(() => date
        .toLocaleDateString(undefined, { day: 'numeric' }), [date])

    const onClick = useCallback(() => {
        setValue(dayjs(time))
        setOpen(true)
    }, [time])

    const onChange = useCallback((value: Dayjs | null) => {
        if (view !== 'day') {
            return;
        }
        if (!value) {
            return
        }
        setTime(value.valueOf())
        setValue(value)
        setOpen(false)
    }, [setTime, view])

    return (
        <Box
            {...props}
            component="div"
        >
            <MuiDatePicker
                value={value}
                open={open}
                views={['year', 'month', 'day']}
                sx={{ position: 'absolute', visibility: 'hidden' }}
                onClose={() => setOpen(false)}
                onChange={(value) => onChange(value)}
                onViewChange={(view) => setView(view)}
            />
            <Box
                component="div"
                display="flex"
                flexDirection="column"
                onClick={() => onClick()}
            >
                <Box
                    component="div"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Typography
                        width="40px"
                        textAlign="center"
                        variant="h6"
                    >{day}</Typography>
                    <Typography variant="h6">{month}</Typography>
                </Box>
                <Typography variant="caption" textAlign="center" >Pick me</Typography>
            </Box>
        </Box>
    )
}

export default DatePicker

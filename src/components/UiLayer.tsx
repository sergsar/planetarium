import {Box, Typography} from "@mui/material";
import React from "react";
import TimeSlider from "./TimeSlider";
import {useRecoilValue} from "recoil";
import {speedState} from "../contexts/timeCycleState";
import DatePicker from "./DatePicker";

const UiLayer = () => {

    const speed = useRecoilValue(speedState)




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
                TODO: About Dropdown
                <DatePicker
                    margin="16px"
                    marginLeft="auto"
                    marginRight="16px"
                    border="1px solid"
                    borderRadius="10px"
                    padding="16px"
                    width="200px"
                    sx={{
                        borderColor: "rgba(255, 255, 255, 0.3)"
                    }}
                />
            </Box>
            <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderTop: '1px solid',
                    borderColor: "rgba(255, 255, 255, 0.3)"
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
                    <Box width="100%" component="div" display="flex" justifyContent="center">
                        <Typography width="32px" textAlign="end" variant="caption">
                            {speed}
                        </Typography>
                        <Typography width="130px" textAlign="center" variant="caption">
                            days per second
                        </Typography>
                    </Box>
                    <Typography width="100%" textAlign="center" variant="caption">
                        ({Math.sign(speed) < 0 ? 'reverse' : 'forward'})
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default UiLayer

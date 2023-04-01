import {Box, BoxProps, ClickAwayListener, Link, Popper, Typography} from "@mui/material";
import React from "react";

const Information: React.FC<{} & BoxProps> = ({ ...props }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <Box
                {...props}
                component="div"
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding="16px"
                border="1px solid"
                borderRadius="100%"
                width="50px"
                height="50px"
                textAlign="center"
                onClick={handleClick}
                sx={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    cursor: 'pointer'
                }}
            >
                <Typography fontWeight="600" variant="h4">i</Typography>
                <Popper
                    open={open}
                    anchorEl={anchorEl}
                >
                    <Box
                        component="div"
                        sx={{
                            maxWidth: '600px',
                            margin: '16px',
                            padding: '24px',
                            border: '1px solid',
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            borderRadius: '20px',
                            '@media (max-width: 900px)': {
                                marginTop: '70px'
                            }
                        }}
                    >
                        <Typography variant="h5">
                            <br />
                            An Imaginary 3D Model Of The Solar System
                        </Typography>
                        <Typography variant="body1">
                            <br />
                            The model built using React, Three Fiber and Astronomy Engine
                            <br />
                            <br />
                            <Link href="https://github.com/cosinekitty/astronomy" target="_blank" sx={{ color: 'lightblue' }}>Astronomy Engine</Link> library used to accurately render the planets spinning and rotation around the Sun relatively to the date.
                            <br />
                            <br />
                            All equirectangular maps are downloaded from <Link href="https://www.solarsystemscope.com/textures/" target="_blank" sx={{ color: 'lightblue' }}>www.solarsystemscope.com</Link>.
                            <br />
                            <br />
                            <Link href="https://github.com/sergsar/planetarium/" target="_blank" sx={{ color: 'lightblue' }}>Source code</Link>
                        </Typography>
                        <Typography />
                    </Box>
                </Popper>
            </Box>
        </ClickAwayListener>
    )
}

export default Information

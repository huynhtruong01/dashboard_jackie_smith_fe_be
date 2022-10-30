import { Box, CircularProgress } from '@mui/material'
import { orange } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'

LoadingCircle.propTypes = {}

function LoadingCircle() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: '12px 0' }}>
            <CircularProgress
                sx={{
                    svg: {
                        color: orange[500],
                    },
                }}
            />
        </Box>
    )
}

export default LoadingCircle

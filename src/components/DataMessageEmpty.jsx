import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

DataMessageEmpty.propTypes = {}

function DataMessageEmpty({ text = '' }) {
    return (
        <Box mt="24px" width="100%">
            <Typography textAlign="center" fontSize="1.3rem" color={grey[700]}>
                {text}
            </Typography>
        </Box>
    )
}

export default DataMessageEmpty

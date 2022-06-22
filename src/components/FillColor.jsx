import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { formatColor } from '../utils/color'

FillColor.propTypes = {}

function FillColor({ color = '#fff' }) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Box
                backgroundColor={formatColor(color)}
                width="20px"
                height="20px"
                borderRadius="2px"
                border={`1px solid ${grey[500]}`}
            ></Box>
        </Box>
    )
}

export default FillColor

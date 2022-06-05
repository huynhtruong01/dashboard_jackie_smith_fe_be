import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'

Permission.propTypes = {}

function Permission({ title }) {
    return (
        <Box width="100%" p="30px">
            <Box backgroundColor="#fff" p="12px" borderRadius="8px">
                <Box
                    display="flex"
                    justifyContent="center"
                    sx={{
                        '& span': {
                            fontWeight: 700,
                            fontSize: '3rem',
                            color: grey[400],
                        },
                    }}
                >
                    <Box>
                        <Typography component="span">N</Typography>
                        <Typography component="span">O</Typography>
                        <Typography component="span">T</Typography>
                    </Box>
                    <Box ml="8px">
                        <Typography component="span">A</Typography>
                        <Typography component="span">L</Typography>
                        <Typography component="span">L</Typography>
                        <Typography component="span">O</Typography>
                        <Typography component="span">W</Typography>
                    </Box>
                </Box>
                <Typography textAlign="center" p="10px">
                    Only{' '}
                    <Typography component="span" color={`${orange[600]}`} fontWeight={500}>
                        admins
                    </Typography>{' '}
                    are allowed to access the {title}. You{' '}
                    <Typography component="span" color={`${orange[600]}`} fontWeight={500}>
                        are not admin don't allowed
                    </Typography>{' '}
                    access the {title}
                </Typography>
            </Box>
        </Box>
    )
}

export default Permission

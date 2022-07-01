import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { grey } from '@mui/material/colors'

Widget.propTypes = {}

function Widget({ data }) {
    const Icon = data.icon

    return (
        <Box
            width="100%"
            backgroundColor="#fff"
            borderRadius="8px"
            sx={{
                border: '2px solid #fff',
                transition: '.2s ease-in-out',

                '&:hover': {
                    border: `2px solid ${grey[600]}`,
                },
            }}
        >
            <Box p="14px">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: '15px',
                    }}
                >
                    <Typography
                        variant="body1"
                        component="h2"
                        textTransform="uppercase"
                        fontWeight={600}
                        color={`${grey[800]}`}
                    >
                        {data.name}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: `${data.color[50]}`,
                            borderRadius: '8px',
                            p: '8px',

                            '& svg': {
                                color: `${data.color[500]}`,
                            },
                        }}
                    >
                        <Icon />
                    </Box>
                </Box>
                <Box mb="15px">
                    <Typography variant="h2" component="h2" color={`${grey[800]}`}>
                        {data.number}
                    </Typography>
                </Box>
                <Box>
                    {data?.titleLink && (
                        <Box
                            sx={{
                                display: 'inline-block',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',

                                    '& > a': {
                                        transition: '.2s ease-in-out',
                                    },

                                    '& > a:hover': {
                                        textDecoration: 'underline',
                                        color: `${data.color[600]}`,
                                    },

                                    '& > svg': {
                                        transition: '.2s ease-in-out',
                                    },

                                    '&:hover > svg': {
                                        color: `${data.color[600]}`,
                                        transform: 'translateX(3px)',
                                    },
                                }}
                            >
                                <Link to={`/${data.link}`}>{data.titleLink}</Link>
                                <ArrowRightIcon />
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default Widget

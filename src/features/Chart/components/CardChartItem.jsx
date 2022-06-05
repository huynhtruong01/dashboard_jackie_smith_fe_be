import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { grey } from '@mui/material/colors'

CardChartItem.propTypes = {}

function CardChartItem({ cardItem }) {
    const { icon, title, color, link } = cardItem

    const Icon = icon
    return (
        <Box
            width="100%"
            borderRadius="5px"
            backgroundColor="#fff"
            border="2px solid #fff"
            sx={{
                transition: '.2s ease-in-out',
                '&:hover': {
                    border: `2px solid ${color[500]}`,
                },
            }}
        >
            <Box p="12px">
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={color[50]}
                    width="40px"
                    height="40px"
                    borderRadius="50%"
                    mb="12px"
                >
                    <Icon
                        sx={{
                            color: color[500],
                        }}
                    />
                </Box>
                <Box mb="12px">
                    <Typography component="h3" variant="h4" color={grey[700]}>
                        {title}
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                        a: {
                            display: 'inline-block',
                            color: color[200],
                            width: 'auto',
                            mr: '4px',

                            '&:hover': {
                                textDecoration: 'underline',
                                color: color[400],
                            },

                            '&:hover + svg': {
                                color: color[400],
                            },
                        },

                        svg: {
                            color: color[200],
                        },
                    }}
                >
                    <Link to={link}>Read more</Link>
                    <ArrowRightAltIcon />
                </Box>
            </Box>
        </Box>
    )
}

export default CardChartItem

import { Box, Button, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import UsersData from '../components/UsersData'

function UsersHome() {
    const { pathname } = useLocation()

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: '20px',
                }}
            >
                <Typography variant="h6" component="h2" color={`${grey[900]}`}>
                    Users
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: orange[300],

                        '& > a': {
                            color: '#fff',
                            fontWeight: 600,
                        },

                        '&:hover': {
                            backgroundColor: orange[600],
                        },
                    }}
                >
                    <Link to={`${pathname}/add`}>Add new</Link>
                </Button>
            </Box>
            <Box>
                <UsersData />
            </Box>
        </Box>
    )
}

export default UsersHome

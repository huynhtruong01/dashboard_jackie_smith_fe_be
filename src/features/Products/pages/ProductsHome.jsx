import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import { grey, orange } from '@mui/material/colors'
import { Link, useLocation } from 'react-router-dom'
import ProductsData from '../components/ProductsData'

function ProductsHome() {
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
                    Products
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
                <ProductsData />
            </Box>
        </Box>
    )
}

export default ProductsHome

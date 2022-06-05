import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CartsDetail from './pages/CartsDetail'
import CartsHome from './pages/CartsHome'

Carts.propTypes = {}

function Carts(props) {
    return (
        <Box>
            <Box p="15px">
                <Routes>
                    <Route path="" element={<CartsHome />} />
                    <Route path="/:id" element={<CartsDetail />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default Carts

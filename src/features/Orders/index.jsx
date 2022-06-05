import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OrdersDetail from './pages/OrdersDetail'
import OrdersHome from './pages/OrdersHome'

Orders.propTypes = {}

function Orders() {
    return (
        <Box width="100%">
            <Box p="15px">
                <Routes>
                    <Route path="" element={<OrdersHome />} />
                    <Route path="/:id" element={<OrdersDetail />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default Orders

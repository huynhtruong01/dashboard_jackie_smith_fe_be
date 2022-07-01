import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import OrdersSuccessHome from './pages/OrdersSuccessHome'
import OrdersSuccessDetail from './pages/OrdersSuccessDetail'

OrdersSuccess.propTypes = {}

function OrdersSuccess() {
    return (
        <Box width="100%">
            <Box p="15px">
                <Routes>
                    <Route path="" element={<OrdersSuccessHome />} />
                    <Route path="/:id" element={<OrdersSuccessDetail />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default OrdersSuccess

import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import ShippingHome from './pages/ShippingHome'

Shipping.propTypes = {}

function Shipping() {
    return (
        <Box width="100%">
            <Box p="15px">
                <Routes>
                    <Route path="" element={<ShippingHome />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default Shipping

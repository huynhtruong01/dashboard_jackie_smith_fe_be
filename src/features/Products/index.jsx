import { Box } from '@mui/material'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProductsAdd from './pages/ProductsAdd'
import ProductsHome from './pages/ProductsHome'
import ProductsUpdate from './pages/ProductsUpdate'

function Products() {
    return (
        <Box width="100%">
            <Box p="15px">
                <Routes>
                    <Route path="" element={<ProductsHome />} />
                    <Route path="add" element={<ProductsAdd />} />
                    <Route path="update/:id" element={<ProductsUpdate />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default Products

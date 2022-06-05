import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import CategoriesHome from './pages/CategoriesHome'
import CategoriesAdd from './pages/CategoriesAdd'
import CategoriesDetail from './pages/CategoriesDetail'

Categories.propTypes = {}

function Categories(props) {
    return (
        <Box width="100%">
            <Box p="15px">
                <Routes>
                    <Route path="" element={<CategoriesHome />} />
                    <Route path="/:id" element={<CategoriesDetail />} />
                    <Route path="add" element={<CategoriesAdd />} />
                    <Route path="update/:id" element={<CategoriesAdd />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default Categories

import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Carts from '../features/Carts'
import Categories from '../features/Categories'
import Chart from '../features/Chart'
import Home from '../features/Home'
import Orders from '../features/Orders'
import Products from '../features/Products'
import Users from '../features/Users'
import Permission from './Permission'
import Sidebar from './Sidebar'

Layout.propTypes = {}

function Layout() {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    ml: '250px',
                    flex: '4.5 1 0',
                }}
            >
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="products/*" element={<Products />} />
                    <Route path="categories/*" element={<Categories />} />
                    <Route path="carts/*" element={<Carts />} />
                    <Route path="orders/*" element={<Orders />} />
                    <Route path="users/*" element={<Users />} />
                    <Route path="statistics/*" element={<Chart />} />
                    <Route path="user-admin" element={<Permission title="user" />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default Layout

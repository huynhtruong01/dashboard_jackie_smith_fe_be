import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import UsersHome from './pages/UsersHome'
import { Box } from '@mui/material'
import UsersAdd from './pages/UsersAdd'
import UsersUpdate from './pages/UserUpdate'
import { useSelector } from 'react-redux'

Users.propTypes = {}

function Users() {
    const getUser = useSelector((state) => state.users.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!getUser?.user || getUser?.user?.role !== 'admin') {
            navigate('/')
        }
    }, [getUser?.user])

    return (
        <Box width="100%">
            <Box p="15px">
                <Routes>
                    <Route path="" element={<UsersHome />} />
                    <Route path="add" element={<UsersAdd />} />
                    <Route path="update/:id" element={<UsersUpdate />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default Users

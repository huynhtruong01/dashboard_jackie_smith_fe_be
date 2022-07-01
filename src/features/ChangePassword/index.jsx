import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import ChangePasswordForm from './pages/ChangePasswordForm'
import { useSelector } from 'react-redux'
import usersApi from '../../api/usersApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

ChangePassword.propTypes = {}

function ChangePassword(props) {
    const user = useSelector((state) => state.users.user?.user)
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        try {
            await usersApi.update({ ...user, password: values.newPassword })
            toast.success('Change password successfully', {
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/'), 3000)
        } catch (error) {
            console.log(error)
            toast.error('Change password failed', {
                autoClose: 2000,
                theme: 'colored',
            })
        }
    }

    return (
        <Box pt="80px">
            <Box width="450px" margin="auto" p="16px" backgroundColor="#fff" borderRadius="5px">
                <ChangePasswordForm onSubmit={handleSubmit} />
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default ChangePassword

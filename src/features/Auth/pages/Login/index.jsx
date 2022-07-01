import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import LoginForm from './components/LoginForm'
import { toast, ToastContainer } from 'react-toastify'
import authApi from '../../../../api/authApi'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../../Users/userSlice'

Login.propTypes = {}

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async (values) => {
        try {
            const user = await authApi.login(values)

            // dispatch values when login
            dispatch(login(user))

            // notification
            toast.success(user.message, {
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/'), 3000)
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
                theme: 'colored',
            })

            console.log(error.response.data.error)
        }
    }

    return (
        <Box pt="50px" width="100%">
            <Box
                width="400px"
                borderRadius="5px"
                margin="auto"
                backgroundColor="#fff"
                p="16px 16px 20px"
            >
                <LoginForm onSubmit={onSubmit} />
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default Login

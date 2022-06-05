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
            })

            setTimeout(() => navigate('/'), 3000)
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
            })

            console.log(error.response.data.error)
        }
    }

    return (
        <Box width="100%">
            <Box pt="50px" width="100%" display="flex" justifyContent="center">
                <Box width="40%" borderRadius="8px" backgroundColor="#fff" p="16px">
                    <LoginForm onSubmit={onSubmit} />
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default Login

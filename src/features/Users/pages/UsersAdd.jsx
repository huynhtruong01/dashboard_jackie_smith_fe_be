import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import usersApi from '../../../api/usersApi'
import UsersForm from '../components/UsersForm'

UsersAdd.propTypes = {}

function UsersAdd() {
    const navigate = useNavigate()
    const defaultValues = {
        fullname: '',
        email: '',
        address: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        role: '',
    }

    const onSubmit = async (values) => {
        try {
            const newValues = {
                fullname: values.fullname,
                email: values.email,
                address: values.address,
                phoneNumber: values.phoneNumber,
                password: values.password,
                role: values.role,
            }

            const { message } = await usersApi.add(newValues)
            toast.success(message, {
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/users'), 3000)
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
                theme: 'colored',
            })
        }
    }

    return (
        <Box width="100%" p="10px" display="flex" justifyContent="center">
            <Box width="450px">
                <Box p="20px" backgroundColor="#fff" borderRadius="8px">
                    <UsersForm values={defaultValues} onSubmit={onSubmit} />
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default UsersAdd

import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usersApi from '../../../api/usersApi'
import UsersForm from '../components/UsersForm'

UsersUpdate.propTypes = {}

function UsersUpdate() {
    const [defaultValues, setDefaultValues] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await usersApi.getById(params?.id)
                console.log(user)
                setDefaultValues({
                    fullname: user?.fullname,
                    email: user?.email,
                    address: user?.address,
                    phoneNumber: `0${user?.phoneNumber}`,
                    password: '',
                    confirmPassword: '',
                    role: user?.role,
                })
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getUser()
    }, [params?.id])

    const onSubmit = async (values) => {
        try {
            const newValues = {
                fullname: values.fullname,
                password: values.password,
                address: values.address,
                phoneNumber: values.phoneNumber,
            }

            const { message } = await usersApi.update({ ...newValues, _id: params?.id })
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/users'), 3000)
        } catch (error) {
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                theme: 'colored',
            })
        }
    }

    return (
        <Box width="100%" p="10px" display="flex" justifyContent="center">
            <Box width="450px">
                <Box p="20px" backgroundColor="#fff" borderRadius="8px">
                    {defaultValues && <UsersForm values={defaultValues} onSubmit={onSubmit} />}
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default UsersUpdate

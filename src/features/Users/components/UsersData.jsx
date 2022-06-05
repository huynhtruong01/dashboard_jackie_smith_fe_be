import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import usersApi from '../../../api/usersApi'
import Data from '../../../components/Data'
import 'react-toastify/dist/ReactToastify.css'

function UsersData() {
    const [userList, setUserList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getAllUser = async () => {
            const { users } = await usersApi.getAll()
            setUserList(users)
        }

        getAllUser()
    }, [])

    const dataHead = [
        'Id',
        'Full Name',
        'Email',
        'Address',
        'Phone Number',
        'Password',
        'Role',
        'Option',
    ]

    let dataBody = []
    if (Array.isArray(userList) && userList.length > 0) {
        const newUserList = userList?.map((user) => {
            const cloneUser = {
                id: user?._id,
                fullname: user?.fullname,
                email: user?.email,
                address: user?.address,
                phoneNumber: user?.phoneNumber,
                password: user?.password,
                role: user?.role,
            }

            return cloneUser
        })

        dataBody = newUserList
    }

    const handleClick = async (id) => {
        try {
            const { message } = await usersApi.remove(id)
            toast.success(message, {
                autoClose: 2000,
            })

            setTimeout(() => window.location.reload(), 3000)
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
            })
        }
    }

    return (
        <Box>
            <Data dataHead={dataHead} dataBody={dataBody} onClick={handleClick} />
            <ToastContainer />
        </Box>
    )
}

export default UsersData

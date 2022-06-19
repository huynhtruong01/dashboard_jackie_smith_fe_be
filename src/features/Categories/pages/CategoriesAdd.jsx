import { Box } from '@mui/material'
import React from 'react'
import CategoriesForm from '../components/CategoriesForm'
import categoriesApi from '../../../api/categoriesApi'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

CategoriesAdd.propTypes = {}

function CategoriesAdd() {
    const navigate = useNavigate()

    const defaultValues = {
        name: '',
    }

    const onSubmit = async (values) => {
        try {
            const { message } = await categoriesApi.add(values)

            toast.success(message, {
                autoClose: 2000,
            })
            setTimeout(() => {
                navigate('/categories')
            }, 3000)
        } catch (error) {
            toast.success(error.response.data.message, {
                autoClose: 2000,
            })
        }
    }

    return (
        <Box width="100%" p="10px" display="flex" justifyContent="center">
            <Box width="400px">
                <Box p="20px" backgroundColor="#fff" borderRadius="8px">
                    <CategoriesForm values={defaultValues} onSubmit={onSubmit} />
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default CategoriesAdd

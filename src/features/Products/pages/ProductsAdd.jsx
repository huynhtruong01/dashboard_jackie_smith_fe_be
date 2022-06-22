import { Box } from '@mui/material'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import productsApi from '../../../api/productsApi'
import ProductsForm from '../components/ProductsForm'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

ProductsAdd.propTypes = {}

function ProductsAdd() {
    const navigate = useNavigate()
    const defaultValues = {
        name: '',
        description: '',
        image: '',
        originalPrice: '',
        salePrice: '',
        promotionPercent: 0,
        category: '',
        color: '',
        style: '',
    }

    const onSubmit = async (values) => {
        try {
            const formData = new FormData()
            Object.keys(values).forEach((x) => {
                formData.append(x, values[x])
            })
            const { message } = await productsApi.addFormData(formData)
            toast.success(message, {
                autoClose: 2000,
                theme: 'colored',
            })
            setTimeout(() => navigate('/products'), 3000)
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
                theme: 'colored',
            })
            console.log(error.response.data.error)
        }
    }

    return (
        <Box width="100%" p="10px" display="flex" justifyContent="center">
            <Box width="450px">
                <Box p="20px" backgroundColor="#fff" borderRadius="8px">
                    <ProductsForm values={defaultValues} onSubmit={onSubmit} />
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default ProductsAdd

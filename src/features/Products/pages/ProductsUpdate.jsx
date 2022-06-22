import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productsApi from '../../../api/productsApi'
import ProductsForm from '../components/ProductsForm'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ProductsUpdate.propTypes = {}

function ProductsUpdate() {
    const [defaultValues, setDefaultValues] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getProduct = async () => {
            try {
                const product = await productsApi.getById(params?.id)
                console.log(product)
                setDefaultValues({
                    name: product?.name,
                    description: product.description,
                    image: product.image,
                    originalPrice: product.originalPrice,
                    salePrice: product.salePrice,
                    promotionPercent: product.promotionPercent,
                    category: product.category?.name || '',
                    color: product?.color?.name || '',
                    style: product?.style?.name || '',
                })
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getProduct()
    }, [params?.id])

    const onSubmit = async (values) => {
        try {
            const { message } = await productsApi.updateFormData({ ...values, _id: params?.id })
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/products'), 3000)
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
                    {defaultValues && <ProductsForm values={defaultValues} onSubmit={onSubmit} />}
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default ProductsUpdate

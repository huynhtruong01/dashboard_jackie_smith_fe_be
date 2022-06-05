import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import productsApi from '../../../api/productsApi'
import Data from '../../../components/Data'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

function ProductsData() {
    const [productList, setProductList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getAllProduct = async () => {
            const { products } = await productsApi.getAll({ limit: 100 })
            setProductList(products)
        }

        getAllProduct()
    }, [])

    const dataHead = [
        'Id',
        'Name',
        'Category',
        'Original Price',
        'Sale Price',
        'Promotion Percent',
        'Style',
        'Color',
        'Option',
    ]

    let dataBody = []
    if (Array.isArray(productList) && productList.length > 0) {
        const newProductList = productList?.map((product) => {
            const cloneProduct = {
                id: product?._id,
                name: product?.name,
                category: product?.category?.name ? product?.category?.name : 'null',
                originalPrice: product?.originalPrice,
                salePrice: product?.salePrice,
                promotionPercent: product?.promotionPercent,
                style: product?.style,
                color: product?.color,
            }

            return cloneProduct
        })

        dataBody = newProductList
    }

    const handleDeleteClick = async (id) => {
        console.log(id)
        try {
            const { message } = await productsApi.remove(id)
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
            <Data dataHead={dataHead} dataBody={dataBody} onClick={handleDeleteClick} />
            <ToastContainer />
        </Box>
    )
}

export default ProductsData

import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import productsApi from '../../../api/productsApi'
import Data from '../../../components/Data'
import { capitalizeCharacter } from '../../../utils/common'

function ProductsData({ productList = [] }) {
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
        console.log(productList)
        const newProductList = productList?.map((product) => {
            const cloneProduct = {
                id: product?._id,
                name: product?.name,
                category: product?.category?.name ? product?.category?.name : 'null',
                originalPrice: product?.originalPrice,
                salePrice: product?.salePrice,
                promotionPercent: product?.promotionPercent,
                style: capitalizeCharacter(product?.style?.name),
                color: product?.color?.name,
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
                theme: 'colored',
            })
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
                theme: 'colored',
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

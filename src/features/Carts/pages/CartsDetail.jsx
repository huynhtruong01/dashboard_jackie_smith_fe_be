import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import cartsApi from '../../../api/cartsApi'
import Detail from '../../../components/Detail'
import 'react-toastify/dist/ReactToastify.css'

CartsDetail.propTypes = {}

function CartsDetail() {
    const params = useParams()
    const navigate = useNavigate()
    const [cart, setCart] = useState(null)

    useEffect(() => {
        const getCart = async () => {
            try {
                const cart = await cartsApi.getById(params?.id)

                console.log(cart)
                setCart({ ...cart, id: cart._id })
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getCart()
    }, [params?.id])

    // const handleDeleteClick = async (id) => {
    //     if (!id) return

    //     try {
    //         const { message } = await cartsApi.remove(id)
    //         toast.success(message, {
    //             autoClose: 2000,
    //         })

    //         setTimeout(() => navigate('/carts'), 3000)
    //     } catch (error) {
    //         toast.error(error.response.data.message, {
    //             autoClose: 2000,
    //         })
    //     }
    // }

    return (
        <Box>
            {cart && <Detail title="Cart" data={cart} />} <ToastContainer />
        </Box>
    )
}

export default CartsDetail

import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ordersApi from '../../../api/ordersApi'
import DetailOrder from '../../../components/DetailOrder'

OrdersDetail.propTypes = {}

function OrdersDetail() {
    const params = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        const getOrder = async () => {
            try {
                const order = await ordersApi.getById(params?.id)
                setOrder({ ...order, id: order._id })
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getOrder()
    }, [params?.id])

    const handleDeleteClick = async (id) => {
        if (!id) return

        try {
            const { message } = await ordersApi.remove(id)
            toast.success(message, {
                autoClose: 2000,
            })

            setTimeout(() => navigate('/orders'), 3000)
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
            })
        }
    }

    return (
        <Box>
            {order && <DetailOrder data={order} title="Order" />} <ToastContainer />
        </Box>
    )
}

export default OrdersDetail

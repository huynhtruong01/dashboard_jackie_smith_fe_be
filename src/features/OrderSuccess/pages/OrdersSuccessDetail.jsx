import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ordersApi from '../../../api/ordersApi'
import DetailOrder from '../../../components/DetailOrder'
import { formatDate } from '../../../utils/common'

OrdersSuccessDetail.propTypes = {}

function OrdersSuccessDetail() {
    const params = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    console.log(params)

    useEffect(() => {
        const getOrder = async () => {
            try {
                const order = await ordersApi.getById(params?.id)
                const items = order.items.reduce((obj, item) => {
                    const date = formatDate(item.dayPay)
                    if (!obj[date]) {
                        obj[date] = [item]
                    } else {
                        obj[date].push(item)
                    }

                    return obj
                }, {})
                const newOrder = []
                for (const key in items) {
                    const item = {
                        datePay: key,
                        products: items[key],
                    }
                    newOrder.push(item)
                }

                setOrder({ ...order, items: newOrder, id: order._id })
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getOrder()
    }, [params?.id])

    console.log(order)

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
            {order && <DetailOrder data={order} title="Order" />}
            <ToastContainer />
        </Box>
    )
}

export default OrdersSuccessDetail

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import ordersApi from '../../../api/ordersApi'
import { grey } from '@mui/material/colors'
import CardItem from '../../../components/CardItem'

OrdersHome.propTypes = {}

function OrdersHome() {
    const [orderList, setOrderList] = useState([])

    useEffect(() => {
        const getAllOrder = async () => {
            try {
                const { orders } = await ordersApi.getAll()
                setOrderList(orders)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getAllOrder()
    }, [])

    return (
        <Box>
            <Box mb="8px">
                <Typography variant="h6" component="h2" color={`${grey[900]}`}>
                    Orders
                </Typography>
            </Box>
            <Box width="100%" display="flex" gap="14px">
                {orderList.length > 0 &&
                    orderList?.map((order, index) => (
                        <Box key={order._id} width="calc(100%/3 - 14px)">
                            <CardItem title="Order" data={order} number={index + 1} />
                        </Box>
                    ))}
            </Box>
        </Box>
    )
}

export default OrdersHome

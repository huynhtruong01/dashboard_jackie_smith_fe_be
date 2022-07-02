import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ordersApi from '../../../api/ordersApi'
import DataMessageEmpty from '../../../components/DataMessageEmpty'
import OrdersSuccessData from '../components/OrdersSuccessData'

OrdersSuccessHome.propTypes = {}

function OrdersSuccessHome() {
    const [orderList, setOrderList] = useState([])
    const isToggle = useSelector((state) => state.toggle.isToggle)

    useEffect(() => {
        const getAllOrder = async () => {
            try {
                const { orders } = await ordersApi.getAll()
                const newOrders = orders.reverse()
                setOrderList(newOrders)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getAllOrder()
    }, [isToggle])

    console.log(orderList)

    return (
        <Box>
            <Box mb="8px">
                <Typography variant="h6" component="h2" color={`${grey[900]}`}>
                    Orders Successful
                </Typography>
            </Box>
            <Box width="100%">
                {orderList.length === 0 && <DataMessageEmpty text="Orders success is empty" />}
                {orderList.length > 0 && (
                    <Box>
                        <OrdersSuccessData orderList={orderList} />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default OrdersSuccessHome

import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import ordersApi from '../../../api/ordersApi'
import ShippingData from '../components/ShippingData'
import { useSelector } from 'react-redux'
import DataMessageEmpty from '../../../components/DataMessageEmpty'

ShippingHome.propTypes = {}

function ShippingHome() {
    const [shippingList, setShippingList] = useState([])
    const isToggle = useSelector((state) => state.toggle.isToggle)

    useEffect(() => {
        const getOrdersShipping = async () => {
            try {
                const { orders } = await ordersApi.getAllShipping()
                setShippingList(orders)
            } catch (error) {
                console.log(error)
            }
        }

        getOrdersShipping()
    }, [isToggle])

    return (
        <Box>
            <Box mb="8px">
                <Typography variant="h6" component="h2" color={`${grey[900]}`}>
                    Shipping
                </Typography>
            </Box>
            <Box width="100%">
                {shippingList.length === 0 && <DataMessageEmpty text="Shipping is empty" />}
                {shippingList.length > 0 && <ShippingData shippingList={shippingList} />}
            </Box>
        </Box>
    )
}

export default ShippingHome

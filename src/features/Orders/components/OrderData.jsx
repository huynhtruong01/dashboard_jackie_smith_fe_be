import { Box } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ordersApi from '../../../api/ordersApi'
import Data from '../../../components/Data'
import { formatPrice } from '../../../utils/common'

function OrderData({ orderList = [] }) {
    const dataHead = [
        'Id',
        'Name',
        'Email',
        'Address',
        'Phone number',
        'Total product',
        'Total quantity',
        'Option',
    ]

    let dataBody = []
    if (Array.isArray(orderList) && orderList.length > 0) {
        console.log(orderList)
        const newOrderList = orderList?.map((order) => {
            const cloneOrder = {
                id: order?._id,
                name: order?.fullname,
                email: order?.email,
                address: order?.address,
                phoneNumber: order?.phoneNumber,
                totalPrice: formatPrice(order?.totalPrice),
                totalQuantity: order?.totalQuantity,
                mode: order?.mode,
                type: 'order',
            }

            return cloneOrder
        })

        dataBody = newOrderList
    }

    const handleDeleteClick = async (id) => {
        console.log(id)
        try {
            const { message } = await ordersApi.remove(id)
            toast.success(message, {
                autoClose: 2000,
                theme: 'colored',
            })
            setTimeout(() => window.location.reload(), 3000)
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

export default OrderData

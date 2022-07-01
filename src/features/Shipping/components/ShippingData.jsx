import { Box } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ordersApi from '../../../api/ordersApi'
import Data from '../../../components/Data'
import { formatPrice } from '../../../utils/common'

function ShippingData({ shippingList = [] }) {
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
    if (Array.isArray(shippingList) && shippingList.length > 0) {
        console.log(shippingList)
        const newShippingList = shippingList?.map((shipping) => {
            const cloneShipping = {
                id: shipping?._id,
                name: shipping?.fullname,
                email: shipping?.email,
                address: shipping?.address,
                phoneNumber: shipping?.phoneNumber,
                totalPrice: formatPrice(shipping?.totalPrice),
                totalQuantity: shipping?.totalQuantity,
                isCheckout: shipping?.isCheckout,
                mode: shipping?.mode,
                type: 'shipping',
            }

            return cloneShipping
        })

        dataBody = newShippingList
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

    const handleChange = () => {
        setToggle((prev) => !prev)
    }

    return (
        <Box>
            <Data dataHead={dataHead} dataBody={dataBody} onClick={handleDeleteClick} />
            <ToastContainer />
        </Box>
    )
}

export default ShippingData

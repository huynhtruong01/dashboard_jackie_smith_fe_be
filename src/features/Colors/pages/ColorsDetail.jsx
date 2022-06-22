import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import colorsApi from '../../../api/colorsApi'
import productsApi from '../../../api/productsApi'
import Detail from '../../../components/Detail'

ColorsDetail.propTypes = {}

function ColorsDetail() {
    const params = useParams()
    const navigate = useNavigate()
    const [color, setColor] = useState(null)

    useEffect(() => {
        const getColor = async () => {
            try {
                const color = await colorsApi.getById(params?.id)
                const { products } = await productsApi.getAll({ color: color._id })

                setColor({ ...color, id: color._id, products })
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getColor()
    }, [params?.id])

    const handleDeleteClick = async (id) => {
        if (!id) return

        try {
            const { message } = await colorsApi.remove(id)
            toast.success(message, {
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/colors'), 3000)
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
                theme: 'colored',
            })
        }
    }

    return (
        <Box>
            {color && <Detail title="Color" data={color} onClick={handleDeleteClick} />}{' '}
            <ToastContainer />
        </Box>
    )
}

export default ColorsDetail

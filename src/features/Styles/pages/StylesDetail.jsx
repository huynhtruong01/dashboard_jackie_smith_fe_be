import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import productsApi from '../../../api/productsApi'
import stylesApi from '../../../api/stylesApi'
import Detail from '../../../components/Detail'

StylesDetail.propTypes = {}

function StylesDetail() {
    const params = useParams()
    const navigate = useNavigate()
    const [style, setStyle] = useState(null)

    useEffect(() => {
        const getStyle = async () => {
            try {
                const style = await stylesApi.getById(params?.id)
                const { products } = await productsApi.getAll({ style: style._id })

                setStyle({ ...style, id: style._id, products })
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getStyle()
    }, [params?.id])

    const handleDeleteClick = async (id) => {
        if (!id) return

        try {
            const { message } = await stylesApi.remove(id)
            toast.success(message, {
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/styles'), 3000)
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
                theme: 'colored',
            })
        }
    }

    return (
        <Box>
            {style && <Detail title="Style" data={style} onClick={handleDeleteClick} />}{' '}
            <ToastContainer />
        </Box>
    )
}

export default StylesDetail

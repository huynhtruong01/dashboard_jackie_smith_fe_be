import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import stylesApi from '../../../api/stylesApi'
import StylesForm from '../components/StylesForm'

StylesUpdate.propTypes = {}

function StylesUpdate() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [style, setStyle] = useState({})

    useEffect(() => {
        const getStyle = async () => {
            try {
                const style = await stylesApi.getById(id)
                console.log(style)
                setStyle(style)
            } catch (error) {
                console.log(error)
            }
        }

        getStyle()
    }, [id])

    const onSubmit = async (values) => {
        try {
            const { message } = await stylesApi.update({ ...values, _id: id })

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
            console.log(error)
        }
    }

    return (
        <Box width="100%" p="10px" display="flex" justifyContent="center">
            <Box width="400px">
                <Box p="20px" backgroundColor="#fff" borderRadius="8px">
                    {Object.keys(style).length > 0 && (
                        <StylesForm values={style} onSubmit={onSubmit} />
                    )}
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default StylesUpdate

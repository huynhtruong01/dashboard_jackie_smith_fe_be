import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import colorsApi from '../../../api/colorsApi'
import ColorsForm from '../components/ColorsForm'

ColorsAdd.propTypes = {}

function ColorsAdd() {
    const navigate = useNavigate()

    const defaultValues = {
        name: '',
    }

    const onSubmit = async (values) => {
        try {
            const { message } = await colorsApi.add(values)

            toast.success(message, {
                autoClose: 2000,
                theme: 'colored',
            })
            setTimeout(() => {
                navigate('/colors')
            }, 3000)
        } catch (error) {
            toast.success(error.response.data.message, {
                autoClose: 2000,
                theme: 'colored',
            })
        }
    }

    return (
        <Box width="100%" p="10px" display="flex" justifyContent="center">
            <Box width="400px">
                <Box p="20px" backgroundColor="#fff" borderRadius="8px">
                    <ColorsForm values={defaultValues} onSubmit={onSubmit} />
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default ColorsAdd

import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import stylesApi from '../../../api/stylesApi'
import StylesForm from '../components/StylesForm'

StylesAdd.propTypes = {}

function StylesAdd() {
    const navigate = useNavigate()

    const defaultValues = {
        name: '',
        category: '',
    }

    const onSubmit = async (values) => {
        try {
            const { message } = await stylesApi.add(values)
            console.log(values)

            toast.success(message, {
                autoClose: 2000,
                theme: 'colored',
            })
            setTimeout(() => {
                navigate('/styles')
            }, 3000)
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
                theme: 'colored',
            })
        }
    }

    return (
        <Box width="100%" p="10px" display="flex" justifyContent="center">
            <Box width="400px">
                <Box p="20px" backgroundColor="#fff" borderRadius="8px">
                    <StylesForm values={defaultValues} onSubmit={onSubmit} />
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default StylesAdd

import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import ColorsAdd from './pages/ColorsAdd'
import ColorsDetail from './pages/ColorsDetail'
import ColorsHome from './pages/ColorsHome'
import ColorsUpdate from './pages/ColorsUpdate'

Colors.propTypes = {}

function Colors() {
    return (
        <Box width="100%">
            <Box p="15px">
                <Routes>
                    <Route path="" element={<ColorsHome />} />
                    <Route path="/:id" element={<ColorsDetail />} />
                    <Route path="add" element={<ColorsAdd />} />
                    <Route path="update/:id" element={<ColorsUpdate />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default Colors

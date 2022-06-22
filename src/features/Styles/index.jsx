import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import StylesAdd from './pages/StylesAdd'
import StylesDetail from './pages/StylesDetail'
import StylesHome from './pages/StylesHome'
import StylesUpdate from './pages/StylesUpdate'

Styles.propTypes = {}

function Styles() {
    return (
        <Box width="100%">
            <Box p="15px">
                <Routes>
                    <Route path="" element={<StylesHome />} />
                    <Route path="/:id" element={<StylesDetail />} />
                    <Route path="add" element={<StylesAdd />} />
                    <Route path="update/:id" element={<StylesUpdate />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default Styles

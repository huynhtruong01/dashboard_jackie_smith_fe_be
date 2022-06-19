import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Layout from './components/Layout'
import Login from './features/Auth/pages/Login'
import ChangePassword from './features/ChangePassword'
import InfoAccount from './features/InfoAccount'

function App() {
    return (
        <Box>
            <Header />
            <Box pt="64px" backgroundColor={`${grey[100]}`} minHeight="100vh">
                <Routes>
                    <Route path="*" element={<Layout />} />
                    <Route path="login" element={<Login />} />
                    <Route path="information-account" element={<InfoAccount />} />
                    <Route path="change-password" element={<ChangePassword />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default App

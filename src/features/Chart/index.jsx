import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SsidChartIcon from '@mui/icons-material/SsidChart'
import TerrainIcon from '@mui/icons-material/Terrain'
import { Box } from '@mui/material'
import { amber, indigo, red } from '@mui/material/colors'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ChartList from './components/ChartList'
import ChartMonth from './pages/ChartMonth'
import ChartQuarter from './pages/ChartQuarter'
import ChartYear from './pages/ChartYear'

Chart.propTypes = {}

const chartList = [
    {
        icon: CalendarMonthIcon,
        title: 'Chart month',
        color: red,
        link: 'month',
    },
    {
        icon: SsidChartIcon,
        title: 'Chart quarter',
        color: indigo,
        link: 'quarter',
    },
    {
        icon: TerrainIcon,
        title: 'Chart year',
        color: amber,
        link: 'year',
    },
]

function Chart() {
    return (
        <Box width="100%">
            <Box p="15px">
                <Routes>
                    <Route path="" element={<ChartList chartList={chartList} />} />
                    <Route path="month" element={<ChartMonth />} />
                    <Route path="quarter" element={<ChartQuarter />} />
                    <Route path="year" element={<ChartYear />} />
                </Routes>
            </Box>
        </Box>
    )
}

export default Chart

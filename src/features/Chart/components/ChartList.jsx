import { Box } from '@mui/material'
import React from 'react'
import CardChartItem from './CardChartItem'

ChartList.propTypes = {}

function ChartList({ chartList }) {
    return (
        <Box width="100%" display="flex" gap="12px">
            {chartList?.map((chart) => (
                <Box key={chart.link} width="calc(100%/3 - 12px)">
                    <CardChartItem cardItem={chart} />
                </Box>
            ))}
        </Box>
    )
}

export default ChartList

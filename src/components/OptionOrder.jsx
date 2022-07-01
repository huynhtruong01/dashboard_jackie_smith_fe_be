import { Box } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { capitalizeCharacter } from '../utils/common'

OptionOrder.propTypes = {}

function OptionOrder({ data, onClick = null }) {
    const [approves, setApproves] = useState(capitalizeCharacter(data.mode))

    const handleApprovesClick = async () => {
        if (data.mode === 'Approved' || approves === 'Approved' || !onClick) return

        try {
            await onClick(data.id, 'approved')
            setApproves('Approved')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: approves === 'Approves' ? red[50] : green[50],
                    borderRadius: '3px',
                    p: '5px',
                    mr: '5px',
                    cursor: 'pointer',
                    color: approves === 'Approves' ? red[500] : green[500],

                    '&:hover': {
                        backgroundColor: approves === 'Approves' ? red[100] : green[50],
                        cursor: approves === 'Approves' ? 'pointer' : 'text',
                    },
                }}
                onClick={handleApprovesClick}
            >
                {approves}
            </Box>
        </Box>
    )
}

export default OptionOrder

import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { Box } from '@mui/material'
import { green, red } from '@mui/material/colors'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

OptionUpdateDelete.propTypes = {}

function OptionUpdateDelete({ data, setOpen, setName, setId }) {
    const { pathname } = useLocation()

    const handleOpen = () => {
        setOpen(true)
        setName(data?.name || data?.username)
        setId(data.id)
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
                    backgroundColor: green[50],
                    borderRadius: '3px',
                    p: '5px',
                    mr: '5px',
                    cursor: 'pointer',

                    '& svg': {
                        color: green[600],
                    },
                }}
            >
                <Link to={`${pathname}/update/${data.id}`}>
                    <ModeEditIcon />
                </Link>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: red[50],
                    borderRadius: '3px',
                    p: '5px',
                    cursor: 'pointer',

                    '& > svg': {
                        color: red[600],
                    },
                }}
                onClick={handleOpen}
            >
                <DeleteIcon />
            </Box>
        </Box>
    )
}

export default OptionUpdateDelete

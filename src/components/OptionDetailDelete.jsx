import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Box } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { Link, useLocation } from 'react-router-dom'

OptionDetailDelete.propTypes = {}

function OptionDetailDelete({ data, setOpen, setName, setId }) {
    const { pathname } = useLocation()

    const handleOpen = () => {
        setOpen(true)
        setName(data?.name)
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
                    backgroundColor: red[50],
                    borderRadius: '3px',
                    p: '5px',
                    cursor: 'pointer',
                    mr: '5px',

                    '& > svg': {
                        color: red[500],
                    },

                    '&:hover': {
                        backgroundColor: red[100],
                    },
                }}
                onClick={handleOpen}
            >
                <DeleteIcon />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: green[50],
                    borderRadius: '3px',
                    p: '5px',
                    cursor: 'pointer',

                    '& > svg': {
                        color: green[500],
                    },

                    '&:hover': {
                        backgroundColor: green[100],
                    },
                }}
            >
                <Link to={`${pathname}/${data.id}`}>
                    <MoreHorizIcon />
                </Link>
            </Box>
        </Box>
    )
}

export default OptionDetailDelete

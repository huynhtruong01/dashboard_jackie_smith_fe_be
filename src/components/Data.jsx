import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    Button,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { formatPrice, hashPassword, truncate } from '../utils/common'
import OptionUpdateDelete from './OptionUpdateDelete'
import DeleteIcon from '@mui/icons-material/Delete'
import ClearIcon from '@mui/icons-material/Clear'
import { grey, red } from '@mui/material/colors'
import { formatColor } from '../utils/color'
import FillColor from './FillColor'

function Data({ dataHead, dataBody, onClick = null }) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [id, setId] = useState(null)

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = async () => {
        if (!id || !onClick) return

        try {
            await onClick(id)
            setOpen(false)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {dataHead?.map((data) => (
                                <TableCell align="center" key={data}>
                                    {data}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataBody?.map((data) => {
                            const cloneData = { ...data, id: truncate(data.id, 7) }
                            if (cloneData?.password) {
                                const strPass = hashPassword(8)
                                cloneData.password = strPass
                            }

                            if (cloneData?.salePrice || cloneData?.OriginalPrice) {
                                cloneData.salePrice = formatPrice(cloneData.salePrice)
                                cloneData.originalPrice = formatPrice(cloneData.originalPrice)
                            }

                            if (cloneData?.phoneNumber) {
                                cloneData.phoneNumber = `${cloneData.phoneNumber
                                    .toString()
                                    .slice(0, 3)}${hashPassword(6)}`
                            }

                            const dataArr = Object.values(cloneData)

                            return (
                                <TableRow
                                    key={data.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {dataArr.map((x, index) => (
                                        <TableCell align="center" key={index} sx={{}}>
                                            {data['color'] !== x ? x : <FillColor color={x} />}
                                        </TableCell>
                                    ))}
                                    <TableCell align="center">
                                        <OptionUpdateDelete
                                            data={data}
                                            setName={setName}
                                            setOpen={setOpen}
                                            setId={setId}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* show modal delete */}
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#fff',
                        p: '12px 12px 16px',
                        borderRadius: '8px',
                    }}
                >
                    <Box mb="20px">
                        <Box display="flex" alignItems="center" mb="16px">
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                width="30px"
                                height="30px"
                                borderRadius="5px"
                                backgroundColor={`${red[100]}`}
                                mr="5px"
                                sx={{
                                    '& > svg': {
                                        color: red[700],
                                    },
                                }}
                            >
                                <ClearIcon />
                            </Box>
                            Delete
                        </Box>
                        <Typography variant="body1" textAlign="center" fontSize="1.2rem">
                            Are you sure delete{' '}
                            <Box
                                component="span"
                                sx={{
                                    color: '#f00',
                                    fontWeight: 600,
                                }}
                            >
                                {name}
                            </Box>
                            ?
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            sx={{
                                mr: '12px',
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            startIcon={<DeleteIcon />}
                            variant="contained"
                            color="error"
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default Data

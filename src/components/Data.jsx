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
import OptionOrder from './OptionOrder'
import ordersApi from '../api/ordersApi'
import OptionShipping from './OptionShipping'
import { useDispatch, useSelector } from 'react-redux'
import { changeToggle } from '../redux/toggleSlice'
import OptionDetailDelete from './OptionDetailDelete'

function Data({ dataHead, dataBody, onClick = null }) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [id, setId] = useState(null)
    const dispatch = useDispatch()
    const isToggle = useSelector((state) => state.toggle.isToggle)

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = async () => {
        if (!id || !onClick) return

        try {
            setOpen(false)
            await onClick(id)
            dispatch(changeToggle(!isToggle))
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    const handleApprovedClick = async (id, value) => {
        try {
            await ordersApi.updateApproved({ _id: id, mode: value })
        } catch (error) {
            console.log(error)
        }
    }

    const handleShippingClick = async (id, value) => {
        try {
            await ordersApi.updateShipping({ _id: id, isCheckout: value })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSuccessfulDeliveryClick = async (id, value) => {
        try {
            await ordersApi.updateSuccessfulDelivery({ _id: id, mode: value })
            dispatch(changeToggle(!isToggle))
        } catch (error) {
            console.log(error)
        }
    }

    console.log(dataBody)

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
                            const { mode, isCheckout, type, ...restData } = data
                            const cloneData = { ...restData }
                            if (cloneData?.password) {
                                const strPass = hashPassword(8)
                                cloneData.password = strPass
                            }

                            if (cloneData?.salePrice || cloneData?.OriginalPrice) {
                                cloneData.salePrice = formatPrice(cloneData.salePrice)
                                cloneData.originalPrice = formatPrice(cloneData.originalPrice)
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
                                        {data.type === 'order' && (
                                            <OptionOrder
                                                data={data}
                                                onClick={handleApprovedClick}
                                            />
                                        )}
                                        {data?.type === 'shipping' && (
                                            <OptionShipping
                                                data={data}
                                                onShippingClick={handleShippingClick}
                                                onSuccessfulDeliveryClick={
                                                    handleSuccessfulDeliveryClick
                                                }
                                            />
                                        )}
                                        {!data.totalQuantity && (
                                            <OptionUpdateDelete
                                                data={data}
                                                setName={setName}
                                                setOpen={setOpen}
                                                setId={setId}
                                            />
                                        )}
                                        {data.type === 'order successful' && (
                                            <OptionDetailDelete
                                                data={data}
                                                setName={setName}
                                                setOpen={setOpen}
                                                setId={setId}
                                            />
                                        )}
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

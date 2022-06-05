import React from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Typography,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material'
import { orange, grey } from '@mui/material/colors'
import {
    formatDate,
    formatPrice,
    capitalizeCharacter,
    calculatorPrice,
    calculatorQuantity,
} from '../utils/common'

DetailOrder.propTypes = {}

function DetailOrderItem({ item }) {
    return (
        <>
            <TableCell align="center">
                <Box>
                    <img src={item.product.image} alt={item.product.name} />
                </Box>
            </TableCell>
            <TableCell
                align="left"
                sx={{
                    fontSize: '1.1rem',
                }}
            >
                {item.product.name}
            </TableCell>
            <TableCell align="center">
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Box
                        sx={{
                            fontSize: '1.3rem',
                            fontWeight: 600,
                            mr: '16px',
                        }}
                    >
                        {formatPrice(item.product.salePrice)}
                    </Box>
                    {item.product.promotionPercent > 0 && (
                        <>
                            <Box
                                sx={{
                                    ml: '5px',
                                    color: grey[500],
                                    textDecoration: 'line-through',
                                    mr: '16px',
                                }}
                            >
                                {formatPrice(item.product.originalPrice)}
                            </Box>
                            <Box
                                sx={{
                                    ml: '5px',
                                    color: orange[600],
                                    fontWeight: 600,
                                }}
                            >
                                -{item.product.promotionPercent}%
                            </Box>
                        </>
                    )}
                </Box>
            </TableCell>
            <TableCell
                align="center"
                sx={{
                    color: orange[400],
                    fontSize: '1.1rem',
                    fontWeight: 500,
                }}
            >
                {item.quantity}
            </TableCell>
            <TableCell align="center">{capitalizeCharacter(item?.product.color)}</TableCell>
            <TableCell align="center">{capitalizeCharacter(item?.product.style)}</TableCell>
        </>
    )
}

function DetailOrderItems({ items, number }) {
    return (
        <Box mb="40px">
            <Box mb="8px">
                <Typography
                    variant="h6"
                    component="h2"
                    display="inline-block"
                    color={grey[700]}
                    backgroundColor="#fff"
                    borderRadius="5px"
                    p="8px"
                    fontWeight={600}
                >
                    Invoice{' '}
                    <Typography
                        component="span"
                        color={orange[500]}
                        fontSize="1.3rem"
                        fontWeight={600}
                    >
                        {number}
                    </Typography>
                </Typography>
            </Box>
            <Box mb="16px">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell size="small" align="center" width="100px">
                                    Image
                                </TableCell>
                                <TableCell align="left" width="250px">
                                    Name
                                </TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Color</TableCell>
                                <TableCell align="center">Style</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item._id}>
                                    <DetailOrderItem item={item} />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Box
                    display="inline-block"
                    backgroundColor="#fff"
                    borderRadius="5px"
                    p="12px"
                    width="23%"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        p="12px 0"
                        borderBottom={`1px solid ${grey[300]}`}
                    >
                        <Typography component="span">Total quantity</Typography>
                        <Typography component="span">{calculatorQuantity(items)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" p="12px 0">
                        <Typography component="span">Total price</Typography>
                        <Typography component="span">{calculatorPrice(items)}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function DetailOrder({ data, title = '' }) {
    return (
        <Box>
            <Box>
                <Box mb="32px" display="flex" gap="16px">
                    <Box flex={1}>
                        <Typography fontWeight={700} fontSize="2.2rem" color={`${grey[700]}`}>
                            {title}
                        </Typography>
                        <Typography color={grey[400]} fontSize="0.95rem">
                            {formatDate(data?.updatedAt)}
                        </Typography>
                    </Box>

                    <Box m="0 0 16px" flex={1}>
                        <Box
                            display="inline-block"
                            borderRadius="5px"
                            p="12px"
                            backgroundColor="#fff"
                            width="100%"
                        >
                            <Box mb="12px">
                                <Typography component="p" color={grey[500]} fontSize="0.8rem">
                                    Name
                                </Typography>
                                <Typography component="p" fontSize="1.1rem" fontWeight={500}>
                                    {data?.userId?.fullname}
                                </Typography>
                            </Box>
                            <Box mb="12px">
                                <Typography component="p" color={grey[500]} fontSize="0.8rem">
                                    Address
                                </Typography>
                                <Typography component="p" fontSize="1.1rem" fontWeight={500}>
                                    {data?.userId?.address}
                                </Typography>
                            </Box>
                            <Box mb="12px">
                                <Typography component="p" color={grey[500]} fontSize="0.8rem">
                                    Phone number
                                </Typography>
                                <Typography component="p" fontSize="1.1rem" fontWeight={500}>
                                    0{data?.userId?.phoneNumber}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box flex={1}>
                        <Box
                            display="inline-block"
                            p="12px"
                            backgroundColor="#fff"
                            borderRadius="5px"
                            width="100%"
                        >
                            <Box mb="12px">
                                <Typography component="p" color={grey[500]} fontSize="0.8rem">
                                    Total price
                                </Typography>
                                <Typography
                                    component="p"
                                    fontSize="1.7rem"
                                    color={orange[500]}
                                    fontWeight={600}
                                >
                                    {formatPrice(data?.totalPrice)}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography component="p" color={grey[500]} fontSize="0.8rem">
                                    Total quantity
                                </Typography>
                                <Typography
                                    component="p"
                                    fontSize="1.7rem"
                                    color={orange[500]}
                                    fontWeight={600}
                                >
                                    {data?.totalQuantity}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box>
                    {data?.items?.map((item, index) => (
                        <Box>
                            <DetailOrderItems items={item} number={index + 1} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default DetailOrder

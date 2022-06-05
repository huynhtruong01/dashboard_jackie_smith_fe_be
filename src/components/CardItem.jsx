import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import { formatDate, formatPrice, truncate } from '../utils/common'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { grey, orange } from '@mui/material/colors'
import { Link, useLocation } from 'react-router-dom'

CardItem.propTypes = {}

function CardProduct({ product }) {
    return (
        <Box width="100%" borderBottom={`1px solid ${grey[400]}`} p="12px 0">
            <Box display="flex">
                <Box width="35%" mr="10px">
                    <img src={product?.image} alt={product?.name} />
                </Box>
                <Box>
                    <Typography
                        variant="body2"
                        component="p"
                        mb="4px"
                        sx={{
                            fontWeight: '600',
                        }}
                    >
                        {product?.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        mb="4px"
                        sx={{
                            color: grey[500],
                        }}
                    >
                        {truncate(product?.description, 10)}
                    </Typography>
                    <Box>
                        <Typography
                            variant="body2"
                            component="p"
                            mb="4px"
                            sx={{
                                fontWeight: '600',
                            }}
                        >
                            {formatPrice(product?.salePrice)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function CardProductItems({ item }) {
    const { product, quantity } = item
    return (
        <Box width="100%" borderBottom={`1px solid ${grey[400]}`} p="12px 0">
            <Box display="flex">
                <Box width="35%" mr="10px">
                    <img src={product?.image} alt={product?.name} />
                </Box>
                <Box flex={1}>
                    <Typography
                        variant="body2"
                        component="p"
                        mb="4px"
                        sx={{
                            fontWeight: '600',
                        }}
                    >
                        {product?.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        mb="4px"
                        sx={{
                            color: grey[500],
                        }}
                    >
                        {truncate(product?.description, 10)}
                    </Typography>
                    <Box display="flex" justifyContent="space-between">
                        <Typography
                            variant="body2"
                            component="p"
                            mb="4px"
                            sx={{
                                fontWeight: '600',
                            }}
                        >
                            {formatPrice(product?.salePrice)}
                        </Typography>
                        {quantity > 0 && (
                            <Typography
                                variant="body2"
                                component="p"
                                mb="4px"
                                sx={{
                                    fontWeight: '600',
                                }}
                            >
                                {`Quantity: ${quantity}`}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function CardProductOrder({ items }) {
    return (
        <Box>
            <Box>
                {items?.map((item) => (
                    <Box key={item._id}>
                        <CardProductItems item={item} />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

function CardItem({ title, data, number }) {
    const { pathname } = useLocation()

    console.log(data)

    return (
        <Box width="100%" backgroundColor="#fff" borderRadius="8px">
            <Box width="100%" p="12px 12px 16px">
                <Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb="20px"
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexFlow: 'column nowrap',
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 500,
                                    mb: '2px',
                                }}
                            >{`${title} #${truncate(data._id, 4)}`}</Typography>
                            {data?.name && (
                                <Typography
                                    variant="body2"
                                    color={`${grey[500]}`}
                                >{`${data.name}`}</Typography>
                            )}

                            {data?.userId?.fullname && (
                                <Typography variant="body2" color={`${grey[500]}`}>
                                    {formatDate(data?.updatedAt)}
                                </Typography>
                            )}
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                backgroundColor: orange[50],
                                color: orange[600],
                                fontWeight: 600,
                            }}
                        >
                            {number}
                        </Box>
                    </Box>

                    {data?.userId?.fullname && (
                        <Box
                            m="16px 0"
                            p="8px"
                            border={`1px solid ${grey[300]}`}
                            borderRadius="5px"
                        >
                            <Box display="flex" p="4px 0">
                                <Typography
                                    component="span"
                                    fontSize="0.9rem"
                                    color={orange[500]}
                                    width="130px"
                                    mr="16px"
                                >
                                    Name
                                </Typography>
                                <Typography component="span" fontSize="0.9rem">
                                    {data?.userId?.fullname}
                                </Typography>
                            </Box>
                            <Box display="flex" p="4px 0">
                                <Typography
                                    component="span"
                                    fontSize="0.9rem"
                                    color={orange[500]}
                                    width="130px"
                                    mr="16px"
                                >
                                    Address
                                </Typography>
                                <Typography component="span" fontSize="0.9rem">
                                    {data?.userId?.address}
                                </Typography>
                            </Box>
                            <Box display="flex" p="4px 0">
                                <Typography
                                    component="span"
                                    fontSize="0.9rem"
                                    color={orange[500]}
                                    width="130px"
                                    mr="16px"
                                >
                                    Phone number
                                </Typography>
                                <Typography component="span" fontSize="0.9rem">
                                    0{data?.userId?.phoneNumber}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box mb="20px">
                        {data?.products?.slice(0, 2).map((product) => (
                            <CardProduct product={product} />
                        ))}

                        {!data?.userId?.fullname &&
                            data?.items
                                ?.slice(0, 2)
                                .map((item) => <CardProductItems item={item} />)}

                        {data?.userId?.fullname && <CardProductOrder items={data?.items[0]} />}
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Button
                            endIcon={<ArrowForwardIcon />}
                            variant="contained"
                            sx={{
                                backgroundColor: orange[300],
                                '& > a': {
                                    color: '#fff',
                                },

                                '&:hover': {
                                    backgroundColor: orange[600],
                                },
                            }}
                        >
                            <Link to={`${pathname}/${data._id}`}>Learn more</Link>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CardItem

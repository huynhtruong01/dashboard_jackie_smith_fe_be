import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import React from 'react'
import { capitalizeCharacter, formatPrice } from '../utils/common'
import DeleteIcon from '@mui/icons-material/Delete'

Detail.propTypes = {}

function DetailProduct({ product }) {
    return (
        <>
            <TableCell align="center">
                <Box
                    width="100px"
                    sx={{
                        '& > img': {
                            borderRadius: '3px',
                        },
                    }}
                >
                    <img src={product.image} alt={product.name} />
                </Box>
            </TableCell>
            <TableCell
                align="left"
                sx={{
                    fontSize: '1.1rem',
                }}
            >
                {product.name}
            </TableCell>
            <TableCell align="center">
                <Box display="flex" justifyContent="center">
                    <Box
                        sx={{
                            fontSize: '1.15rem',
                            fontWeight: 600,
                            color: grey[800],
                        }}
                    >
                        {formatPrice(product.salePrice)}
                    </Box>
                    {product.promotionPercent > 0 && (
                        <>
                            <Box
                                sx={{
                                    ml: '5px',
                                    color: grey[500],
                                    textDecoration: 'line-through',
                                }}
                            >
                                {formatPrice(product.originalPrice)}
                            </Box>
                            <Box
                                sx={{
                                    ml: '5px',
                                    color: orange[600],
                                    fontWeight: 600,
                                }}
                            >
                                -{product.promotionPercent}%
                            </Box>
                        </>
                    )}
                </Box>
            </TableCell>
            <TableCell
                align="center"
                sx={{
                    fontWeight: 500,
                }}
            >
                {capitalizeCharacter(product?.color)}
            </TableCell>
            <TableCell
                align="center"
                sx={{
                    fontWeight: 500,
                }}
            >
                {capitalizeCharacter(product?.style)}
            </TableCell>
        </>
    )
}

function DetailItems({ item }) {
    return (
        <>
            <TableCell>
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
            <TableCell
                align="center"
                sx={{
                    fontWeight: 500,
                }}
            >
                {capitalizeCharacter(item.product.color)}
            </TableCell>
            <TableCell
                align="center"
                sx={{
                    fontWeight: 500,
                }}
            >
                {capitalizeCharacter(item.product.style)}
            </TableCell>
        </>
    )
}

function Detail({ title = '', data, onClick = null }) {
    const handleDeleteClick = async () => {
        if (!data?.id || !onClick) return

        try {
            await onClick(data?.id)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    console.log(data)

    return (
        <Box>
            <Box>
                <Box mb="20px" display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography fontWeight={700} fontSize="1.6rem" color={`${grey[700]}`}>
                            {title}
                        </Typography>
                        <Typography fontWeight={500} fontSize="0.9rem" color={`${grey[500]}`}>
                            {data?.products && data.products.length}{' '}
                            {data?.items && data.items.length} products
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: orange[300],
                                '&:hover': {
                                    backgroundColor: orange[600],
                                },
                            }}
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteClick}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
                <Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell size="small" align="center" width="100px">
                                        Image
                                    </TableCell>
                                    <TableCell align="left" width="150px">
                                        Name
                                    </TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    {data?.items && <TableCell align="center">Quantity</TableCell>}
                                    <TableCell align="center">Color</TableCell>
                                    <TableCell align="center">Style</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.name &&
                                    data.products?.map((product) => (
                                        <TableRow key={product.name}>
                                            <DetailProduct product={product} />
                                        </TableRow>
                                    ))}

                                {!data?.name &&
                                    data?.items?.map((item) => (
                                        <TableRow key={item.product.name}>
                                            <DetailItems item={item} />
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    )
}

export default Detail

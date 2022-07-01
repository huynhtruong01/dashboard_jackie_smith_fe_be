import { Box, Typography, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { grey, orange } from '@mui/material/colors'
import { Link, useLocation } from 'react-router-dom'
import ProductsData from '../components/ProductsData'
import Search from '../../../components/Filters/Search'
import productsApi from '../../../api/productsApi'
import PaginationData from '../../../components/PaginationData'
import { useSelector } from 'react-redux'

function ProductsHome() {
    const { pathname } = useLocation()
    const [filters, setFilters] = useState({ limit: 9, page: 1 })
    const [productList, setProductList] = useState([])
    const [pagination, setPagination] = useState(0)
    const [loading, setLoading] = useState(false)
    const isToggle = useSelector((state) => state.toggle.isToggle)

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            try {
                const { products, totalCount } = await productsApi.getAll(filters)
                let counts = null
                if (filters.search) {
                    const productList = await productsApi.getAll(filters)
                    counts = productList.products.length
                }

                if (counts) {
                    setPagination(counts)
                } else {
                    setPagination(totalCount)
                }
                setProductList(products)
            } catch (error) {
                console.log('Error: ', error)
            }

            setLoading(false)
        }

        getProducts()
    }, [filters, isToggle])

    console.log(filters)

    const handleSearch = (value) => {
        setFilters((prev) => ({ ...prev, search: value, page: 1 }))
    }

    const handlePaginationChange = (page) => {
        setFilters((prev) => ({ ...prev, page }))
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: '20px',
                }}
            >
                <Typography variant="h6" component="h2" color={`${grey[900]}`}>
                    Products
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: orange[300],

                        '& > a': {
                            color: '#fff',
                            fontWeight: 600,
                        },

                        '&:hover': {
                            backgroundColor: orange[600],
                        },
                    }}
                >
                    <Link to={`${pathname}/add`}>Add new</Link>
                </Button>
            </Box>

            <Box>
                <Box width="320px" mb="12px">
                    <Search onSubmit={handleSearch} />
                </Box>
                {productList.length > 0 && (
                    <>
                        {loading && (
                            <Box
                                display="flex"
                                width="100%"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    svg: {
                                        color: orange[500],
                                    },
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        )}
                        {!loading && (
                            <>
                                <Box mb="16px">
                                    <ProductsData productList={productList} />
                                </Box>
                                {pagination > 0 && (
                                    <Box display="flex" justifyContent="flex-end" pr="32px">
                                        <PaginationData
                                            filters={filters}
                                            totalCount={pagination}
                                            onChange={handlePaginationChange}
                                        />
                                    </Box>
                                )}
                            </>
                        )}
                    </>
                )}
                {productList.length === 0 && (
                    <Typography textAlign="center" mt="32px" fontSize="1.2rem">
                        Not found word search "{filters.search}"
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

export default ProductsHome

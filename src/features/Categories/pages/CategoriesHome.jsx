import { Box, Button, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import categoriesApi from '../../../api/categoriesApi'
import CardItem from '../../../components/CardItem'
import DataMessageEmpty from '../../../components/DataMessageEmpty'

CategoriesHome.propTypes = {}

function CategoriesHome(props) {
    const { pathname } = useLocation()
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        const getAllCategory = async () => {
            const { categories } = await categoriesApi.getAll()
            setCategoryList(categories)
        }

        getAllCategory()
    }, [])

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
                    Categories
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
            <Box width="100%">
                {categoryList.length === 0 && <DataMessageEmpty text="Categories is empty" />}
                <Box
                    display="flex"
                    width="100%"
                    sx={{
                        flexFlow: 'row wrap',
                        gap: '14px',
                    }}
                >
                    {categoryList?.map((category, index) => (
                        <Box width="calc(100%/3 - 14px)" key={category.id}>
                            <CardItem title="Category" data={category} number={index + 1} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default CategoriesHome

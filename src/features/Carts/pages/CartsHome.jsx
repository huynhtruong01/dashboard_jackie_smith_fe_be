import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import cartsApi from '../../../api/cartsApi'
import CardItem from '../../../components/CardItem'
import DataMessageEmpty from '../../../components/DataMessageEmpty'

function CartsHome() {
    const [cartList, setCartList] = useState([])

    useEffect(() => {
        const getAllCart = async () => {
            try {
                const { carts } = await cartsApi.getAll()
                setCartList(carts)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getAllCart()
    }, [])

    console.log(cartList)

    return (
        <Box>
            <Box mb="22px">
                <Typography variant="h6" component="h2" color={`${grey[900]}`}>
                    Carts
                </Typography>
            </Box>
            <Box>{cartList.length === 0 && <DataMessageEmpty text="Carts is empty" />}</Box>
            <Box display="flex" gap="10px">
                {cartList?.length > 0 &&
                    cartList?.map((cart, index) => (
                        <Box key={cart._id} width="calc(100%/3 - 10px)">
                            <CardItem title="Cart" data={cart} number={index + 1} />
                        </Box>
                    ))}
            </Box>
        </Box>
    )
}

export default CartsHome

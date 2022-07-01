import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import CategoryIcon from '@mui/icons-material/Category'
import DescriptionIcon from '@mui/icons-material/Description'
import GroupIcon from '@mui/icons-material/Group'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import TimelineIcon from '@mui/icons-material/Timeline'
import { Box, Typography } from '@mui/material'
import { blueGrey, deepPurple, green, indigo, orange, red, yellow } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import loginImage from '../../assets/image/login.gif'
import Widget from '../../components/Widget'
import { formatPrice, getCounts } from '../../utils/common'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ordersApi from '../../api/ordersApi'

Home.propTypes = {}

function Home() {
    const [counts, setCounts] = useState({})
    const getUser = useSelector((state) => state.users.user)
    const [totalPrice, setTotalPrice] = useState(0)

    const dataList = [
        {
            name: 'Products',
            icon: BrandingWatermarkIcon,
            link: 'products',
            titleLink: 'View all products',
            color: indigo,
        },
        {
            name: 'Categories',
            icon: CategoryIcon,
            link: 'categories',
            titleLink: 'View all categories',
            color: blueGrey,
        },
        {
            name: 'Carts',
            icon: ShoppingCartIcon,
            link: 'carts',
            titleLink: 'View all carts',
            color: orange,
        },
        {
            name: 'Orders',
            icon: DescriptionIcon,
            link: 'orders-successful',
            titleLink: 'View all orders',
            color: deepPurple,
        },
        {
            name: 'Users',
            icon: GroupIcon,
            link: getUser?.user?.role === 'admin' ? 'users' : 'user-admin',
            titleLink: 'View all users',
            color: red,
        },
        {
            name: 'Statistics',
            icon: TimelineIcon,
            link: 'statistics',
            titleLink: 'View all statistics',
            color: yellow,
        },
    ]

    useEffect(() => {
        const getAllCount = async () => {
            try {
                const counts = await getCounts()
                setCounts(counts)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        const getTotalPrice = async () => {
            try {
                const { orders } = await ordersApi.getAll()
                const sumPrice = orders.reduce(
                    (total, order) => total + Number.parseInt(order.totalPrice),
                    0
                )

                setTotalPrice(sumPrice)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getTotalPrice()
        getAllCount()
    }, [])

    let newDataList

    if (!!counts && Object.keys(counts).length > 0) {
        const arr = ['Product', 'Category', 'Cart', 'Order', 'User']
        newDataList = dataList.map((data, index) => {
            return {
                ...data,
                number: counts[`count${arr[index]}`],
            }
        })
    }

    return (
        <Box width="100%">
            <Box p="15px">
                {getUser?.user && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexFlow: 'row wrap',
                            gap: '12px',
                        }}
                    >
                        {newDataList?.map((data) => (
                            <Box width="calc(100%/3 - 10px)" key={data.name}>
                                <Widget data={data} />
                            </Box>
                        ))}
                        <Box width="66.6666%">
                            <Widget
                                data={{
                                    name: 'Earn money',
                                    icon: AttachMoneyIcon,
                                    link: '',
                                    color: green,
                                    number: formatPrice(totalPrice) || 0,
                                }}
                            />
                        </Box>
                    </Box>
                )}
                {!getUser?.user && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexFlow: 'column nowrap',
                            height: '100%',
                            pt: '50px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mb: '20px',
                            }}
                        >
                            <Box width="300px" borderRadius="8px" overflow="hidden">
                                <img src={loginImage} alt="login" />
                            </Box>
                        </Box>
                        <Typography
                            display="flex"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                '& > a': {
                                    display: 'inline-block',
                                    width: 'auto',
                                    m: '0 5px',
                                    color: orange[400],

                                    '&:hover': {
                                        color: orange[700],
                                        textDecoration: 'underline',
                                    },
                                },
                            }}
                        >
                            Please <Link to="/login">login</Link> to see more and do feature you
                            doing
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default Home

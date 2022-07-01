import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import CategoryIcon from '@mui/icons-material/Category'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import DescriptionIcon from '@mui/icons-material/Description'
import GroupIcon from '@mui/icons-material/Group'
import HomeIcon from '@mui/icons-material/Home'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import StyleIcon from '@mui/icons-material/Style'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { orange } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AssignmentIcon from '@mui/icons-material/Assignment'

Sidebar.propTypes = {}

function Sidebar() {
    const { pathname } = useLocation()
    let path = pathname.split('/')
    const [selectIndex, setSelectIndex] = useState(path[1])
    const getUser = useSelector((state) => state.users.user)

    const menuList = [
        {
            name: 'Home',
            icon: HomeIcon,
            link: '',
        },
        {
            name: 'Products',
            icon: BrandingWatermarkIcon,
            link: getUser?.user ? 'products' : 'login',
        },
        {
            name: 'Categories',
            icon: CategoryIcon,
            link: getUser?.user ? 'categories' : 'login',
        },
        {
            name: 'Styles',
            icon: StyleIcon,
            link: getUser?.user ? 'styles' : 'login',
        },
        {
            name: 'Colors',
            icon: ColorLensIcon,
            link: getUser?.user ? 'colors' : 'login',
        },
        {
            name: 'Carts',
            icon: ShoppingCartIcon,
            link: getUser?.user ? 'carts' : 'login',
        },
        {
            name: 'Orders',
            icon: DescriptionIcon,
            link: getUser?.user ? 'orders' : 'login',
        },
        {
            name: 'Shipping',
            icon: LocalShippingIcon,
            link: getUser?.user ? 'shipping' : 'login',
        },
        {
            name: 'Order successful',
            icon: AssignmentIcon,
            link: getUser?.user ? 'orders-successful' : 'login',
        },
        {
            name: 'Users',
            icon: GroupIcon,
            link: getUser?.user
                ? getUser?.user?.role === 'admin'
                    ? 'users'
                    : 'user-admin'
                : 'login',
        },
        {
            name: 'Statistics',
            icon: LeaderboardIcon,
            link: getUser?.user ? 'statistics' : 'login',
        },
    ]

    const handleClick = (pathParams) => {
        setSelectIndex(pathParams)
    }

    useEffect(() => {
        setSelectIndex(path[1])
    }, [pathname])

    return (
        <Box
            sx={{
                position: 'fixed',
                flex: 1,
                height: 'calc(100vh - 64px)',
                backgroundColor: '#fff',
                width: '250px',
                overflowY: 'scroll',
            }}
        >
            <Box>
                <List component="nav">
                    {menuList.map((menu) => {
                        const Icon = menu.icon
                        return (
                            <ListItem
                                key={menu.name}
                                onClick={() => handleClick(menu.link)}
                                sx={{
                                    width: '100%',
                                    pr: 0,
                                    pl: 0,
                                }}
                            >
                                <Link to={menu.link}>
                                    <ListItemButton
                                        selected={selectIndex === menu.link}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: orange[50],
                                            },
                                            '&.Mui-selected': {
                                                borderLeft: `7px solid ${orange[700]}`,
                                                backgroundColor: orange[50],
                                                transition: '.2s ease-in-out',

                                                '& .MuiTypography-root': {
                                                    color: orange[700],
                                                },

                                                '& svg': {
                                                    color: orange[700],
                                                },

                                                '&:hover': {
                                                    backgroundColor: orange[100],
                                                },
                                            },
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Icon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={menu.name}
                                            sx={{
                                                '& span': {
                                                    fontWeight: 500,
                                                },
                                            }}
                                        />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </Box>
    )
}

export default Sidebar

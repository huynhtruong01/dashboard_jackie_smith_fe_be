import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import CategoryIcon from '@mui/icons-material/Category'
import DescriptionIcon from '@mui/icons-material/Description'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import GroupIcon from '@mui/icons-material/Group'
import HomeIcon from '@mui/icons-material/Home'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { orange } from '@mui/material/colors'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

Sidebar.propTypes = {}

function Sidebar(props) {
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
                height: '100vh',
                backgroundColor: '#fff',
                width: '250px',
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

import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/Users/userSlice'
import { getNameInLast } from '../utils/common'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

Header.propTypes = {}

function Header() {
    const [anchorEl, setAnchorEl] = useState(null)
    const getUser = useSelector((state) => state.users.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogoutClick = () => {
        dispatch(logout())
    }

    const menuItems = [
        {
            id: 1,
            name: 'Your account',
            link: '/information-account',
            onClick() {
                handleClose()
            },
        },
        {
            id: 2,
            name: 'Logout',
            link: '/logout',
            onClick() {
                handleLogoutClick()
                navigate('/login')
            },
        },
    ]

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 10,
                borderBottom: `1px solid ${grey[200]}`,
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="static"
                    sx={{
                        boxShadow: 0,
                    }}
                >
                    <Toolbar
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                '& > a': {
                                    fontWeight: 600,
                                    color: orange[500],
                                },
                            }}
                        >
                            <Link to="/">Jackie Smith</Link>
                        </Typography>

                        <Box>
                            {getUser?.user && (
                                <>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        sx={{
                                            color: orange[700],
                                            backgroundColor: orange[50],
                                            '&:hover': {
                                                backgroundColor: orange[600],
                                                color: '#fff',
                                            },
                                        }}
                                        endIcon={<ArrowDropDownIcon />}
                                    >
                                        Hi, {getNameInLast(getUser.user.fullname)}
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        {menuItems.map((menu) => (
                                            <MenuItem
                                                onClick={menu.onClick}
                                                sx={{
                                                    '& > a': { color: orange[500] },
                                                    '&:hover': {
                                                        backgroundColor: orange[50],
                                                    },
                                                }}
                                                key={menu.name}
                                            >
                                                <Link to={menu.link}>{menu.name}</Link>
                                            </MenuItem>
                                        ))}
                                    </Menu>{' '}
                                </>
                            )}
                            {!getUser?.user && (
                                <Button
                                    sx={{
                                        '& > a': {
                                            color: orange[600],
                                        },
                                        '&:hover': {
                                            backgroundColor: orange[50],
                                        },
                                    }}
                                >
                                    <Link to="/login">Login</Link>
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </Box>
    )
}

export default Header

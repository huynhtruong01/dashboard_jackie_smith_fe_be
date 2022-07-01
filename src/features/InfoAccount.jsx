import { Avatar, Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import React from 'react'
import { useSelector } from 'react-redux'
import { capitalizeCharacter, getNameInLast, hashPassword } from '../utils/common'
import { Link } from 'react-router-dom'

InfoAccount.propTypes = {}

function InfoAccount() {
    const user = useSelector((state) => state.users.user.user)
    const name = getNameInLast(user.fullname)

    const infoList = [
        {
            id: 'fullname',
            label: 'Full Name',
            value: user.fullname,
        },
        {
            id: 'email',
            label: 'Email',
            value: user.email,
        },
        {
            id: 'password',
            label: 'Password',
            value: hashPassword(8),
        },
        {
            id: 'role',
            label: 'Role',
            value: capitalizeCharacter(user?.role),
        },
    ]

    return (
        <Box width="100%" pt="20px">
            <Box width="700px" margin="auto" p="30px" backgroundColor="#fff" borderRadius="8px">
                <Box display="flex" mb="30px" justifyContent="center">
                    <Avatar
                        sx={{
                            fontSize: '2rem',
                            width: 60,
                            height: 60,
                            backgroundColor: orange[100],
                            color: orange[600],
                            mr: '20px',
                        }}
                    >
                        {name.slice(0, 1).toUpperCase()}
                    </Avatar>
                    <Typography color={grey[500]}>
                        <Box fontSize="2rem" fontWeight={500} color={grey[700]}>
                            Hello{' '}
                            <Typography
                                component="span"
                                fontSize="2rem"
                                fontWeight={600}
                                color={orange[600]}
                            >
                                {capitalizeCharacter(name)}
                            </Typography>
                        </Box>
                        <Typography
                            component="span"
                            color={orange[600]}
                            fontWeight={600}
                            fontSize="1.2rem"
                        >
                            Welcome
                        </Typography>{' '}
                        to my account
                    </Typography>
                </Box>
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            columnGap: '15px',
                            rowGap: '25px',
                            flexFlow: 'row wrap',
                        }}
                    >
                        {infoList?.map((info) => (
                            <Box key={info.id} width="calc(100% / 2 - 15px)">
                                <InputLabel
                                    htmlFor={info.id}
                                    sx={{
                                        mb: '8px',
                                    }}
                                >
                                    {info.label}
                                </InputLabel>
                                <TextField id={info.id} value={info.value} disabled fullWidth />
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box mt="20px" display="flex">
                    <Link to="/change-password">
                        <Button
                            sx={{
                                backgroundColor: orange[100],
                                color: orange[700],
                                '&:hover': {
                                    backgroundColor: orange[600],
                                    color: '#fff',
                                },
                            }}
                        >
                            Change password
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default InfoAccount

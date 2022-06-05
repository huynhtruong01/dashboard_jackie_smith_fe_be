import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, InputLabel, TextField, Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { capitalizeCharacter, getNameInLast, hashPassword } from '../utils/common'
import { grey, orange } from '@mui/material/colors'

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
            id: 'address',
            label: 'Address',
            value: user.address,
        },
        {
            id: 'phoneNumber',
            label: 'Phone Number',
            value: `0${user.phoneNumber}`,
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
                            fontSize: '4rem',
                            width: 76,
                            height: 76,
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
            </Box>
        </Box>
    )
}

export default InfoAccount

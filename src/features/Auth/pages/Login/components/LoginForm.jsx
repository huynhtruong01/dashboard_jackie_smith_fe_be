import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Typography } from '@mui/material'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from '../../../../../components/formControls/InputField'
import PasswordField from '../../../../../components/formControls/PasswordField'
import { grey, orange } from '@mui/material/colors'
import { Link } from 'react-router-dom'

LoginForm.propTypes = {}

function LoginForm({ onSubmit = null }) {
    const schema = yup.object().shape({
        email: yup.string().required('Please enter email').email('Invalid email'),
        password: yup
            .string()
            .required('Please enter password')
            .min(6, 'Please enter password least six characters')
            .max(20, 'Please enter password maximum twenty characters'),
    })

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
        if (!onSubmit) return

        try {
            await onSubmit(values)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
            <Box>
                <Typography
                    textAlign="center"
                    textTransform="uppercase"
                    fontSize="1.3rem"
                    fontWeight={600}
                    color={`${grey[800]}`}
                >
                    Login
                </Typography>
            </Box>
            <Box mb="16px">
                <InputField name="email" form={form} label="Email" placeholder="Enter email" />
                <PasswordField
                    name="password"
                    form={form}
                    label="Password"
                    placeholder="Enter password"
                />
            </Box>

            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    backgroundColor: orange[300],
                    p: '8px',
                    fontSize: '1.1rem',
                    mb: '8px',

                    '&:hover': {
                        backgroundColor: orange[600],
                    },
                }}
            >
                Login
            </Button>
        </Box>
    )
}

export default LoginForm

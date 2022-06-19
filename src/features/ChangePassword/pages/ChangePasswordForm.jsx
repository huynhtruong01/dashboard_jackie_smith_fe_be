import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Typography } from '@mui/material'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PasswordField from '../../../components/formControls/PasswordField'
import { grey, orange } from '@mui/material/colors'
import { Link } from 'react-router-dom'

ChangePasswordForm.propTypes = {}

function ChangePasswordForm({ onSubmit = null }) {
    const schema = yup.object().shape({
        newPassword: yup
            .string()
            .required('Please enter new password')
            .min(6, 'Please enter new password least six characters')
            .max(20, 'Please enter new password maximum twenty characters'),
        confirmPassword: yup
            .string()
            .required('Please enter new password')
            .oneOf([yup.ref('newPassword')], 'Password is not match'),
    })

    const form = useForm({
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
        try {
            if (!onSubmit) return
            await onSubmit(values)
            form.reset()
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
            <Typography
                sx={{
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontSize: '21px',
                    mb: '18px',
                    color: grey[700],
                    fontWeight: 500,
                }}
            >
                Change Password
            </Typography>
            <Box mb="12px">
                <PasswordField name="newPassword" form={form} label="New password" />
                <PasswordField name="confirmPassword" form={form} label="Confirm password" />
            </Box>
            <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                    backgroundColor: orange[400],
                    p: '10px',
                    '&:hover': {
                        backgroundColor: orange[600],
                    },
                }}
            >
                Change password
            </Button>
            <Box
                textAlign="center"
                mt="8px"
                sx={{
                    a: {
                        color: orange[500],

                        '&:hover': {
                            color: orange[700],
                            textDecoration: 'underline',
                        },
                    },
                }}
            >
                <Link to="/">Back to home</Link>
            </Box>
        </Box>
    )
}

export default ChangePasswordForm

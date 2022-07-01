import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputField from '../../../components/formControls/InputField'
import PasswordField from '../../../components/formControls/PasswordField'
import { grey, orange } from '@mui/material/colors'
import SelectField from '../../../components/formControls/SelectField'
import { roleList } from '../../../utils/common'
import PhoneNumberField from '../../../components/formControls/PhoneNumberField'

UsersForm.propTypes = {}

function UsersForm({ values, onSubmit = null }) {
    const schema = yup.object().shape({
        fullname: yup
            .string()
            .required('Please enter full name')
            .test(
                'at-least-two-words',
                'Please enter full name lease two words',
                (value) => value.split(' ').filter((x) => !!x && x.length >= 2).length >= 2
            ),
        email: yup.string().required('Please enter email').email('Invalid email'),
        // address: yup.string().required('Please enter address'),
        // phoneNumber: yup
        //     .number()
        //     .required('Please enter phone number')
        //     .typeError('Phone number must be number'),
        password: yup
            .string()
            .required('Please enter password')
            .min(6, 'Please enter password least six characters')
            .max(20, 'Please enter password maximum twenty characters'),
        confirmPassword: yup
            .string()
            .required('Please enter confirm password')
            .oneOf([yup.ref('password')], 'Please enter confirm password must equal password'),
        role: yup.string().required('Please select role'),
    })

    const form = useForm({
        defaultValues: {
            fullname: values.fullname,
            email: values.email,
            // address: values.address,
            // phoneNumber: values.phoneNumber,
            password: values.password,
            confirmPassword: values.confirmPassword,
            role: values.role,
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
        <Box>
            <Typography
                variant="h5"
                component="h2"
                textAlign="center"
                textTransform="uppercase"
                fontWeight={600}
                color={`${grey[700]}`}
            >
                {values.username ? 'Update' : 'Add'} user
            </Typography>
            <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
                <Box mb="20px">
                    <InputField name="fullname" label="Full Name" form={form} />
                    <InputField name="email" label="Email" form={form} disabled={!!values?.email} />
                    {/* <InputField name="address" label="Address" form={form} />
                    <PhoneNumberField name="phoneNumber" label="Phone number" form={form} /> */}
                    <PasswordField name="password" label="Password" form={form} />
                    <PasswordField name="confirmPassword" label="Confirm password" form={form} />
                    <SelectField
                        name="role"
                        form={form}
                        label="Role"
                        data={roleList}
                        disabled={!!values?.email}
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        p: '10px',
                        fontSize: '1.1rem',
                        backgroundColor: orange[400],

                        '&:hover': {
                            backgroundColor: orange[700],
                        },
                    }}
                >
                    {values.username ? 'Update' : 'Add'}
                </Button>
            </Box>
        </Box>
    )
}

export default UsersForm

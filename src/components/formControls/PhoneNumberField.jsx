import { Box, FormHelperText } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

PhoneNumberField.propTypes = {}

function PhoneNumberField({ name, form, label }) {
    const { control, formState } = form
    const error = formState.errors[name]

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <Box>
                    <PhoneInput
                        className={`${!!error ? 'error' : ''}`}
                        placeholder="Enter phone number"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    <FormHelperText className={!!error ? 'error' : ''}>
                        {error?.message}
                    </FormHelperText>
                </Box>
            )}
        />
    )
}

export default PhoneNumberField

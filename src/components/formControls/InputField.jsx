import React from 'react'
import PropTypes from 'prop-types'
import { Box, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

InputField.propTypes = {}

function InputField({ name, label, form, placeholder = '', disabled = false }) {
    const { control, formState } = form
    const error = formState.errors[name]

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onBlur, onChange, value } }) => (
                <TextField
                    name={name}
                    margin="normal"
                    fullWidth
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    label={label}
                    placeholder={placeholder}
                    error={!!error}
                    helperText={error?.message}
                    disabled={disabled}
                />
            )}
        />
    )
}

export default InputField

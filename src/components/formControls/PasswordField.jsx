import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

PasswordField.propTypes = {}

function PasswordField({ name, label, form, placeholder }) {
    const [showPassword, setShowPassword] = useState(false)
    const { control, formState } = form

    const error = formState.errors[name]

    const handleClick = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <FormControl sx={{ mt: 1, mb: 1 }} fullWidth variant="outlined" error={!!error}>
                    <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClick} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={label}
                    />
                    <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    )
}

export default PasswordField

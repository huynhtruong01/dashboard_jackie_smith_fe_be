import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { capitalizeCharacter } from '../../utils/common'

SelectField.propTypes = {}

function SelectField({ name, form, label, data, disabled = false }) {
    const { control, formState } = form
    const error = formState.errors[name]

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <FormControl
                    error={!!error}
                    fullWidth
                    disabled={disabled}
                    sx={{
                        mb: '10px',
                    }}
                >
                    <InputLabel id="select-value">{label}</InputLabel>
                    <Select
                        labelId="select-value"
                        defaultValue={value}
                        value={value}
                        label={label}
                        onChange={onChange}
                    >
                        {data?.map((x) => (
                            <MenuItem value={x.toLowerCase()} key={x}>
                                {capitalizeCharacter(x)}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    )
}

export default SelectField

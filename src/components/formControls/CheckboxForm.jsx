import React from 'react'
import PropTypes from 'prop-types'
import { Box, FormControlLabel, Checkbox } from '@mui/material'
import { Controller } from 'react-hook-form'
import { orange } from '@mui/material/colors'

CheckboxForm.propTypes = {}

function CheckboxForm({ name, label, form }) {
    const { control } = form

    return (
        <Box>
            <Controller
                name={name}
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                sx={{
                                    color: orange[800],
                                    '&.Mui-checked': {
                                        color: orange[600],
                                    },
                                }}
                            />
                        }
                        label={label}
                    />
                )}
            />
        </Box>
    )
}

export default CheckboxForm

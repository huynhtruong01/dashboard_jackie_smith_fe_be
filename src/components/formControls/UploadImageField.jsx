import ImageIcon from '@mui/icons-material/Image'
import { Box, Button, Input } from '@mui/material'
import { orange } from '@mui/material/colors'
import React from 'react'
import { Controller } from 'react-hook-form'

UploadImageField.propTypes = {}

function urlImage(value) {
    if (typeof value === 'object') return URL.createObjectURL(value)

    return value
}

function UploadImageField({ name, form, label }) {
    const { control, formState } = form
    const error = formState.errors[name]

    console.log(error?.message)

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <Box>
                    <label htmlFor="contained-button-file">
                        <Input
                            id="contained-button-file"
                            accept="image/*"
                            type="file"
                            onChange={(e) => onChange(e.target.files[0])}
                            sx={{
                                display: 'none',
                            }}
                        />
                        <Button
                            component="span"
                            startIcon={<ImageIcon />}
                            sx={{
                                backgroundColor: orange[400],
                                color: '#ffff',

                                '&:hover': {
                                    backgroundColor: orange[400],
                                    color: '#ffff',
                                },
                            }}
                        >
                            Upload image
                        </Button>
                    </label>

                    {!!value && (
                        <Box
                            width="100px"
                            mt="10px"
                            overflow="hidden"
                            sx={{
                                img: {
                                    borderRadius: '5px',
                                    border: `1px solid ${orange[200]}`,
                                    transition: '.3s ease-in-out',
                                    '&:hover': {
                                        border: `1px solid ${orange[700]}`,
                                    },
                                },
                            }}
                        >
                            <img src={`${urlImage(value)}`} alt="" />
                        </Box>
                    )}
                </Box>
            )}
        />
    )
}

export default UploadImageField

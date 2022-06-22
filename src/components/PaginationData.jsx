import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Pagination } from '@mui/material'
import { orange } from '@mui/material/colors'

PaginationData.propTypes = {}

function PaginationData({ totalCount = 0, filters = {}, onChange = null }) {
    const handlePaginationChange = (e, page) => {
        if (!onChange) return
        onChange(page)
    }

    return (
        <Box>
            <Pagination
                count={Math.ceil(totalCount / filters.limit)}
                shape="rounded"
                page={filters.page}
                onChange={handlePaginationChange}
                sx={{
                    '& .MuiButtonBase-root': {
                        '&:hover': {
                            backgroundColor: orange[300],
                            color: '#fff',
                        },
                    },

                    '& .MuiButtonBase-root.Mui-selected': {
                        backgroundColor: orange[400],
                        color: '#fff',

                        '&:hover': {
                            backgroundColor: orange[700],
                        },
                    },
                }}
            />
        </Box>
    )
}

export default PaginationData

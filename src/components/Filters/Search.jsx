import SearchIcon from '@mui/icons-material/Search'
import { Box, InputBase } from '@mui/material'
import { orange } from '@mui/material/colors'
import debounce from 'lodash.debounce'
import { useState, useCallback } from 'react'

Search.propTypes = {}

function Search({ onSubmit = null }) {
    const [value, setValue] = useState('')

    const debounceValue = useCallback(
        debounce((value) => {
            onSubmit(value)
        }, 800),
        []
    )

    const handleSearchChange = (e) => {
        if (!onSubmit) return

        setValue(e.target.value)
        debounceValue(e.target.value)
    }

    return (
        <Box
            sx={{
                position: 'relative',
                borderRadius: '5px',
                backgroundColor: orange[100],
                overflow: 'hidden',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    padding: '0 16px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: orange[500],
                    zIndex: 1,
                    transition: '.2s ease-in-out',
                }}
                onClick={handleSearchChange}
            >
                <SearchIcon
                    sx={{
                        color: '#fff',
                    }}
                />
            </Box>
            <InputBase
                sx={{
                    color: 'inherit',
                    '& .MuiInputBase-input': {
                        p: '8px',
                        pl: 'calc(56px + 8px)',
                    },
                    width: '100%',
                    border: '1px solid transparent',
                    borderRadius: '5px',
                    transition: '.2s ease-in-out',

                    '&:hover': {
                        backgroundColor: orange[200],
                        border: `1px solid ${orange[700]}`,
                    },
                }}
                value={value}
                onChange={handleSearchChange}
                placeholder="Search..."
            />
        </Box>
    )
}

export default Search

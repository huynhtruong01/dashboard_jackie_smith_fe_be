import { Box, Button, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import stylesApi from '../../../api/stylesApi'
import CardItem from '../../../components/CardItem'
import DataMessageEmpty from '../../../components/DataMessageEmpty'

StylesHome.propTypes = {}

function StylesHome() {
    const { pathname } = useLocation()
    const [styleList, setStyleList] = useState([])

    useEffect(() => {
        const getAllStyle = async () => {
            const { styles } = await stylesApi.getAll()
            setStyleList(styles)
        }

        getAllStyle()
    }, [])

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: '20px',
                }}
            >
                <Typography variant="h6" component="h2" color={`${grey[900]}`}>
                    Styles
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: orange[300],

                        '& > a': {
                            color: '#fff',
                            fontWeight: 600,
                        },

                        '&:hover': {
                            backgroundColor: orange[600],
                        },
                    }}
                >
                    <Link to={`${pathname}/add`}>Add new</Link>
                </Button>
            </Box>
            <Box width="100%">
                {styleList.length === 0 && <DataMessageEmpty text="Styles is empty" />}
                <Box
                    display="flex"
                    width="100%"
                    sx={{
                        flexFlow: 'row wrap',
                        gap: '14px',
                    }}
                >
                    {styleList?.map((style, index) => (
                        <Box width="calc(100%/3 - 14px)" key={style.id}>
                            <CardItem title="Style" data={style} number={index + 1} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default StylesHome

import { Box, Button, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import colorsApi from '../../../api/colorsApi'
import CardItem from '../../../components/CardItem'
import DataMessageEmpty from '../../../components/DataMessageEmpty'

ColorsHome.propTypes = {}

function ColorsHome(props) {
    const { pathname } = useLocation()
    const [colorList, setColorList] = useState([])
    // const isToggle = useSelector((state) => state.toggle.isToggle)

    useEffect(() => {
        const getAllColor = async () => {
            const { colors } = await colorsApi.getAll()
            console.log(colors)
            setColorList(colors)
        }

        getAllColor()
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
                    Colors
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
                {colorList.length === 0 && <DataMessageEmpty text="Colors is empty" />}
                <Box
                    display="flex"
                    width="100%"
                    sx={{
                        flexFlow: 'row wrap',
                        gap: '14px',
                    }}
                >
                    {colorList?.map((color, index) => (
                        <Box width="calc(100%/3 - 14px)" key={color.id}>
                            <CardItem title="Color" data={color} number={index + 1} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default ColorsHome

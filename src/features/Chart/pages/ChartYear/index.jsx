import { Box, Typography } from '@mui/material'
import { blue, red, orange } from '@mui/material/colors'
import { Chart, registerables } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import ordersApi from '../../../../api/ordersApi'
import { getYear, generateDate } from '../../../../utils/common'

Chart.register(...registerables)
ChartYear.propTypes = {}

function revenueByYear(obj, orderList) {
    if (!obj || !Array.isArray(orderList) || orderList.length === 0) return

    const newObj = { ...obj }
    for (const order of orderList) {
        if (!newObj[`year${getYear(order.updatedAt)}`]) {
            newObj[`year${getYear(order.updatedAt)}`] = order.totalPrice
        } else {
            newObj[`year${getYear(order.updatedAt)}`] =
                newObj[`year${getYear(order.updatedAt)}`] + order.totalPrice
        }
    }

    return newObj
}

function userByYear(obj, orderList) {
    if (!obj || !Array.isArray(orderList) || orderList.length === 0) return

    const newObj = { ...obj }
    for (const order of orderList) {
        if (!newObj[`year${getYear(order.updatedAt)}`]) {
            newObj[`year${getYear(order.updatedAt)}`] = {
                count: 1,
                values: [order.userId._id],
            }
        }

        if (!newObj[`year${getYear(order.updatedAt)}`].values.includes(order.userId._id)) {
            newObj[`year${getYear(order.updatedAt)}`].count += 1
            newObj[`year${getYear(order.updatedAt)}`].values.push(order.userId._id)
        }
    }

    return newObj
}

function ChartYear() {
    const [revenue, setRevenue] = useState({})
    const [user, setUser] = useState([])

    useEffect(() => {
        const getRevenue = async () => {
            try {
                const { orders } = await ordersApi.getAllSuccess()

                const revenueOther = {
                    year2020: 0,
                    year2021: 0,
                    year2022: 0,
                }

                const userOther = {
                    year2020: 0,
                    year2021: 0,
                    year2022: 0,
                }

                const newRevenue = revenueByYear(revenueOther, orders)
                const newUser = userByYear(revenueOther, orders)

                const countUser = Object.values(newUser).map((x) => {
                    if (!x) return 0
                    return x.count
                })

                setRevenue(newRevenue)
                setUser(countUser)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getRevenue()
    }, [])

    console.log(revenue)

    return (
        <Box>
            <Typography variant="h4" component="h3" mb="16px" color={orange[500]}>
                {generateDate()}
            </Typography>
            <Box p="8px" borderRadius="5px" backgroundColor="#fff">
                <Bar
                    data={{
                        labels: [2020, 2021, 2022],
                        datasets: [
                            {
                                label: 'revenue',
                                data: Object.values(revenue),
                                backgroundColor: blue[50],
                                borderColor: blue[600],
                                borderWidth: 1,
                            },
                            {
                                label: 'user',
                                data: user,
                                backgroundColor: red[50],
                                borderColor: red[600],
                                borderWidth: 1,
                            },
                        ],
                    }}
                />
            </Box>
        </Box>
    )
}

export default ChartYear

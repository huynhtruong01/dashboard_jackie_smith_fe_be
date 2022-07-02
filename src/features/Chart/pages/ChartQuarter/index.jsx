import { Box, Typography } from '@mui/material'
import { Chart, registerables } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import ordersApi from '../../../../api/ordersApi'
import { generateDate, getMonth } from '../../../../utils/common'
import { orange, indigo, red } from '@mui/material/colors'

Chart.register(...registerables)
ChartQuarter.propTypes = {}

function totalPriceQuarter(quarter, orderList) {
    if (!quarter || !orderList) return

    let totalPrice = 0
    for (const order of orderList) {
        if (quarter.includes(getMonth(order.updatedAt) + 1) && totalPrice > 0) {
            totalPrice += order.totalPrice
        }

        if (quarter.includes(getMonth(order.updatedAt) + 1) && totalPrice <= 0) {
            totalPrice = order.totalPrice
        }
    }

    return totalPrice
}

function totalUserQuarter(quarter, orderList) {
    if (
        !Array.isArray(quarter) ||
        quarter.length === 0 ||
        !Array.isArray(orderList) ||
        orderList.length === 0
    )
        return

    const user = {
        count: 0,
        values: [],
    }

    for (const order of orderList) {
        if (quarter.includes(getMonth(order.updatedAt) + 1) && !user.count) {
            user.count = 1
            user.values.push(order.userId._id)
        }

        if (
            quarter.includes(getMonth(order.updatedAt) + 1) &&
            !user.values.includes(order.userId._id)
        ) {
            user.count += 1
            user.values.push(order.userId._id)
        }
    }

    return user
}

function ChartQuarter() {
    const [revenue, setRevenue] = useState([])
    const [quantityUser, setQuantityUser] = useState([])

    useEffect(() => {
        const getOrder = async () => {
            const { orders } = await ordersApi.getAllSuccess()

            // price
            const revenueQuarterOne = totalPriceQuarter([1, 2, 3], orders)
            const revenueQuarterTwo = totalPriceQuarter([4, 5, 6], orders)
            const revenueQuarterThree = totalPriceQuarter([7, 8, 9], orders)
            const revenueQuarterFour = totalPriceQuarter([10, 11, 12], orders)

            // user
            const userQuarterOne = totalUserQuarter([1, 2, 3], orders)
            const userQuarterTwo = totalUserQuarter([4, 5, 6], orders)
            const userQuarterThree = totalUserQuarter([7, 8, 9], orders)
            const userQuarterFour = totalUserQuarter([10, 11, 12], orders)

            console.log(userQuarterTwo)

            setRevenue([
                revenueQuarterOne,
                revenueQuarterTwo,
                revenueQuarterThree,
                revenueQuarterFour,
            ])

            setQuantityUser([
                userQuarterOne.count,
                userQuarterTwo.count,
                userQuarterThree.count,
                userQuarterFour.count,
            ])
        }

        getOrder()
    }, [])

    return (
        <Box>
            <Typography variant="h4" component="h3" mb="16px" color={orange[500]}>
                {generateDate()}
            </Typography>
            <Box backgroundColor="#fff" p="8px" borderRadius="5px">
                <Bar
                    data={{
                        labels: ['Quarter one', 'Quarter two', 'Quarter three', 'Quarter four'],
                        datasets: [
                            {
                                label: 'revenue',
                                data: revenue,
                                backgroundColor: indigo[100],
                                borderColor: indigo[600],
                                borderWidth: 1,
                            },
                            {
                                label: 'user',
                                data: quantityUser,
                                backgroundColor: red[100],
                                borderColor: red[600],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                            },
                        },
                    }}
                />
            </Box>
        </Box>
    )
}

export default ChartQuarter

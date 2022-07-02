import { Box, Typography } from '@mui/material'
import { blue, orange, red } from '@mui/material/colors'
import { Chart, registerables } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import ordersApi from '../../../../api/ordersApi'
import { generateDate, getMonth } from '../../../../utils/common'

Chart.register(...registerables)

ChartMonth.propTypes = {}

function convertNumberUser(userList) {
    if (!Array.isArray(userList) || userList.length === 0) return

    const newUserList = userList.map((x) => {
        if (!x) return 0
        return x.count
    })

    return newUserList
}

function ChartMonth(props) {
    const [month, setMonth] = useState({})
    const [user, setUser] = useState({})

    const monthList = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    useEffect(() => {
        const getData = async () => {
            try {
                const { orders } = await ordersApi.getAllSuccess()

                // filter current year
                const orderList = orders.filter((order) => {
                    const year = new Date().getFullYear()
                    const yearDB = new Date(order.updatedAt).getFullYear()

                    return year === yearDB
                })

                const monthOther = {
                    January: 0,
                    February: 0,
                    March: 0,
                    April: 0,
                    May: 0,
                    June: 0,
                    July: 0,
                    August: 0,
                    September: 0,
                    October: 0,
                    November: 0,
                    December: 0,
                }

                const userOther = {
                    January: 0,
                    February: 0,
                    March: 0,
                    April: 0,
                    May: 0,
                    June: 0,
                    July: 0,
                    August: 0,
                    September: 0,
                    October: 0,
                    November: 0,
                    December: 0,
                }

                for (const order of orderList) {
                    if (!monthOther[`${monthList[getMonth(order.updatedAt)]}`]) {
                        monthOther[`${monthList[getMonth(order.updatedAt)]}`] = order.totalPrice
                    } else {
                        monthOther[`${monthList[getMonth(order.updatedAt)]}`] =
                            Number.parseInt(monthOther[`${monthList[getMonth(order.updatedAt)]}`]) +
                            order.totalPrice
                    }
                }

                for (const order of orderList) {
                    if (!userOther[`${monthList[getMonth(order.updatedAt)]}`]) {
                        userOther[`${monthList[getMonth(order.updatedAt)]}`] = {
                            count: 1,
                            values: [order.userId._id],
                        }
                    }

                    if (
                        !!userOther &&
                        !userOther[`${monthList[getMonth(order.updatedAt)]}`].values.includes(
                            order.userId._id
                        )
                    ) {
                        userOther[`${monthList[getMonth(order.updatedAt)]}`].count += 1
                        userOther[`${monthList[getMonth(order.updatedAt)]}`].values.push(
                            order.userId._id
                        )
                    }
                }

                console.log(monthOther, userOther)

                // set data
                setMonth({ ...monthOther })
                setUser({ ...userOther })
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getData()
    }, [])

    console.log(convertNumberUser(user))

    return (
        <Box>
            <Typography variant="h4" component="h3" mb="16px" color={orange[500]}>
                {generateDate()}
            </Typography>
            <Box backgroundColor="#fff" p="8px" borderRadius="5px">
                <Bar
                    data={{
                        labels: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ],
                        datasets: [
                            {
                                label: 'revenue',
                                data: Object.values(month),
                                backgroundColor: blue[100],
                                borderColor: blue[600],
                                borderWidth: 1,
                            },
                            {
                                label: 'user',
                                data: convertNumberUser(Object.values(user)),
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

export default ChartMonth

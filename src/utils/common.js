import cartsApi from '../api/cartsApi'
import categoriesApi from '../api/categoriesApi'
import productsApi from '../api/productsApi'
import ordersApi from '../api/ordersApi'
import usersApi from '../api/usersApi'

export const getCountData = () => {}

export const truncate = (str, number) => {
    return `${str.slice(0, number)}\u2026`
}

export const capitalizeCharacter = (str) => {
    if (!str) return

    const strList = str.split(' ').map((x) => {
        return `${x[0].toUpperCase()}${x.slice(1).toLowerCase()}`
    })

    return strList.join(' ')
}

export const colors = () => {
    const colorList = [
        'Red',
        'Blue',
        'Black',
        'White',
        'Orange',
        'Dark blue',
        'Pink',
        'Green',
        'Yellow brown',
        'Mixed',
    ]

    return colorList
}

export const styles = () => {
    const styleList = [
        'Monogram',
        'Simona',
        'Mini Miranda',
        'Gotham',
        'Leather Flora',
        'Emma',
        'Billeteras',
        'Relojes',
        'Tapabocas',
        'Jeans',
        'T-shirt',
        'Sweatshirt',
        'Jackets',
        'Denim',
        'Sneaker',
    ]

    return styleList
}

export const roleList = ['admin', 'employee', 'customer']

export const getCounts = async () => {
    try {
        const dataProducts = await productsApi.getAll()
        const dataCategories = await categoriesApi.getAll()
        const dataCarts = await cartsApi.getAll()
        const dataOrders = await ordersApi.getAll()
        const dataUsers = await usersApi.getAll()

        return {
            countProduct: dataProducts.totalCount,
            countCategory: dataCategories.totalCount,
            countCart: dataCarts.totalCount,
            countOrder: dataOrders.totalCount,
            countUser: dataUsers.totalCount,
        }
    } catch (error) {
        console.log('Error get counts failed: ', error)
    }
}

export const formatPrice = (x) => {
    if (!x) return

    return `$${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

export const hashPassword = (number) => {
    let strPass = ''
    for (let i = 0; i <= number; i++) {
        strPass += '\u002A'
    }

    return strPass
}

export const getNameInLast = (fullname) => {
    return fullname.split(' ').slice(-1)[0]
}

export const formatDate = (value) => {
    const fullDate = new Date(value)
    const date = `0${fullDate.getDate()}`.slice(-2)
    const month = `0${fullDate.getMonth() + 1}`.slice(-2)
    const year = fullDate.getFullYear()

    return `${date}/${month}/${year}`
}

export const calculatorPrice = (prices) => {
    const resultPrice = prices.reduce((total, x) => total + x.product.salePrice * x.quantity, 0)

    return `$${resultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

export const calculatorQuantity = (quantities) => {
    return quantities.reduce((total, x) => total + x.quantity, 0)
}

export const getMonth = (date) => {
    return new Date(date).getMonth()
}

export const getYear = (date) => {
    return new Date(date).getFullYear()
}

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

const dayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const generateDate = () => {
    const fullDate = new Date()
    const day = dayList[fullDate.getDay()]
    const date = fullDate.getDate()
    const month = monthList[fullDate.getMonth()]
    const year = fullDate.getFullYear()

    return `${day}, ${capitalizeCharacter(month)} ${date}, ${year}`
}

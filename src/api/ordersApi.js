import axiosClient from './axiosClient'

const ordersApi = {
    getAll: (params) => {
        const url = '/orders'
        return axiosClient.get(url, { params })
    },
    getAllApproved: () => {
        const url = '/orders/orders-approved'
        return axiosClient.get(url)
    },
    getAllShipping: () => {
        const url = '/orders/orders-shipping'
        return axiosClient.get(url)
    },
    getAllSuccess: () => {
        const url = '/orders/orders-success'
        return axiosClient.get(url)
    },
    getById: (id) => {
        const url = `/orders/${id}`
        return axiosClient.get(url)
    },
    add: (data) => {
        const url = '/orders'
        return axiosClient.post(url, data)
    },
    updateApproved: (data) => {
        const url = `/orders/update-approved/${data._id}`
        return axiosClient.put(url, data)
    },
    updateShipping: (data) => {
        const url = `/orders/update-shipping/${data._id}`
        return axiosClient.put(url, data)
    },
    updateSuccessfulDelivery: (data) => {
        const url = `/orders/update-delivery/${data._id}`
        return axiosClient.put(url, data)
    },
    remove: (id) => {
        const url = `/orders/${id}`
        return axiosClient.delete(url)
    },
}

export default ordersApi

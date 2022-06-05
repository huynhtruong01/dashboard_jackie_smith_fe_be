import axiosClient from './axiosClient'

const productsApi = {
    getAll: (params) => {
        const url = '/products'
        return axiosClient.get(url, { params })
    },
    getById: (id) => {
        const url = `/products/${id}`
        return axiosClient.get(url)
    },
    add: (data) => {
        const url = '/products'
        return axiosClient.post(url, data)
    },
    update: (data) => {
        const url = `/products/${data._id}`
        console.log(data)
        return axiosClient.put(url, data)
    },
    remove: (id) => {
        const url = `/products/${id}`
        return axiosClient.delete(url)
    },
}

export default productsApi

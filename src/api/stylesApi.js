import axiosClient from './axiosClient'

const stylesApi = {
    getAll() {
        const url = '/styles'
        return axiosClient.get(url)
    },
    getById(id) {
        const url = `/styles/${id}`
        return axiosClient.get(url)
    },
    add(data) {
        const url = '/styles'
        return axiosClient.post(url, data)
    },
    update(data) {
        const url = `/styles/${data._id}`
        return axiosClient.put(url, data)
    },
    remove(id) {
        const url = `/styles/${id}`
        return axiosClient.delete(url)
    },
}

export default stylesApi

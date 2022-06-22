import axiosClient from './axiosClient'

const colorsApi = {
    getAll() {
        const url = '/colors'
        return axiosClient.get(url)
    },
    getById(id) {
        const url = `/colors/${id}`
        return axiosClient.get(url)
    },
    add(data) {
        const url = '/colors'
        return axiosClient.post(url, data)
    },
    update(data) {
        const url = `/colors/${data._id}`
        return axiosClient.put(url, data)
    },
    remove(id) {
        const url = `/colors/${id}`
        return axiosClient.delete(url)
    },
}

export default colorsApi

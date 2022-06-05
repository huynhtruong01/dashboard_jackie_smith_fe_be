import axiosClient from './axiosClient'

const authApi = {
    login: (data, token) => {
        const url = '/auth/login'
        return axiosClient.post(url, {
            email: data.email,
            password: data.password,
        })
    },
}

export default authApi

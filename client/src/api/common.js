import axios from 'axios'
import { message } from 'antd';
export const _get = async (url, error_message) => {
    try {
        const { data } = await axios.get(url)
        return data
    } catch (error) {
        console.log(error_message, error.response)
        alertError(error.response.data.errors)
        return false
    }
}

export const _post = async (url, payload, error_message) => {
    try {
        const { data } = await axios.post(url, payload)
        return data
    } catch (error) {
        console.log(error_message, error.response)
        alertError(error.response.data.errors)
        return false
    }
}

const alertError = (errors) => {
    for (let i = 0; i < errors.length; i++) {
        const error = errors[i]
        message.error(error.msg)
    }
}

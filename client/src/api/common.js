import axios from 'axios'
export const _get = async (url, message) => {
   try {
      const { data } = await axios.get(url)
      return data
   } catch (error) {
      console.log(message, error.response)
      return false
   }
}

export const _post = async (url, payload, message) => {
   try {
      const { data } = await axios.post(url, payload)
      return data
   } catch (error) {
      console.log(message, error.response)
      return false
   }
}

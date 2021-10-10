import axios from 'axios'

export default {
  post(url, requestParams, config) {
    const axiosInstance = this.createInstance()
    return axiosInstance.post(url, requestParams, config)
  },

  get(url, requestParams, config) {
    const axiosInstance = this.createInstance()
    let urlSearchParams = new URLSearchParams(requestParams)

    return axiosInstance.get(`${url}?${urlSearchParams}`, config)
  },
  createInstance() {
    return axios.create()
  },
}

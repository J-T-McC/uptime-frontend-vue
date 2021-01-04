import axios from 'axios'

const apiEndpoint = process.env.VUE_APP_API

const ApiService = axios.create({
  baseURL: apiEndpoint
})

ApiService.defaults.withCredentials = true
ApiService.defaults.headers['Accept'] = 'application/json'

export default ApiService


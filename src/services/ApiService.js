import axios from 'axios'

const apiEndpoint = import.meta.env.VITE_API_URL

const ApiService = axios.create({
  baseURL: apiEndpoint
})

ApiService.defaults.withCredentials = true
ApiService.defaults.withXSRFToken = true
ApiService.defaults.headers['Accept'] = 'application/json'

export default ApiService


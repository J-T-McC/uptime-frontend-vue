import axios from 'axios'

const apiEndpoint = process.env.VUE_APP_API
const sanctumEndpoint = process.env.VUE_APP_SANCTUM

axios.defaults.withCredentials = true
axios.defaults.headers['Accept'] = 'application/json'

export { axios, apiEndpoint, sanctumEndpoint }
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.headers['Accept'] = 'application/json'

export default axios
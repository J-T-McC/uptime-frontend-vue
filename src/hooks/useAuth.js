import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.headers['Accept'] = 'application/json'

import store from '@/stores/state'
import { ref } from 'vue'

export const useIsAuthenticated = ref(false)

export function useAuth () {
  const login = async (email, password) => {
    return axios.post(store.state.api + '/login', {
      email: email,
      password: password
    }).then((response) => {
      useIsAuthenticated.value = response.status >= 200 && response.status < 300
    })
  }

  const logout = async () => {
    return axios.post(store.state.api + '/logout')
  }

  const fetchCsrf = async () => {
    return axios.get(store.state.api + '/sanctum/csrf-cookie')
  }

  return {
    login,
    logout,
    fetchCsrf
  }
}

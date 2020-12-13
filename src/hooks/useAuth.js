import {axios, apiEndpoint, sanctumEndpoint} from '@/helpers/api.js'

import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useLocalStore from '@/hooks/useLocalStore.js'

const localStore = useLocalStore('auth');
const userIsAuthenticated = ref(localStore.get('authenticated', false))

export function useAuth () {

  const login = async (email, password) => {
    return axios.post(apiEndpoint + '/login', {
      email: email,
      password: password
    }).then((response) => {
      userIsAuthenticated.value = response.status >= 200 && response.status < 300
    })
  }

  const logout = async () => {
    await axios.post(apiEndpoint + '/logout')
    userIsAuthenticated.value = false
  }

  const checkIfAuthenticated = async () => {
      try {
        const response = await axios.get(apiEndpoint + '/authenticated')
        userIsAuthenticated.value = response.status >= 200 && response.status < 300
      } catch (error) {
        userIsAuthenticated.value = false
      }
  }

  const fetchCsrf = async () => {
    return axios.get(sanctumEndpoint + '/sanctum/csrf-cookie')
  }

  const router = useRouter()
  const route = useRoute()

  const redirectRoot = () => {
    return userIsAuthenticated.value && route.path === '/login';
  }

  const redirectLogin = () => {
    return !userIsAuthenticated.value && route.path !== '/login';
  }

  watchEffect(() => {
    if (redirectRoot()) {
      router.push('/')
    } else if (redirectLogin()) {
      router.push('/login')
    }
    localStore.set('authenticated', userIsAuthenticated.value)
  })

  return {
    login,
    logout,
    fetchCsrf,
    checkIfAuthenticated,
    userIsAuthenticated
  }
}


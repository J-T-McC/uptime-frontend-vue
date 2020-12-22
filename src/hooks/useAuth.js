import { axios, apiEndpoint, sanctumEndpoint } from '@/helpers/api.js'

import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useLocalStore from '@/hooks/useLocalStore.js'
const localStore = useLocalStore('auth')
const user = ref(localStore.get('user', false))

export function useAuth () {
  const authRoutes = ['/login', '/register']
  const router = useRouter()
  const route = useRoute()

  const checkIfAuthenticated = () => {
    return axios
      .get(apiEndpoint + '/authenticated')
      .then(({ data }) => user.value = data.data ?? null)
      .catch(() => {
        user.value = false
      })
  }

  const isAuthRoute = () => {
    return authRoutes.includes(route.path)
  }

  const login = (data) => {
    return axios
      .post(apiEndpoint + '/login', data)
      .then(() => checkIfAuthenticated())
  }

  const register = (data) => {
    return axios.post(apiEndpoint + '/register', data)
  }

  const logout = () => {
    return axios.post(apiEndpoint + '/logout').then(() => {
      user.value = false
    })
  }

  const fetchCsrf = () => {
    return axios.get(sanctumEndpoint + '/sanctum/csrf-cookie')
  }

  const resendVerificationEmail = () => {
    return axios.post(apiEndpoint + '/email/verification-notification')
  }

  const userIsAuthenticated = () => {
    return user.value
  }

  const userIsVerified = () => {
    return user.value.email_verified_at ?? false
  }

  const shouldRedirectRoot = () => {
    return userIsAuthenticated() && userIsVerified() && isAuthRoute()
  }

  const shouldRedirectLogin = () => {
    return !userIsAuthenticated() && !isAuthRoute()
  }

  watchEffect(() => {
    localStore.set('user', user.value)
    if (shouldRedirectRoot()) {
      router.push('/')
    } else if (shouldRedirectLogin()) {
      router.push('/login')
    }
  })

  return {
    login,
    register,
    logout,
    fetchCsrf,
    checkIfAuthenticated,
    resendVerificationEmail,

    isAuthRoute,
    userIsAuthenticated,
    userIsVerified,
  }
}


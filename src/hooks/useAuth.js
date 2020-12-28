import { axios, apiEndpoint, sanctumEndpoint } from '@/helpers/api.js'

import { ref, watchEffect, readonly } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useLocalStore from '@/hooks/useLocalStore.js'
const localStore = useLocalStore('auth')
const user = ref(localStore.get('user', false))
const readOnlyUser = readonly(user)

export function useAuth () {
  const router = useRouter()
  const route = useRoute()

  // get user info if authenticated
  const checkIfAuthenticated = () => {
    return axios
      .get(apiEndpoint + '/authenticated')
      .then(({ data }) => user.value = data.data ?? null)
      .catch(() => {
        user.value = false
      })
  }

  // laravel sanctum stateful SPA authentication uses CSRF protection
  // fetch a new csrf token/cookie via sanctum endpoint
  const fetchCsrf = () => {
    return axios.get(sanctumEndpoint + '/sanctum/csrf-cookie')
  }

  // auth route must be set in route meta property
  // @/router/auth.js
  const isAuthRoute = () => {
    return route.meta.auth ?? false
  }

  // default laravel fortify endpoints
  const login = (data) => {
    return axios
      .post(apiEndpoint + '/login', data)
      .then(() => checkIfAuthenticated())
  }

  const register = (data) => {
    return axios.post(apiEndpoint + '/register', data)
  }

  const verifyEmail = async (id, hash, params) => {
    return axios.get(apiEndpoint + `/email/verify/${id}/${hash}`, {
      params
    })
  }

  const forgotPassword = (data) => {
    return axios.post(apiEndpoint + '/forgot-password', data)
  }

  const resetPassword = (data) => {
    return axios.post(apiEndpoint + '/reset-password', data)
  }

  const updatePassword = (data) => {
    return axios.put(apiEndpoint + '/user/password', data)
  }

  const updateProfile = (data) => {
    return axios.put(apiEndpoint + '/user/profile-information', data)
  }

  const logout = () => {
    return axios.post(apiEndpoint + '/logout').then(() => {
      user.value = false
    })
  }

  const resendVerificationEmail = () => {
    return axios.post(apiEndpoint + '/email/verification-notification')
  }

  // helper methods
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
    return (!userIsAuthenticated() || !userIsVerified()) && !isAuthRoute()
  }

  // update local store on user change
  // redirect if user is no longer valid/becomes valid
  watchEffect(() => {
    localStore.set('user', user.value)
    if(route.name) {
      if (shouldRedirectRoot()) {
        router.push('/')
      } else if (shouldRedirectLogin()) {
        router.push('/login')
      }
    }
  })

  return {
    readOnlyUser,

    fetchCsrf,
    register,
    verifyEmail,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updatePassword,
    updateProfile,
    resendVerificationEmail,
    checkIfAuthenticated,
    isAuthRoute,
    userIsAuthenticated,
    userIsVerified,
  }
}


import { ref, watchEffect, readonly } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useLocalStore from '@/hooks/useLocalStore.js'
import AuthService from '@/services/AuthService'

const Auth = AuthService()
const localStore = useLocalStore('auth')
const user = ref(localStore.get('user', false))
const readOnlyUser = readonly(user)

export function useAuth () {
  const router = useRouter()
  const route = useRoute()

  // get user info if authenticated
  const checkIfAuthenticated = () => {
    return Auth
      .checkIfAuthenticated()
      .then(({ data }) => user.value = data.data ?? null)
      .catch(() => {
        user.value = false
      })
  }

  // auth route must be set in route meta property
  // @/router/auth.js
  const isAuthRoute = () => {
    return route.meta.auth ?? false
  }

  // default laravel fortify endpoints
  const login = (data) => {
    return Auth.login(data).then(() => checkIfAuthenticated())
  }

  const logout = () => {
    return Auth.logout().then(() => {
      user.value = false
    })
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
    login,
    logout,
    checkIfAuthenticated,
    fetchCsrf: Auth.fetchCsrf,
    register: Auth.register,
    verifyEmail: Auth.verifyEmail,
    forgotPassword: Auth.forgotPassword,
    resetPassword: Auth.resetPassword,
    updatePassword: Auth.updatePassword,
    updateProfile: Auth.updateProfile,
    resendVerificationEmail: Auth.resendVerificationEmail,
    isAuthRoute,
    userIsAuthenticated,
    userIsVerified,
    shouldRedirectRoot,
    user,
  }
}


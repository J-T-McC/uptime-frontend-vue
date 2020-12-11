import axios from '@/helpers/axios.js'
import store from '@/stores/state'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const userIsAuthenticated = ref(false)

export function useAuth () {

  const login = async (email, password) => {
    return axios.post(store.state.api + '/login', {
      email: email,
      password: password
    }).then((response) => {
      userIsAuthenticated.value = response.status >= 200 && response.status < 300
    })
  }

  const logout = async () => {
    await axios.post(store.state.api + '/logout');
    userIsAuthenticated.value = false
  }

  const checkIfAuthenticated = async () => {
    const response = await axios.get(store.state.api + '/authenticated');
    userIsAuthenticated.value = response.status >= 200 && response.status < 300
  }

  const fetchCsrf = async () => {
    return axios.get(store.state.auth + '/sanctum/csrf-cookie')
  }

  const router = useRouter()

  watchEffect(() => {
    if(userIsAuthenticated.value) {
      router.push('/')
    }
    else if(!userIsAuthenticated.value) {
      router.push('/login')
    }
  })

  return {
    login,
    logout,
    fetchCsrf,
    checkIfAuthenticated,
    userIsAuthenticated
  }
}


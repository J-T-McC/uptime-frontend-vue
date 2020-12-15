<template>
  <div class="flex justify-center items-center h-screen px-6">
    <div class="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
      <div class="flex justify-center items-center">
        <fire class="h-10 w-10 text-blue-500"></fire>
        <span class="text-gray-700 font-semibold text-2xl">V-Dashboard</span>
      </div>
      <v-form :config="registerForm" class="mt-4" @form:submit="register">
        <div class="mt-6">
          <button
              type="submit"
              class="py-2 px-4 text-center bg-blue-500 rounded-md w-full text-white text-sm hover:bg-indigo-400">
            Sign in
          </button>
        </div>
      </v-form>

      <div class="flex justify-between items-start mt-4">
        <router-link to="/login">
          <a class="block text-sm fontme text-blue-400 hover:underline" href="#">Return to login</a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuth } from '@/hooks/useAuth.js'
import { VForm } from '@/components/form'
import { registerForm } from '@/helpers/forms.js'
import { Fire } from 'heroicons/vue/solid'
import { toastError } from '@/helpers/resource'
import {useRouter} from 'vue-router'

export default {
  components: {
    VForm,
    Fire
  },
  setup () {
    const auth = useAuth()
    const email = ref('test@example.com')
    const password = ref('password')

    const router = useRouter()

    const register = (result) => {
      auth.fetchCsrf().then(() => {
        auth.register(result).then(() => {
          router.push('/login')
        }).catch(toastError)
      })
    }

    return {
      register,
      email,
      password,
      registerForm: registerForm()
    }
  },
}
</script>
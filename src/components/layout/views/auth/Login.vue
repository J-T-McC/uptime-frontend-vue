<template>
  <div class="flex justify-center items-center h-screen px-6">
    <div class="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
      <div class="flex justify-center items-center">
        <fire class="h-10 w-10 text-blue-500"></fire>
        <span class="text-gray-700 font-semibold text-2xl">V-Dashboard</span>
      </div>

      <div v-if="showVerify" class="prose pt-5">
        <p>
          A verification email was sent to you. Please check your email and follow the instructions to validate your account.
        </p>

        <button @click="requestVerify" class="py-2 px-4 text-center bg-blue-500 rounded-md w-full text-white text-sm hover:bg-indigo-400">
          Request a new email
        </button>
      </div>

      <v-form :config="loginForm" class="mt-4" @form:submit="login">
        <div class="flex justify-between items-center mt-4">
          <router-link to="/register">
            <a class="block text-sm fontme text-blue-400 hover:underline" href="#">Register</a>
          </router-link>
          <div>
            <a class="block text-sm fontme text-blue-400 hover:underline" href="#">Forgot your password?</a>
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" class="py-2 px-4 text-center bg-blue-500 rounded-md w-full text-white text-sm hover:bg-indigo-400">
            Sign in
          </button>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuth } from '@/hooks/useAuth.js'
import { VForm } from '@/components/form'
import { loginForm } from '@/helpers/forms.js'
import { Fire } from 'heroicons/vue/solid'
import { useToast } from 'vue-toastification'

export default {
  components: {
    VForm,
    Fire
  },
  setup () {
    const auth = useAuth()
    const email = ref('test@example.com')
    const password = ref('password')
    const showVerify = ref(false)

    const login = (result) => {
      auth.fetchCsrf().then(() =>  auth.login(result)).then(() => {
        showVerify.value = auth.userIsAuthenticated() && !auth.userIsVerified();
      })
    }

    const toast = useToast()
    const requestVerify = () => {
      auth.resendVerificationEmail().then(() => toast.info('Verification email sent'))
    }

    return {
      login,
      requestVerify,
      email,
      password,
      showVerify,
      loginForm: loginForm()
    }
  },
}
</script>
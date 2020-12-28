<template>
  <div class="flex justify-center items-center h-full px-6">
    <div class="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
      <div class="flex justify-center items-center">
        <logo></logo>
        <span class="text-gray-700 font-semibold text-2xl">Uptime</span>
      </div>

      <div v-if="showVerify" class="prose pt-5">
        <p>
          A verification email was sent to you. Please check your email and follow the instructions to validate your
          account.
        </p>

        <button @click="requestVerify"
                class="py-2 px-4 text-center bg-blue-500 rounded-md w-full text-white text-sm hover:bg-indigo-400">
          Request a new email
        </button>
      </div>

      <v-form :config="loginForm" class="mt-4" @form:submit="login">
        <template v-slot:submit>
          <div class="mt-6">
            <button type="submit"
                    class="py-2 px-4 text-center bg-blue-500 rounded-md w-full text-white text-sm hover:bg-indigo-400">
              Sign in
            </button>
          </div>
        </template>
      </v-form>

      <div class="flex justify-between items-center mt-4">
        <router-link to="/register">
          <a class="block text-sm fontme text-blue-400 hover:underline" href="#">Register</a>
        </router-link>

        <router-link to="/forgot-password">
          <a class="block text-sm fontme text-blue-400 hover:underline" href="#">Forgot your password?</a>
        </router-link>
      </div>

      <spinner v-if="showSpinner"></spinner>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useAuth } from '@/hooks/useAuth.js'
import { VForm } from '@/components/form'
import { loginForm } from '@/helpers/forms.js'
import { useToast } from 'vue-toastification'
import Logo from '@/components/svg/Logo'
import { toastMessage } from '@/helpers/toast'
import { useRoute } from 'vue-router'
import Spinner from '@/components/Spinner'

export default {
  components: {
    Spinner,
    Logo,
    VForm,
  },
  setup () {
    const auth = useAuth()
    const route = useRoute()
    const showVerify = ref(false)
    const showSpinner = ref(false)

    watch(auth.readOnlyUser, () => {
      if(
          auth.userIsAuthenticated() &&
          !auth.userIsVerified() &&
          route.params.id &&
          route.params.hash
      ) {
        showSpinner.value = true
        auth.verifyEmail(encodeURI(route.params.id), route.params.hash, route.query).then(() => {
          //confirm user is now verified and authenticated
          //will redirect on success
          auth.checkIfAuthenticated().then(() => {
            showSpinner.value = false
          })
        }).catch(toastMessage)
      }
    })

    const login = (result) => {
      showSpinner.value = true
      auth.fetchCsrf().then(() => auth.login(result).catch(toastMessage)).then(() => {
        showVerify.value = auth.userIsAuthenticated() && !auth.userIsVerified() && !route.params.id
        showSpinner.value = false
      })
    }

    const toast = useToast()
    const requestVerify = () => {
      showSpinner.value = true
      auth.resendVerificationEmail().then(() => {
        showSpinner.value = false
        toast.info('Verification email sent')
      }).catch(toastMessage)
    }

    return {
      login,
      requestVerify,
      showVerify,
      showSpinner,
      loginForm: loginForm()
    }
  },
}
</script>
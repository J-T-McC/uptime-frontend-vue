<template>
  <div class="flex justify-center items-center h-full px-6">
    <div class="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
      <div class="flex justify-center items-center">
        <logo></logo>
        <span class="text-gray-700 font-semibold text-2xl">Uptime</span>
      </div>
      <v-form :config="forgotPasswordForm" class="mt-4" @form:submit="forgotPassword">
        <template v-slot:submit>
          <div class="mt-6">
            <button
                type="submit"
                class="py-2 px-4 text-center bg-blue-500 rounded-md w-full text-white text-sm hover:bg-blue-400">
              Submit
            </button>
          </div>
        </template>
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
import { forgotPasswordForm } from '@/helpers/forms.js'
import { toastMessage } from '@/helpers/toast'
import {useRouter} from 'vue-router'
import Logo from '@/components/svg/Logo'

export default {
  components: {
    Logo,
    VForm,
  },
  setup () {
    const auth = useAuth()
    const email = ref('test@example.com')
    const password = ref('password')

    const router = useRouter()

    const forgotPassword = (result) => {
      auth.fetchCsrf().then(() => {
        auth.forgotPassword(result).then((response) => {
          toastMessage(response)
          router.push('/login')
        }).catch(toastMessage)
      })
    }

    return {
      forgotPassword,
      email,
      password,
      forgotPasswordForm: forgotPasswordForm()
    }
  },
}
</script>
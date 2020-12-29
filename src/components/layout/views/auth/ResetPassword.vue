<template>
  <div class="flex justify-center items-center h-full px-6">
    <div class="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
      <div class="flex justify-center items-center">
        <logo></logo>
        <span class="text-gray-700 font-semibold text-2xl">Uptime</span>
      </div>

      <v-form :config="resetPasswordFormConfig" class="mt-4" @form:submit="resetPassword">
        <template v-slot:submit>
          <div class="mt-6">
            <button type="submit"
                    class="py-2 px-4 text-center bg-blue-500 rounded-md w-full text-white text-sm hover:bg-blue-400">
              Sign in
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
import { useAuth } from '@/hooks/useAuth.js'
import { VForm } from '@/components/form'
import { resetPasswordForm } from '@/helpers/forms.js'
import { toastMessage } from '@/helpers/toast'
import { useRouter, useRoute } from 'vue-router'
import Logo from '@/components/svg/Logo'

export default {
  components: {
    Logo,
    VForm,
  },
  setup () {
    const auth = useAuth()
    const router = useRouter()
    const route = useRoute()
    const token = route.params.token
    const resetPasswordFormConfig = resetPasswordForm()

    resetPasswordFormConfig.inputs.map((item) => {
      if (item.name === 'token') {
        item.value = token
      }
      return item
    })

    const resetPassword = (result) => {
      auth.fetchCsrf().then(() => {
        auth.resetPassword(result).then((response) => {
          toastMessage(response)
          router.push('/login')
        }).catch(toastMessage)
      })
    }

    return {
      resetPasswordFormConfig,
      resetPassword,
    }
  },
}
</script>
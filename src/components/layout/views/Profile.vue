<template>
  <div class="flex flex-col mt-3 lg:mt-8">
    <div class="container">
      <div class="flex flex-wrap">
        <container class="md:w-1/2">
          <template v-slot:header>
            Update Password
          </template>
          <template v-slot:body>
            <v-form :config="updatePasswordFormConfig" @form:submit="updatePassword"></v-form>
          </template>
        </container>

        <container class="md:w-1/2">
          <template v-slot:header>
            Profile
          </template>
          <template v-slot:body>
            <v-form :config="updateProfileFormConfig" @form:submit="updateProfile"></v-form>
          </template>
        </container>
      </div>
    </div>
  </div>
</template>
<script>

import { useAuth } from '@/hooks/useAuth'
import { updatePasswordForm, updateProfileForm } from '@/helpers/forms'
import { VForm } from '@/components/form'
import Container from '@/components/card/Container'
import { toast, toastMessage } from '@/helpers/toast'

export default {
  name: 'Profile',
  components: { VForm, Container },
  setup () {
    const auth = useAuth()
    const user = auth.readOnlyUser
    const updatePasswordFormConfig = updatePasswordForm()
    const updateProfileFormConfig = updateProfileForm()

    updateProfileFormConfig.inputs.map((item) => {
      if(item.name in user.value) {
        item.value = user.value[item.name]
      }
      return item
    })

    const updatePassword = (data) => {
      auth.updatePassword(data).then(() => {
        //laravel fortify update password return empty string on success...
        toast.info('Password Updated')
      }).catch(toastMessage)
    }

    const updateProfile = (data) => {
      auth.updateProfile(data).then(() => {
        toast.info('Profile Updated')
        //poll user to confirm if we need to force verification
        auth.checkIfAuthenticated()
      }).catch(toastMessage)
    }

    return {
      updatePasswordFormConfig,
      updateProfileFormConfig,
      updatePassword,
      updateProfile
    }
  }
}
</script>

<style scoped>

</style>
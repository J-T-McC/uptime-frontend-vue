<template>
  <div>
    <div class="mt-8">
      <div class="flex flex-col mt-6">
        <div class="mt-8">
          <div class="mt-4">
            <div class="p-6 bg-white rounded-md shadow-md">
              <form @submit.prevent="submit">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  <text-input v-model:value="form.url" label="URL"></text-input>
                  <text-input v-model:value="form.look_for_string" label="Check for string in result"></text-input>
                </div>

                <toggle v-model:value="form.uptime_check_enabled" label="Enable Uptime Check"></toggle>
                <toggle v-model:value="form.certificate_check_enabled" label="Enable Certificate Check"></toggle>

<!--                <input type="checkbox" v-model="form.uptime_check_enabled" class="rounded text-blue-500" /> Enable Uptime Check-->
<!--                <input type="checkbox" v-model="form.certificate_check_enabled" class="rounded text-blue-500" /> Enable SSL Check-->
<!--            -->
                <div class="flex justify-end mt-4">
                  <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useResource from '@/hooks/useResource'
import { reactive } from 'vue'
import TextInput from '@/components/form/TextInput'
import Toggle from '@/components/form/Toggle'
export default {
  name: 'CreateMonitor',
  components: {
    TextInput,
    Toggle
  },
  setup () {
    const resource = useResource('monitors')
    const submit = () => {
      resource.store(form).then((result) => {
        console.log(result)
      })
    }
    const form = reactive({
      url: 'https://petitephotography.ca',
      uptime_check_enabled: true,
      certificate_check_enabled: false,
      look_for_string: null,
    })
    return {
      form,
      submit
    }
  }
}
</script>

<style scoped>

</style>
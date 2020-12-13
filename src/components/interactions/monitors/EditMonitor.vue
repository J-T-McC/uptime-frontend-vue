<template>
  <modal ref="modalRef">

    <template v-slot:header>
      Edit Monitor
    </template>

    <template v-slot:body>
      <v-form :config="monitorFormWithValues" @form:submit="confirm">
        <div class="flex justify-end mt-4">
          <button type="submit" class="btn btn-md btn-blue font-normal">
            Save
          </button>
        </div>
      </v-form>
    </template>

    <template v-slot:footer>
      <!-- clear default footer -->
      <span></span>
    </template>

    <template v-slot:toggle>
      <a @click="$refs.modalRef.show" href="#">
        <svg class='text-blue-500 h-5 w-5 m-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <title>Edit Monitor</title>
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
        </svg>
      </a>
    </template>

  </modal>
</template>

<script>
import useResource from '@/hooks/useResource'
import { ref } from 'vue'
import VForm from '@/components/form/VForm'
import { monitorForm } from '@/helpers/forms.js'

export default {
  name: 'EditMonitor',
  emits: ['monitor:updated'],
  components: { VForm,},
  props: {monitor: Object},
  setup (props, { emit }) {

    const modalRef = ref(null)
    const monitorFormWithValues = monitorForm()

    //set default form values to our target monitors values
    monitorFormWithValues.inputs = monitorFormWithValues.inputs.map((formInput) => {
      const key = formInput.name === 'url' ? 'raw_url' : formInput.name
      formInput.value = props.monitor[key] ?? null
      return formInput
    })

    const resource = useResource('monitors')

    const submit = async (form) => {
      return resource.update(props.monitor.id, form).then((result) => {
        console.log(result)
      }).catch((error) => {
        //failed
        console.log(error)
      })
    }

    const confirm = (form) => {
      submit(form).then((response) => {
        modalRef.value.toggleModal()
        emit('monitor:updated', response)
      })
    }

    return {
      confirm,
      modalRef,
      monitorFormWithValues
    }
  }
}
</script>

<style scoped>

</style>
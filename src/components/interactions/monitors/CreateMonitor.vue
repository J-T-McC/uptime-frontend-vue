<template>
  <modal ref="modalRef">

    <template v-slot:header>
      Create a New Monitor
    </template>

    <template v-slot:body>
      <v-form :config="monitorForm" @form:submit="confirm">
        <div class="flex justify-end mt-4">
          <button type="submit" class="btn btn-md btn-blue font-normal">
            Save
          </button>
        </div>
      </v-form>
    </template>

    <template v-slot:toggle>
      <button class="btn btn-sm btn-white text-blue-800 font-bold m-auto" @click="$refs.modalRef.toggleModal">
        Add New
      </button>
    </template>

    <template v-slot:footer>
      <!-- clear default footer -->
      <span></span>
    </template>

  </modal>
</template>

<script>
import useResource from '@/hooks/useResource'
import { ref } from 'vue'
import VForm from '@/components/form/VForm'
import { monitorForm } from '@/helpers/forms.js'

export default {
  name: 'CreateMonitor',
  components: { VForm,},
  emits: ["monitor:created"],
  setup (props, { emit }) {
    const modalRef = ref(null);
    const resource = useResource('monitors')

    const submit = async (form) => {
      return resource.store(form).then((result) => {
        console.log(result)
      }).catch((error) => {
        //failed
        console.log(error)
      })
    }

    const confirm = (form) => {
      submit(form).then((response) => {
        modalRef.value.toggleModal()
        emit('monitor:created', response)
      })
    }

    return {
      confirm,
      modalRef,
      monitorForm: monitorForm()
    }
  }
}
</script>
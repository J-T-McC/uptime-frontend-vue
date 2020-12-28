<template>
  <modal ref="modalRef">

    <template v-slot:header>
      {{ header }}
    </template>

    <template v-slot:body>
      <v-form :config="resourceFormWithValues" @form:submit="confirm"></v-form>
    </template>

    <template v-slot:footer>
      <!-- clear default footer -->
      <span></span>
    </template>

    <template v-slot:toggle>
      <a @click="$refs.modalRef.show" href="#">
        <pencil-alt class='text-blue-400 w-4 h-4 '></pencil-alt>
      </a>
    </template>

  </modal>
</template>

<script>
import { VForm } from '@/components/form'
import { PencilAlt } from 'heroicons/vue/outline'
import useResource from '@/hooks/useResource'
import { ref } from 'vue'
import { toastMessage } from '@/helpers/toast'
import { useToast } from 'vue-toastification'

export default {
  name: 'EditResource',
  emits: ['resource:updated'],
  components: { VForm, PencilAlt },
  props: {
    resourceName: String,
    resource: Object,
    header: String,
    resourceForm: Function
  },
  setup (props, { emit }) {

    const modalRef = ref(null)

    const resourceFormWithValues = props.resourceForm()

    //set default form values to our target monitors values
    resourceFormWithValues.inputs = resourceFormWithValues.inputs.map((formInput) => {
      formInput.value = props.resource[formInput.name] ?? null
      return formInput
    })

    const resourceApi = useResource(props.resourceName)

    const submit = async (form) => {
      return resourceApi.update(props.resource.id, form)
    }

    const confirm = (form) => {
      submit(form).then((response) => {
        modalRef.value.toggleModal()
        useToast().info("Resource updated")
        emit('resource:updated', response)
      }).catch(toastMessage)
    }

    return {
      confirm,
      modalRef,
      resourceFormWithValues
    }
  }
}
</script>

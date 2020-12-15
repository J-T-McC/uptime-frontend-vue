<template>
  <modal ref="modalRef">

    <template v-slot:header>
      {{ header }}
    </template>

    <template v-slot:body>
      <v-form :config="resourceFormWithValues" @form:submit="confirm">
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
        <pencil-alt class='text-blue-400 h-5 w-5'></pencil-alt>
      </a>
    </template>

  </modal>
</template>

<script>
import { VForm } from '@/components/form'
import { PencilAlt } from 'heroicons/vue/outline'
import useResource from '@/hooks/useResource'
import { ref } from 'vue'
import { toastError } from '@/helpers/resource'
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
      }).catch(toastError)
    }

    return {
      confirm,
      modalRef,
      resourceFormWithValues
    }
  }
}
</script>

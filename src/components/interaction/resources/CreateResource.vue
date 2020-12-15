<template>
  <modal ref="modalRef">

    <template v-slot:header>
      {{ header }}
    </template>

    <template v-slot:body>
      <v-form :config="resourceForm()" @form:submit="confirm">
        <div class="flex justify-end mt-4">
          <button type="submit" class="btn btn-md btn-blue font-normal">
            Save
          </button>
        </div>
      </v-form>
    </template>

    <template v-slot:toggle>
      <a href="#" class="inline-block text-blue-500" @click="$refs.modalRef.toggleModal">
        <view-grid-add class="h-7 w-7 inline-block"></view-grid-add>
        <slot>Create</slot>
      </a>
    </template>

    <template v-slot:footer>
      <!-- clear default footer -->
      <span></span>
    </template>

  </modal>
</template>

<script>
import useResource from '@/hooks/useResource'
import { VForm } from '@/components/form'
import { ViewGridAdd } from 'heroicons/vue/outline'
import { toastError } from '@/helpers/resource'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

export default {
  name: 'CreateResource',
  components: { VForm, ViewGridAdd },
  emits: ['resource:created'],
  props: {
    resourceName: String,
    header: String,
    resourceForm: Function
  },
  setup (props, { emit }) {
    const modalRef = ref(null)
    const resource = useResource(props.resourceName)
    const submit = (form) => {
      return resource.store(form)
    }

    const confirm = (form) => {
      submit(form).then((response) => {
        modalRef.value.toggleModal()
        useToast().info("Resource created")
        emit('resource:created', response)
      }).catch(toastError)
    }

    return {
      confirm,
      modalRef,
    }
  }
}
</script>
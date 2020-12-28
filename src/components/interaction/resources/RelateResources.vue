<template>
  <modal ref="modalRef">

    <template v-slot:header>
      {{ header }}
    </template>

    <template v-slot:body>
      <v-form :config="resourceForm" @form:submit="confirm">
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
        <link-icon class='text-blue-500 w-4 h-4 ' />
      </a>
    </template>

  </modal>
</template>

<script>
import { VForm } from '@/components/form'
import { Link as LinkIcon } from 'heroicons/vue/outline'
import useResource from '@/hooks/useResource'
import { ref } from 'vue'
import { toastMessage } from '@/helpers/toast'
import { useToast } from 'vue-toastification'

export default {
  name: 'RelateResources',
  emits: ['resource:updated'],
  components: { VForm, LinkIcon },
  props: {
    resourceName: String,
    header: String,
    resourceForm: Object,
    resource: Object,
  },
  setup (props, { emit }) {
    const modalRef = ref(null)
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
    }
  }
}
</script>

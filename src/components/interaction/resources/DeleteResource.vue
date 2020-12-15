<template>
  <modal ref="modalRef" @modal:accept="deleteResource">

    <template v-slot:header>
      {{ header }}
    </template>

    <template v-slot:body>
      <p class="text-lg">Are you sure you want to delete this item?</p>
    </template>

    <template v-slot:toggle>
      <a @click="$refs.modalRef.show" href="#">
        <trash class="text-gray-600 w-5 h-5"></trash>
      </a>
    </template>

  </modal>
</template>

<script>
import useResource from '@/hooks/useResource'
import { Trash } from 'heroicons/vue/outline'
import { useToast } from 'vue-toastification'

export default {
  name: 'DeleteResource',
  emits: ['resource:deleted'],
  components: { Trash },
  props: {
    resourceName: String,
    resource: Object,
    header: String
  },
  setup (props, { emit }) {
    const resource = useResource(props.resourceName)
    const deleteResource = () => {
      resource.destroy(props.resource.id).then(() => {
        useToast().info("Resource deleted")
        emit('resource:deleted')
      })
    }
    return {
      deleteResource
    }
  }
}
</script>
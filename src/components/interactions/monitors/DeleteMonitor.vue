<template>
  <modal ref="modalRef" @modal:accept="deleteMonitor">

    <template v-slot:header>
      Edit Monitor
    </template>

    <template v-slot:body>
      <p class="text-lg">Are you sure you want to delete <span class="text-blue-500">{{ monitor.raw_url }}</span>?</p>
    </template>

    <template v-slot:toggle>
      <a @click="$refs.modalRef.show" href="#">
        <svg class="text-red-500 w-5 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <title>Delete Monitor</title>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      </a>
    </template>

  </modal>
</template>

<script>
import useResource from '@/hooks/useResource'

export default {
  name: 'DeleteMonitor',
  emits: ['monitor:deleted'],
  props: { monitor: Object },
  setup (props, { emit }) {
    const resource = useResource('monitors')
    const deleteMonitor = () => {
      resource.destroy(props.monitor.id).then(() => {
        emit('monitor:deleted')
      })
    }
    return {
      deleteMonitor
    }
  }
}
</script>

<style scoped>

</style>
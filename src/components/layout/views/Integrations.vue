<template>
  <div>
    <div class="mt-8">
      <div class="flex flex-col mt-6">
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {{channels}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useResource from '@/hooks/useResource'
import { ref } from 'vue'

export default {
  components: {
  },
  setup () {
    const resource = useResource('channels')
    const channels = ref([])

    const pollResources = () => {
      resource.index().then((response) => {
        channels.value = response.data.data
      })
    }

    pollResources()

    const showModal = ref(false)

    return {
      channels,
      showModal,
      pollResources
    }
  },
}
</script>
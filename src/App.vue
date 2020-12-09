<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const defaultLayout = 'default'

export default {
  name: 'App',
  components: {},
  setup () {
    const { currentRoute } = useRouter()
    const layout = computed(() => `${currentRoute.value.meta.layout || defaultLayout}-layout`)
    return {
      layout
    }
  }
}
</script>

<style>

</style>

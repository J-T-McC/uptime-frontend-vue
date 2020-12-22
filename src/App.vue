<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ViewHeader from '@/components/PageHeader'
import { useAuth } from '@/hooks/useAuth'

const defaultLayout = 'default'

export default {
  name: 'App',
  components: {
    ViewHeader
  },
  setup () {
    const { currentRoute } = useRouter()
    const auth = useAuth()

    auth.checkIfAuthenticated()

    const layout = computed(() => `${currentRoute.value.meta.layout || defaultLayout}-layout`)
    return {
      layout
    }
  }
}
</script>

<style>

</style>

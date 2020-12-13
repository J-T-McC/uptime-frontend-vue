<template>
  <component :is="layout">
    <view-header v-if="layout === 'default-layout'">
      {{$route.name}}
    </view-header>
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
    const auth = useAuth()
    auth.checkIfAuthenticated()
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

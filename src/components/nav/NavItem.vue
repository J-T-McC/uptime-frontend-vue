<template>
  <router-link
      class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
      :to="path">

    <component class="w-4 h-4" v-if="icon" :is="icon"></component>

    <span class="mx-4">{{ name }}</span>
  </router-link>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    name: {
      required: true,
      type: String
    },
    path: {
      required: true,
      type: String
    },
    icon: {
      default: null
    }
  }
}
</script>

<style scoped>

</style>
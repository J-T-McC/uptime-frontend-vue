<template>
  <div class="w-full px-3 sm:w-1/2 xl:w-1/3 mb-5">
    <div class="flex items-center px-5 py-3 shadow-sm rounded-md bg-white relative">

      <div class="absolute top-2 right-2">
        <slot name="header"></slot>
      </div>

      <div class="p-3 rounded-full text-blue-400 bg-opacity-75">
          <component class="h-14 w-14" :is="icon"></component>
      </div>

      <div class="mx-5">
        <h4 class="font-semibold text-gray-700 capitalize">{{ title }}</h4>
        <div class="text-gray-500">{{ description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicCard',
  props: {
    icon: {
      default: null
    },
    title: String,
    description: String,
  },
}
</script>

<style scoped>

</style>
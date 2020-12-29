<template>
  <div class="w-full lg:px-2 mb-2 mt-2">
    <div class="flex items-center lg:px-2 pt-1 pb-1 shadow-sm rounded-md bg-white relative">

      <div class="absolute top-2 right-2">
        <slot name="header"></slot>
      </div>

      <div class="p-2 lg:p-3 rounded-full text-blue-400 bg-opacity-75">
        <slot name="icon">
          <component class="h-14 w-14" :is="icon"></component>
        </slot>
      </div>

      <div class="md:mx-5 min-w-0">
        <slot name="title">
          <h4 class="font-semibold text-gray-700 capitalize ">{{ title }}</h4>
        </slot>
        <slot name="description">
          <div class="text-gray-500">{{ description }}</div>
        </slot>
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
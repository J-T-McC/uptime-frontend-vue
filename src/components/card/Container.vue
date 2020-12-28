<template>
  <div class="flex content-center w-full relative">
    <div class="bg-white w-full m-1 lg:m-3 rounded border shadow-md">
      <h2 class="p-5 border-b text-gray-900 text-xl">
        <slot name="header"></slot>
      </h2>
      <div class="p-3" v-if="!hideBody">
        <slot name="body"></slot>
      </div>
      <spinner v-if="loading"></spinner>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'

export default {
  name: 'Container',
  components: { Spinner },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    hideBody: {
      default: false,
      type: Boolean
    }
  },
}
</script>

<template>
  <div class="mt-8" v-if="meta" v-show="buttons.length > 1">
    <div class="mt-4">
      <div class="flex rounded-md bg-white py-4 px-4 overflow-x-auto">
        <div class="flex rounded mr-4">

          <button
             @click="emitNav(meta.current_page-1)"
             class="py-2 px-3 leading-tight bg-white border border-gray-200 text-blue-500 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white">
            <span>
              &lt;
            </span>
          </button>

          <button v-if="showGoToFirst"
                  @click="emitNav(1)"
                  class="py-2 px-3 leading-tight bg-white border border-gray-200 text-blue-500 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white">
            <span>...</span>
          </button>

          <button v-for="page in buttons" :key="page" href="#"
             @click="emitNav(page)"
             :class="{active: page === meta.current_page}"
             class="py-2 px-3 leading-tight bg-white border border-gray-200 text-blue-500 border-r-0 hover:bg-blue-500 hover:text-white">
            <span>{{ page }}</span>
          </button>

          <button v-if="showGoToLast"
                  @click="emitNav(meta.last_page)"
                  class="py-2 px-3 leading-tight bg-white border border-gray-200 text-blue-500 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white">
            <span>...</span>
          </button>

          <button
             @click="emitNav(meta.current_page+1)"
             class="py-2 px-3 leading-tight bg-white border border-gray-200 text-blue-500 rounded-r hover:bg-blue-500 hover:text-white">
            <span>
              &gt;
            </span>
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, watchEffect, computed } from 'vue'

export default {
  name: 'PaginationButtons',
  emits: ['navigate'],
  props: {
    buttonsShown: {
      default: 7,
      type: Number
    },
    meta: Object,
  },
  setup (props, { emit }) {

    const buttons = ref([])

    watchEffect(() => {
      const endPage = props.meta.last_page
      const currentPage = props.meta.current_page
      const allowedPages = props.buttonsShown > endPage ? endPage : props.buttonsShown;
      const min = 1
      let start = currentPage - Math.floor(allowedPages / 2);
      start = Math.max(start, min);
      start = Math.min(start, min + endPage - allowedPages);
      buttons.value = Array.from({length: allowedPages}, (el, i) => start + i);
    })

    const showGoToFirst = computed(() => {
      return Math.ceil((1 + props.buttonsShown) / 2) < props.meta.current_page
    })

    const showGoToLast = computed(() => {
      return Math.ceil(props.meta.last_page - props.meta.current_page) >= props.buttonsShown / 2
    })

    const emitNav = (page) => {
      if (page && page !== props.meta.current_page && page <= props.meta.last_page) {
        emit('navigate', { page })
      }
    }

    return {
      showGoToFirst,
      showGoToLast,
      emitNav,
      buttons
    }
  }
}
</script>

<style scoped>
  .active {
    @apply bg-blue-500 text-white;
  }
</style>
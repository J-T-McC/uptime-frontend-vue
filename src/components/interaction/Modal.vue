<template>
  <transition name="modal">
    <div v-if="showModal"
         class="
         fixed
         right-0
         top-0
         w-full
         h-full
         z-50
         overflow-hidden
         flex
         items-center
         justify-center
         h-screen
      ">

      <div class="w-full h-full bg-black z-40 opacity-50" @click="close"></div>

      <div class="text-black fixed z-50 w-full md:w-1/2 xl:w-1/3 2xl:1/4 top-2 md:top-1/4 bg-white rounded">

        <div class="w-full">
          <div class="border-b border-gray-300 w-full py-4 px-5 text-left text-2xl font-normal relative">
            <slot name="header"></slot>
            <!-- close icon -->
            <x-circle class="w-5 h-5 text-blue-500 absolute right-4 top-1/3 cursor-pointer" @click="close"></x-circle>
          </div>

          <div class="pt-3 px-5 pb-1 font-normal">
            <slot name="body"></slot>
          </div>

          <div class="px-5 pt-1 pb-3 text-right">
            <slot name="footer">
              <button class="btn btn-md m-2" @click="close">
                Close
              </button>
              <button class="btn btn-md btn-blue m-2" @click="accept">
                Confirm
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <slot name="toggle">
    <button class="btn btn-sm btn-indigo font-bold" @click="show">
      Open Modal
    </button>
  </slot>
</template>

<script>
import { ref } from 'vue'

import {XCircle} from 'heroicons/vue/outline'

export default {
  name: 'Modal',
  emits: ['modal:show', 'modal:accept', 'modal:close'],
  components: {
    XCircle
  },
  setup (props, {emit}) {
    const showModal = ref(false)

    const toggleModal = () => {
      showModal.value = !showModal.value
    }

    const show = () => {
      showModal.value = !showModal.value
      emit('modal:show')
    }

    const accept = () => {
      toggleModal()
      emit('modal:accept')
    }

    const close = () => {
      toggleModal()
      emit('modal:close')
    }

    return {
      showModal,
      toggleModal,
      close,
      accept,
      show
    }
  }
}
</script>

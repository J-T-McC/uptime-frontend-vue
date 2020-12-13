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
            <svg @click="close"
                 class="w-4 h-4 text-blue-500 fill-current absolute right-4 top-1/3 cursor-pointer"
                 x="0px" y="0px" viewBox="0 0 512 512"  xml:space="preserve">
                 <title>Close Modal</title>
                 <path d="M257,0C116.39,0,0,114.39,0,255s116.39,257,257,257s255-116.39,255-257S397.61,0,257,0z M383.22,338.79
                  c11.7,11.7,11.7,30.73,0,42.44c-11.61,11.6-30.64,11.79-42.44,0L257,297.42l-85.79,83.82c-11.7,11.7-30.73,11.7-42.44,0
                  c-11.7-11.7-11.7-30.73,0-42.44l83.8-83.8l-83.8-83.8c-11.7-11.71-11.7-30.74,0-42.44c11.71-11.7,30.74-11.7,42.44,0L257,212.58
                  l83.78-83.82c11.68-11.68,30.71-11.72,42.44,0c11.7,11.7,11.7,30.73,0,42.44l-83.8,83.8L383.22,338.79z"/>
            </svg>

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

export default {
  name: 'Modal',
  emits: ['modal:show', 'modal:accept', 'modal:close'],
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

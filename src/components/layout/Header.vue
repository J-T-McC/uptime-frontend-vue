<template>
  <header class="bg-white w-full shadow-md fixed top-0 z-20">
    <div class="flex justify-between items-center py-4 px-6">
      <div class="flex items-center">
        <!-- Mobile Nav Toggle -->
        <button @click="isOpen = true" class="text-gray-500 focus:outline-none lg:hidden">
          <menu-alt2 class="h-6 w-6"></menu-alt2>
        </button>

        <div class="hidden lg:block lg:flex">
          <logo></logo>
          <span class="text-gray-700 font-semibold text-2xl">Uptime</span>
        </div>
      </div>

      <div class="flex items-center">

        <div class="relative">

          <button
              @click="dropdownOpen = !dropdownOpen">
            <cog class="h-6 w-6 text-blue-500"></cog>
          </button>

          <div
              v-show="dropdownOpen"
              @click="dropdownOpen = false"
              class="fixed inset-0 h-full w-full z-10"
          ></div>

          <div v-show="dropdownOpen"
               class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">

            <router-link to="/profile">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">
                Profile
              </a>
            </router-link>

            <a @click="logout" href="#"
               class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="relative w-full">
      <div class="overflow-hidden h-1 text-xs flex bg-blue-300">
        <div :style="`width: ${progressWidth}%; opacity: ${progressWidth * 0.01}`"
             class="transition-all duration-1000 ease-out shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
        </div>
      </div>
    </div>
  </header>

</template>

<script>
import { ref, watchEffect } from 'vue'
import { useSidebar } from '@/hooks/useSidebar'
import { useAuth } from '@/hooks/useAuth'
import { MenuAlt2, Cog } from 'heroicons/vue/outline'
import useResource from '@/hooks/useResource'
import Logo from '@/components/svg/Logo'

export default {
  components: { Logo, MenuAlt2, Cog },
  setup () {
    const progressWidth = ref(0)
    const { currentRequests } = useResource()

    watchEffect(() => {
      //attempt to get more interesting movement in progress bar
      const denominator = currentRequests.value > 1 ? currentRequests.value : 2
      progressWidth.value = !currentRequests.value ? 100 : Math.round(100 / denominator)
    })

    const auth = useAuth()
    const dropdownOpen = ref(false)
    const { isOpen } = useSidebar()
    return {
      isOpen,
      dropdownOpen,
      progressWidth,
      logout: auth.logout
    }
  },
}
</script>
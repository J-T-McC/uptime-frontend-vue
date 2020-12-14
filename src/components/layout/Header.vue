<template>
  <header class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-blue-500">
    <div class="flex items-center">

      <!-- Mobile Nav Toggle -->
      <button @click="isOpen = true" class="text-gray-500 focus:outline-none lg:hidden">
        <menu-alt2 class="h-6 w-6"></menu-alt2>
      </button>
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

          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">
            Profile
          </a>

          <a @click="logout" href="#"
             class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">
            Log out
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import { useSidebar } from '@/hooks/useSidebar'
import { useAuth } from '@/hooks/useAuth'
import { MenuAlt2, Cog } from 'heroicons/vue/outline'

export default {
  components: { MenuAlt2, Cog },
  setup () {
    const auth = useAuth()
    const dropdownOpen = ref(false)
    const { isOpen } = useSidebar()
    return {
      isOpen,
      dropdownOpen,
      logout: auth.logout
    }
  },
}
</script>
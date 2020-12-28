<template>
  <div class="flex">

    <!-- Backdrop -->
    <div :class="isOpen ? 'block' : 'hidden'"
         @click="isOpen = false"
         class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden">
    </div>
    <!-- End Backdrop -->

    <div :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
         class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0">

      <div class="flex items-center justify-center mt-8 lg:hidden">
        <div class="flex items-center">
          <logo class="bg-white rounded"></logo>
          <span class="text-white text-2xl mx-2 font-semibold">Uptime</span>
        </div>
      </div>

      <nav class="mt-10">
        <nav-item
            v-for="route in routes"
            v-bind:key="route.name"
            :name="route.name"
            :path="route.path"
            :icon="route.meta.icon ?? null"
            :class="[$route.name === route.name ? activeClass : inactiveClass]"
        ></nav-item>
      </nav>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useSidebar } from '@/hooks/useSidebar'
import NavItem from '@/components/nav/NavItem'
import { useRouter } from 'vue-router'
import Logo from '@/components/svg/Logo'

export default {
  components: {
    Logo,
    NavItem
  },
  setup () {
    const router = useRouter()
    const { isOpen } = useSidebar()
    const activeClass = ref('bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100')
    const inactiveClass = ref('border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100')

    const routes = computed(() => router.options.routes.filter((route) => {
      return route.meta && route.meta.sidebar
    }))

    return {
      isOpen,
      activeClass,
      inactiveClass,
      routes
    }
  },
}
</script>
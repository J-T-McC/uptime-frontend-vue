<template>

  <Header />

  <div class="flex h-full bg-gray-200 font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 pb-10 pt-16">
        <div class="container mx-auto lg:px-6 lg:py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
export default {
  components: {
    Header,
    Sidebar,
  },
}
</script>
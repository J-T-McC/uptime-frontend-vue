<template>
  <div class="flex content-center w-full">
    <div class="bg-white w-full m-3 rounded border">
      <h2 class="p-5 border-b text-gray-900 font-semibold text-lg">
        <slot name="header"></slot>
      </h2>
      <div class="p-3">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Container'
}
</script>
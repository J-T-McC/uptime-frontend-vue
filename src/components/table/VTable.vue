<template>
  <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
    <div class="align-middle inline-block min-w-full overflow-hidden sm:rounded">
      <table class="table table-md">
        <slot></slot>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VTable'
}
</script>
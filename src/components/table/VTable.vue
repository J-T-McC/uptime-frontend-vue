<template>
  <div class="align-middle inline-block min-w-full overflow-hidden sm:rounded">
    <table class="table table-md table-blue">
      <slot></slot>
    </table>
  </div>
</template>
<script>
export default {
  name: 'VTable'
}
</script>
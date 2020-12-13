<template>
  <div :class="classes">
    <label class="text-gray-700 block mt-3 text-left">
    <span class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
    <input
        :checked="value"
        :name="name"
        type="checkbox"
        class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        @input="updateValue($event.target.checked)"/>
    <label class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
    </span>
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'VToggle',
  props: {
    label: String,
    value: {
      default: false,
      type: Boolean
    },
    name: {
      default: '',
      type: String
    },
    classes: {
      default: 'mt-1',
      type: String
    }
  },
  setup (props, { emit }) {
    const updateValue = (value) => {
      emit('update:value', value)
    }
    return {
      updateValue
    }
  }
}
</script>

<style scoped>
.toggle-checkbox:checked {
  @apply: right-0 border-bluen-400;
  right: 0;
}

.toggle-checkbox:checked + .toggle-label {
  @apply: bg-blue-400;
}
</style>
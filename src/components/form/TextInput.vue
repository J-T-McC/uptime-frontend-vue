<template>
  <label class="block mt-3">
    <span class="text-gray-700 text-sm">{{ label }}</span>
    <input v-bind='$attrs'
           :value="value"
           @input="updateValue($event.target.value)"
           class="form-input mt-1 block w-full rounded-md focus:border-indigo-600"
    />
  </label>
</template>

<script>

export default {
  name: 'text-input',
  props: {
    label: String,
    value: {
      default: '',
      type: String
    }
  },
  setup (props, { emit }) {
    const updateValue = (value) => emit('update:value', value)
    return {
      updateValue
    }
  }
}
</script>
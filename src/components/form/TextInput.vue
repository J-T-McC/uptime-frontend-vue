<template>
  <label class="block mt-3">
    <span v-if="label" class="text-gray-700 text-sm">{{ label }}</span>
    <input :type='type'
           :value="value"
           :placeholder="placeholder"
           @input="updateValue($event.target.value)"
           class="form-input w-full mt-2 rounded-md focus:border-indigo-600"
    />
  </label>
</template>

<script>

export default {
  name: 'text-input',
  props: {
    label: String,
    placeholder: String,
    type: {
      default: 'text'
    },
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
<template>
  <div :class="classes">
    <span v-if="label" class="text-gray-700 text-sm">{{ label }}</span>
    <input :value="value"
           :type="type"
           :placeholder="placeholder"
           :name="name"
           @input="updateValue($event.target.value)"
           class="form-input w-full mt-2 rounded-md border-gray-300 focus:border-blue-600"
    />
  </div>
</template>
<script>

export default {
  name: 'VInput',
  props: {
    label: String,
    placeholder: String,
    type: {
      default: 'text'
    },
    value: {
      default: '',
      type: String
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
    const updateValue = (value) => emit('update:value', value)
    return {
      updateValue
    }
  }
}
</script>
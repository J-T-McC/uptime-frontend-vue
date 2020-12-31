<template>
  <div :class="classes">
    <span v-if="label" class="text-gray-700 text-sm">{{ label }}</span>
    <input ref="input"
           :value="value"
           :type="type"
           :placeholder="placeholder"
           :name="name"
           :readonly="readonly"
           :disabled="disabled"
           :required="required"
           @input="updateValue($event.target.value)"
           class="form-input w-full mt-2 rounded-md border-gray-300 focus:border-blue-600"
    />
  </div>
</template>
<script>

import { ref } from 'vue'

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
    },
    readonly: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    required: {
      default: false,
      type: Boolean
    },
  },
  setup (props, { emit }) {
    const input = ref(null)
    const updateValue = (value) => emit('update:value', value)
    return {
      updateValue,
      input,
    }
  }
}
</script>
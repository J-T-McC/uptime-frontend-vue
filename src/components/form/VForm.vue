<template>
  <form @submit.prevent="submit">
    <component
        v-for="(input, i) in config.inputs"
        :is="input.component"
        v-bind:key="getInputName(input, i)"
        v-bind="getPropsToBind(input)"
        v-model:value="vModel[getInputName(input, i)]">
      {{ input }}
    </component>
    <slot></slot>
  </form>
</template>

<script>

import { watch, reactive } from 'vue'

export default {
  name: 'VForm',
  props: {
    config: Object,
    defaultNamePrefix: {
      default: 'v-form-input-'
    }
  },
  emits: ['form:update', 'form:submit'],
  setup (props, { emit }) {

    const getInputName = (input, index) => {
      return input.name ?? `${props.defaultNamePrefix}-${index}`
    }

    //bind all input props to dynamic component by default, excluding conflicting items
    const restrictedBinds = ['component']
    const getPropsToBind = (input) => {
      return Object.keys(input)
          .filter(key => !restrictedBinds.includes(key))
          .reduce((obj, key) => {
            obj[key] = input[key];
            return obj;
          }, {});
    }

    const vModel = reactive({})

    props.config.inputs.forEach((input, i) => {
      const name = getInputName(input, i)
      vModel[name] = input.value ?? null
    })

    watch(vModel, () => {
      emit('form:update', vModel)
    })

    const submit = () => {
      emit('form:submit', vModel)
    }

    return {
      vModel,
      getPropsToBind,
      submit,
      getInputName
    }
  },
}
</script>
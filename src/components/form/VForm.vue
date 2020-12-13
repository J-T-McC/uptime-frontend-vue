<template>
  <form @submit.prevent="submit">
    <component
        v-for="(input, i) in config.inputs"
        :is="input.component"
        v-bind:key="getInputName(input, i)"
        v-bind="input"
        v-model:value="vModel[getInputName(input, i)]">
      {{ input }}
    </component>
    <slot></slot>
  </form>
</template>

<script>

import { VInput, VToggle } from '@/components/form'
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
      submit,
      getInputName
    }
  },
  components: {
    VInput,
    VToggle,
  }
}
</script>

<style scoped>

</style>
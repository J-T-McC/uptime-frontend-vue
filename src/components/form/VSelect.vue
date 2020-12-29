<template>
  <div class="space-y-1" :class="classes" >
    <label :id="`${name}-label`" class="block text-sm leading-5 text-gray-700">
      <slot name="SelectLabel">{{ label }}</slot>
    </label>

    <div class="relative">
      <span class="inline-block w-full rounded-md shadow-sm">
        <button v-c-outside="clickOutside" type="button" @click="openDropdown" aria-haspopup="listbox" aria-expanded="true"
                :aria-labelledby="`${name}-label`"
                class="w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 focus:outline-none text-left focus:ring-1 focus:ring-blue-600 focus:border-blue-500 transition ease-in-out duration-150">
          <div class="flex items-center space-x-3">
            <span class="block truncate text-base" :class="{'text-gray-500': !selectedLabel}">
              {{ selectedLabel || 'Select Channel Type' }}
            </span>
          </div>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg class="w-4 h-4  text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
      </span>

      <div v-show="isOpen" class="absolute mt-1 w-full rounded-md bg-white shadow-lg">
        <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label"
            class="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">

          <li tabindex="0" @click="select(option)" :id="`${name}-item-${i}`" role="option"
              v-for="(option, i) in options" v-bind:key="option"
              class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9  cursor-pointer hover:text-white hover:bg-blue-500 focus:outline-none focus:text-white focus:bg-blue-500">
            <div class="flex items-center space-x-3">
              <span class="block truncate"
                    v-bind:class="{ 'font-normal' : !isSelected(option.value) , 'font-semibold' : isSelected(option.value)}">
                {{ option.label }}
              </span>
            </div>

            <span v-show="isSelected(option.value)" class="absolute inset-y-0 right-0 flex items-center pr-4">
              <svg class="w-4 h-4 " viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"/>
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'VSelect',
  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    },
    value: String,
    label: String,
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
    const isOpen = ref(false)
    const selectedLabel = ref('')


    const isSelected = (value) => {
      return props.value === value
    }

    props.options.forEach((option) => {
      if(isSelected(option.value)) {
        selectedLabel.value = option.label ?? ''
      }
    })

    const closeDropdown = () => {
      isOpen.value = false
    }

    const openDropdown = () => {
      isOpen.value = true
    }

    const select = (option) => {
      closeDropdown()
      selectedLabel.value = option.label
      emit('update:value', option.value)
    }

    const clickOutside = () => {
      closeDropdown()
    }

    return {
      isOpen,
      selectedLabel,
      isSelected,
      closeDropdown,
      openDropdown,
      select,
      clickOutside
    }
  },
}
</script>
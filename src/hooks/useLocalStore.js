import { ref, watchEffect } from 'vue'

export default function useLocalStore (key) {

  let store = ref(JSON.parse(window.localStorage.getItem(key) ?? '{}'))

  const get = (key, defaultValue = null) => {
    return store.value[key] ?? defaultValue
  }

  const set = (key, value) => {
    store.value[key] = value
  }

  const reset = () => {
    store.value = {}
  }

  const sync = () => {
    window.localStorage.setItem(key, JSON.stringify(store.value))
  }

  watchEffect(() => {
    if (store.value) {
      sync()
    }
  })

  return {
    get,
    set,
    reset,
  }

}

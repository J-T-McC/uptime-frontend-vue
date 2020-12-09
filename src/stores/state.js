import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      url: process.env.VUE_APP_URL,
      api: process.env.VUE_APP_API
    }
  },
})

export default store

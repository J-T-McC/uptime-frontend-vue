import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import EmptyLayout from '@/components/layout/EmptyLayout.vue'
import Modal from '@/components/interaction/Modal'
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
import '@/assets/styles/styles.pcss'

import { ClickOutside } from '@/directives'

const Vue = createApp(App)

Vue.component('default-layout', DashboardLayout)
Vue.component('empty-layout', EmptyLayout)
Vue.component('modal', Modal)
Vue.directive('c-outside', ClickOutside)

Vue.use(router)
Vue.use(Toast)

Vue.mount('#app')


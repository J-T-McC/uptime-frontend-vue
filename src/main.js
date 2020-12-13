import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import EmptyLayout from '@/components/layout/EmptyLayout.vue';
import Modal from '@/components/interactions/Modal'
import '@/assets/styles/styles.pcss'

const Vue = createApp(App)

Vue.component('default-layout', DashboardLayout);
Vue.component('empty-layout', EmptyLayout);

Vue.component("modal", Modal)

Vue.use(router)
Vue.mount('#app')


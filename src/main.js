import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import EmptyLayout from '@/components/layout/EmptyLayout.vue';

import '@/assets/styles/styles.css'

const Vue = createApp(App)

Vue.component('default-layout', DashboardLayout);
Vue.component('empty-layout', EmptyLayout);

Vue.use(router)
Vue.mount('#app')


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/stores/state.js'
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import EmptyLayout from '@/components/layout/EmptyLayout.vue';

import 'tailwindcss/tailwind.css'

const Vue = createApp(App)

Vue.component('default-layout', DashboardLayout);
Vue.component('empty-layout', EmptyLayout);

Vue.use(router)
Vue.use(store)
Vue.mount('#app')


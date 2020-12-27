import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/layout/views/auth/Login'
import Register from '@/components/layout/views/auth/Register'
import ForgotPassword from '@/components/layout/views/auth/ForgotPassword'
import ResetPassword from '@/components/layout/views/auth/ResetPassword'
import Dashboard from '@/components/layout/views/Dashboard.vue'
import Monitors from '@/components/layout/views/Monitors.vue'
import Integrations from '@/components/layout/views/Channels.vue'
import Monitor from '@/components/layout/views/Monitor'

import { Home } from 'heroicons/vue/outline'
import { SearchCircle } from 'heroicons/vue/outline'
import { Bell } from 'heroicons/vue/outline'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty', auth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { layout: 'empty', auth: true }
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: ForgotPassword,
    meta: { layout: 'empty', auth: true }
  },
  {
    path: '/password/reset/:token',
    name: 'Reset Password',
    component: ResetPassword,
    meta: { layout: 'empty', auth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { sidebar: true, icon: Home }
  },
  {
    path: '/monitors',
    name: 'Monitors',
    component: Monitors,
    meta: { sidebar: true, icon: SearchCircle }
  },
  { path: '/monitors/:id', component: Monitor, name: 'Monitor' },
  {
    path: '/integrations',
    name: 'Integrations',
    component: Integrations,
    meta: { sidebar: true, icon: Bell }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

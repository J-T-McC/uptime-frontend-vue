import Dashboard from '@/components/layout/views/Dashboard'
import { Bell, Home, SearchCircle } from 'heroicons/vue/outline'
import Monitors from '@/components/layout/views/Monitors'
import Monitor from '@/components/layout/views/Monitor'
import Integrations from '@/components/layout/views/Channels'
import Profile from '@/components/layout/views/Profile'

const DashboardRoutes = [
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
    path: '/channels',
    name: 'Channels',
    component: Integrations,
    meta: { sidebar: true, icon: Bell }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  }
]

export default DashboardRoutes
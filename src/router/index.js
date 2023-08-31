import { createWebHistory, createRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Home from '@/pages/Home'
import Auth from '@/pages/Auth'
import PairCreate from '@/pages/pair/Create'
import PairEdit from '@/pages/pair/Edit'
import IdentityCreate from '@/pages/identity/Create'
import IdentityEdit from '@/pages/identity/Edit'
import HostCreate from '@/pages/host/Create'
import HostEdit from '@/pages/host/Edit'

const routes = [
  { path: '/', component: Home },

  { path: '/auth', component: Auth, name: 'Auth' },

  { path: '/pairs/create', component: PairCreate },
  { path: '/pairs/:id/edit', component: PairEdit },

  { path: '/identities/create', component: IdentityCreate },
  { path: '/identities/:id/edit', component: IdentityEdit },

  { path: '/hosts/create', component: HostCreate },
  { path: '/hosts/:id/edit', component: HostEdit },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  if (!useAuthStore().authenticated && to.name != 'Auth') {
    return '/auth'
  }

  return true
})

export default router

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
import Privacy from '@/pages/conditions/Privacy'
import Terms from '@/pages/conditions/Terms'

const routes = [
  { path: '/', component: Home, meta: { auth: true } },

  { path: '/auth', component: Auth },

  { path: '/pairs/create', component: PairCreate, meta: { auth: true } },
  { path: '/pairs/:id/edit', component: PairEdit, meta: { auth: true } },

  { path: '/identities/create', component: IdentityCreate, meta: { auth: true } },
  { path: '/identities/:id/edit', component: IdentityEdit, meta: { auth: true } },

  { path: '/hosts/create', component: HostCreate, meta: { auth: true } },
  { path: '/hosts/:id/edit', component: HostEdit, meta: { auth: true } },

  { path: '/terms-of-service', component: Terms },
  { path: '/privacy-policy', component: Privacy },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  if (!useAuthStore().authenticated && to.meta.auth) {
    return '/auth'
  }

  return true
})

export default router

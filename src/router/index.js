import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/pages/Home'
import PairCreate from '@/pages/pair/Create'
import PairEdit from '@/pages/pair/Edit'
import IdentityCreate from '@/pages/identity/Create'
import IdentityEdit from '@/pages/identity/Edit'
import HostCreate from '@/pages/host/Create'
import HostEdit from '@/pages/host/Edit'

const routes = [
  { path: '/', component: Home },

  { path: '/pairs/create', component: PairCreate },
  { path: '/pairs/:id/edit', component: PairEdit },

  { path: '/identities/create', component: IdentityCreate },
  { path: '/identities/:id/edit', component: IdentityEdit },

  { path: '/hosts/create', component: HostCreate },
  { path: '/hosts/:id/edit', component: HostEdit },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

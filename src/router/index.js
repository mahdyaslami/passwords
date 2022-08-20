import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/pages/Home'
import PairCreate from '@/pages/pair/Create'
import PairEdit from '@/pages/pair/Edit'
import IdentityCreate from '@/pages/identity/Create'
import IdentityEdit from '@/pages/identity/Edit'

const routes = [
  { path: '/', component: Home },

  { path: '/pairs/create', component: PairCreate },
  { path: '/pairs/:id/edit', component: PairEdit },

  { path: '/identities/create', component: IdentityCreate },
  { path: '/identities/:id/edit', component: IdentityEdit },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

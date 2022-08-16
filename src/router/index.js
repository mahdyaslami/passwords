import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/pages/Home'
import PairCreate from '@/pages/pair/Create'
import PairEdit from '@/pages/pair/Edit'

const routes = [
  { path: '/', component: Home },
  { path: '/pairs/create', component: PairCreate },
  { path: '/pairs/:id/edit', component: PairEdit },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

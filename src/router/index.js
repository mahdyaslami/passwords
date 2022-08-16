import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/pages/Home'
import PairCreate from '@/pages/pair/Create'

const routes = [
  { path: '/', component: Home },
  { path: '/pairs/create', component: PairCreate },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

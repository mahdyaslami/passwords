import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/pages/Home'

const routes = [
  { path: '/', component: Home },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

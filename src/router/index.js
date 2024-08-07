import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/HomeView.vue')
    },
    {
      path: '/carrinho',
      name: 'carrinho',
      component: () => import('@/views/Carrrinho/CarrinhoIndex.vue')
    },
  ]
})

export default router

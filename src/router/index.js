import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/get-started',
      name: 'get-started',
      component: () => import('../views/GetStarted.vue')
    },
    {
      path: '/demo',
      redirect: '/demo/project_0'
    },
    // dashboard
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/demo/:modelName',
      name: 'demo',

      component: () => import('../views/DemoView.vue'),
      props: true,
    },
    {
      path: '/assembly-editor',
      name: 'assembly-editor',

      component: () => import('../views/AssemblyEditor.vue'),
    },
    // /404
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue')
    },
  ]
})

export default router

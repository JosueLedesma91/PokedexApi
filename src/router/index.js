// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import DetallesP from '../views/DetallesP.vue';
import Perfil from '../views/Perfil.vue';


const routes = [
 // {
 //   path: '/',
  //  component: () => import('@/layouts/default/Default.vue'),
 //   children: [
 //     {
//        path: '',
//name: 'Home',
 ///       // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
//        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
 //     },
//    ],
//  },
  {
  path: '/',
  name: 'Home',
  component: Home
  },
  {
    path: '/detalles/:id',
    name: 'detalles',
    component: DetallesP
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: Perfil
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

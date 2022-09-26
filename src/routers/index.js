import {
  createWebHashHistory,
  createRouter,
  createWebHistory,
} from 'vue-router';

import Home from '@/views/Home.vue';

const history = createWebHashHistory();
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/schedules',
    name: 'schedules',
    component: () => import('@/views/Schedules.vue'),
  },
  {
    path: '/event',
    name: 'event',
    component: () => import('@/views/Event.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/reserve',
    name: 'reserve',
    component: () => import('@/views/Reserve.vue'),
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/Category.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User.vue'),
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/views/SignIn.vue'),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/views/SignUp.vue'),
  },
  {
    path: '/sign-out',
    name: 'sign-out',
    component: () => import('@/views/SignOut.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/Test.vue'),
  },
  {
    path: '/:notMatchPath(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
  
];

const router = createRouter({ history, routes });

export default router;

import { createWebHashHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import Schedules from '../views/Schedules.vue';
import Event from '../views/Event.vue';
import NotFound from '../views/NotFound.vue';
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
    component: Schedules,
  },
  {
    path: '/event',
    name: 'event',
    component: Event,
  },
  {
    path: '/:notMatchPath(.*)',
    name: 'NotFound',
    component: NotFound,
  }
];

const router = createRouter({ history, routes });

export default router;

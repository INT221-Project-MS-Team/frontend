import { createWebHashHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import Schedules from '../views/Schedules.vue';

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
];

const router = createRouter({ history, routes });

export default router;

import { createWebHashHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';

const history = createWebHashHistory();
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
];

const router = createRouter({ history, routes });

export default router;

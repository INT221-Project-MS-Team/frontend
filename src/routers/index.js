import { createWebHashHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import Schedules from '../views/Schedules.vue';
import Event from '../views/Event.vue';
import NotFound from '../views/NotFound.vue';
import About from '../views/About.vue'
import Reserve from '../views/Reserve.vue'
import Category from '../views/Category.vue'
import User from '../views/User.vue'
import Signup from '../views/Signup.vue'
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
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/reserve',
    name: 'reserve',
    component: Reserve,
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
  },
  {
    path: '/user',
    name: 'user',
    component: User,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/:notMatchPath(.*)',
    name: 'NotFound',
    component: NotFound,
  }
];

const router = createRouter({ history, routes });

export default router;


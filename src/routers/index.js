const { def } = require("@vue/shared");
const { createWebHashHistory, createRouter } = require("vue-router");

const history = createWebHashHistory();
const routes = [
  {
    path: '/',
    name: '',
    component: null
  },
];

const router = createRouter({history, routes});

export default router;

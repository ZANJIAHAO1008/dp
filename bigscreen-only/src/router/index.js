import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/bigscreen',
  },
  {
    path: '/bigscreen',
    name: 'BigScreen',
    component: () => import('@/views/bigScreen/index.vue'),
  },
];

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;

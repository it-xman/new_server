import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

// 增加类型定义 路由提示
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/welcome',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/Welcome.vue'),
      },
      {
        path: '/courses',
        name: 'courses',
        component: () => import('@/views/Courses.vue'),
      },
      {
        path: '/episodes',
        name: 'episodes',
        component: () => import('@/views/Episodes.vue'),
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/Users.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  let userInfo = localStorage.getItem('userInfo');
  if (to.name !== 'login' && !userInfo) next({ name: 'login' });
  else next();
});

export default router;

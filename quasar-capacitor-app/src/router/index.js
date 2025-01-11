import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore'; // <-- Add this line
import Dashboard from '../pages/DashboardPage.vue';
import Login from '../pages/LoginPage.vue';

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;

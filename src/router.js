import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue';
import Productos from './components/Productos.vue';
import Clientes from './components/Clientes.vue';
import Proveedores from './components/Proveedores.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard, children: [
    { path: '/productos', component: Productos },
    { path: '/clientes', component: Clientes },
    { path: '/proveedores', component: Proveedores }
  ]}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
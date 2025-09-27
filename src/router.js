import { createRouter, createWebHistory } from 'vue-router'
import LoginView from './components/Login.vue'
import DashboardView from './components/Dashboard.vue'
import ProductosView from './components/Productos.vue'
import ClientesView from './components/Clientes.vue'
import ProveedoresView from './components/Proveedores.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    children: [
      {
        path: '',
        redirect: '/dashboard/productos'
      },
      {
        path: 'productos',
        component: ProductosView
      },
      {
        path: 'clientes',
        component: ClientesView
      },
      {
        path: 'proveedores',
        component: ProveedoresView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
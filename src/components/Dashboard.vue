<template>
  <div class="dashboard-container">
    <aside class="sidebar">
      <h2>Inventario App</h2>
      <nav>
        <ul>
          <li><router-link to="/dashboard/productos">Productos</router-link></li>
          <li><router-link to="/dashboard/clientes">Clientes</router-link></li>
          <li><router-link to="/dashboard/proveedores">Proveedores</router-link></li>
          <li><button @click="logout" class="logout-btn">Cerrar Sesión</button></li>
        </ul>
      </nav>
    </aside>
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  methods: {
    logout() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: #fff;
  padding: 20px;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
}

.sidebar nav li {
  margin-bottom: 10px;
}

.sidebar nav a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2em;
  display: block;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.sidebar nav a:hover,
.sidebar nav a.router-link-active {
  background-color: #34495e;
}

.logout-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2em;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  text-align: left;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #e74c3c;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
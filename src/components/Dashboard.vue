<template>
  <div class="dashboard-container">
    <aside class="sidebar">
      <h2>Inventario App</h2>
      <nav>
        <ul>
          <li><router-link to="/productos">Productos</router-link></li>
          <li><router-link to="/clientes">Clientes</router-link></li>
          <li><router-link to="/proveedores">Proveedores</router-link></li>
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
  name: 'DashboardView' // ← SOLO ESTA LÍNEA CAMBIÓ
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
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
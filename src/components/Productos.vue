<template>
  <div>
    <h2>Gestión de Productos</h2>
    
    <h3>Registrar Nuevo Producto</h3>
    <form @submit.prevent="guardarProducto">
      <input type="text" v-model="producto.nombre" placeholder="Nombre del Producto" required>
      <input type="number" v-model="producto.cantidad" placeholder="Cantidad" required>
      <button type="submit">Guardar Producto</button>
    </form>
    
    <hr>
    
    <h3>Inventario de Productos</h3>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in productos" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.nombre }}</td>
          <td>{{ p.cantidad }}</td>
          <td>
            <button @click="eliminarProducto(p.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductosView',
  data() {
    return {
      productos: [],
      producto: {
        nombre: '',
        cantidad: 0
      }
    };
  },
  created() {
    this.obtenerProductos();
  },
  methods: {
    async obtenerProductos() {
      try {
        const response = await axios.get('https://inventarioapp-yhie.onrender.com/api/productos');
        this.productos = response.data;
      } catch (err) {
        console.error('Error al obtener productos:', err);
      }
    },
    async guardarProducto() {
      try {
        await axios.post('https://inventarioapp-yhie.onrender.com/api/productos', this.producto);
        this.producto = { nombre: '', cantidad: 0 }; // Limpiar el formulario
        this.obtenerProductos(); // Actualizar la lista
      } catch (err) {
        console.error('Error al guardar producto:', err);
      }
    },
    async eliminarProducto(id) {
      try {
        await axios.delete(`https://inventarioapp-yhie.onrender.com/api/productos/${id}`);
        this.obtenerProductos(); // Actualizar la lista
      } catch (err) {
        console.error('Error al eliminar producto:', err);
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
</style>
<template>
  <div>
    <h2>Gestión de Proveedores</h2>
    
    <h3>Registrar Nuevo Proveedor</h3>
    <form @submit.prevent="guardarProveedor">
      <input type="text" v-model="proveedor.nombre" placeholder="Nombre del Proveedor" required>
      <input type="text" v-model="proveedor.direccion" placeholder="Dirección" required>
      <input type="text" v-model="proveedor.contacto" placeholder="Contacto" required>
      <button type="submit">Guardar Proveedor</button>
    </form>
    
    <hr>
    
    <h3>Listado de Proveedores</h3>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Contacto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in proveedores" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.nombre }}</td>
          <td>{{ p.direccion }}</td>
          <td>{{ p.contacto }}</td>
          <td>
            <button @click="eliminarProveedor(p.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProveedoresView',
  data() {
    return {
      proveedores: [],
      proveedor: {
        nombre: '',
        direccion: '',
        contacto: ''
      }
    };
  },
  created() {
    this.obtenerProveedores();
  },
  methods: {
    async obtenerProveedores() {
      try {
        const response = await axios.get('https://inventarioapp-yhie.onrender.com/api/proveedores');
        this.proveedores = response.data;
      } catch (err) {
        console.error('Error al obtener proveedores:', err);
      }
    },
    async guardarProveedor() {
      try {
        await axios.post('https://inventarioapp-yhie.onrender.com/api/proveedores', this.proveedor);
        this.proveedor = { nombre: '', direccion: '', contacto: '' }; // Limpiar el formulario
        this.obtenerProveedores(); // Actualizar la lista
      } catch (err) {
        console.error('Error al guardar proveedor:', err);
      }
    },
    async eliminarProveedor(id) {
      try {
        await axios.delete(`https://inventarioapp-yhie.onrender.com/api/proveedores/${id}`);
        this.obtenerProveedores(); // Actualizar la lista
      } catch (err) {
        console.error('Error al eliminar proveedor:', err);
      }
    }
  }
};
</script>

<style scoped>
/* Puedes reutilizar los estilos del componente Productos.vue aquí */
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
<template>
  <div>
    <h2>Gestión de Clientes</h2>
    
    <h3>Registrar Nuevo Cliente</h3>
    <form @submit.prevent="guardarCliente">
      <input type="text" v-model="cliente.nombre" placeholder="Nombre del Cliente" required>
      <input type="text" v-model="cliente.direccion" placeholder="Dirección" required>
      <input type="text" v-model="cliente.contacto" placeholder="Contacto" required>
      <button type="submit">Guardar Cliente</button>
    </form>
    
    <hr>
    
    <h3>Listado de Clientes</h3>
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
        <tr v-for="c in clientes" :key="c.id">
          <td>{{ c.id }}</td>
          <td>{{ c.nombre }}</td>
          <td>{{ c.direccion }}</td>
          <td>{{ c.contacto }}</td>
          <td>
            <button @click="eliminarCliente(c.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ClientesView',
  data() {
    return {
      clientes: [],
      cliente: {
        nombre: '',
        direccion: '',
        contacto: ''
      }
    };
  },
  created() {
    this.obtenerClientes();
  },
  methods: {
    async obtenerClientes() {
      try {
        const response = await axios.get('https://inventarioapp-yhie.onrender.com/api/clientes');
        this.clientes = response.data;
      } catch (err) {
        console.error('Error al obtener clientes:', err);
      }
    },
    async guardarCliente() {
      try {
        await axios.post('https://inventarioapp-yhie.onrender.com/api/clientes', this.cliente);
        this.cliente = { nombre: '', direccion: '', contacto: '' }; // Limpiar el formulario
        this.obtenerClientes(); // Actualizar la lista
      } catch (err) {
        console.error('Error al guardar cliente:', err);
      }
    },
    async eliminarCliente(id) {
      try {
        await axios.delete(`https://inventarioapp-yhie.onrender.com/api/clientes/${id}`);
        this.obtenerClientes(); // Actualizar la lista
      } catch (err) {
        console.error('Error al eliminar cliente:', err);
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
<template>
  <div>
    <h2>Gestión de Clientes</h2>
    
    <h3>{{ editando ? 'Actualizar' : 'Registrar Nuevo' }} Cliente</h3>
    <form @submit.prevent="guardarCliente">
      <input 
        type="text" 
        v-model="cliente.nombre" 
        placeholder="Nombre del Cliente" 
        required
        minlength="2" 
        maxlength="100" 
        title="El nombre debe tener entre 2 y 100 caracteres"
      >

      <!-- Dirección: mínimo 5 caracteres, debe contener letras y números -->
      <input 
        type="text" 
        v-model="cliente.direccion" 
        placeholder="Dirección" 
        required
        pattern="^(?=.*[A-Za-z])(?=.*[0-9]).{5,}$" 
        title="La dirección debe contener letras y números y tener al menos 5 caracteres"
      >

      <!-- Contacto: solo números, 7 a 15 dígitos -->
      <input 
        type="text" 
        v-model="cliente.contacto" 
        placeholder="Contacto (Teléfono)" 
        required
        pattern="^[0-9]{7,15}$" 
        title="El contacto debe tener entre 7 y 15 dígitos numéricos"
      >

      <button type="submit">{{ editando ? 'Actualizar' : 'Guardar' }} Cliente</button>
      <button v-if="editando" type="button" @click="cancelarEdicion">Cancelar</button>
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
            <button @click="editarCliente(c)" class="btn-editar">Editar</button>
            <button @click="eliminarCliente(c.id)" class="btn-eliminar">Eliminar</button>
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
        id: null,
        nombre: '',
        direccion: '',
        contacto: ''
      },
      editando: false
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
        alert('Error al cargar clientes. Revisa la consola para más detalles.');
      }
    },
    
    async guardarCliente() {
      try {
        if (this.editando) {
          await axios.put(`https://inventarioapp-yhie.onrender.com/api/clientes/${this.cliente.id}`, {
            nombre: this.cliente.nombre,
            direccion: this.cliente.direccion,
            contacto: this.cliente.contacto
          });
          alert('Cliente actualizado correctamente');
        } else {
          await axios.post('https://inventarioapp-yhie.onrender.com/api/clientes', {
            nombre: this.cliente.nombre,
            direccion: this.cliente.direccion,
            contacto: this.cliente.contacto
          });
          alert('Cliente creado correctamente');
        }
        
        this.limpiarFormulario();
        this.obtenerClientes();
      } catch (err) {
        console.error('Error al guardar cliente:', err);
        alert('Error al guardar cliente. Revisa la consola para más detalles.');
      }
    },
    
    editarCliente(cliente) {
      this.cliente = { ...cliente };
      this.editando = true;
    },
    
    cancelarEdicion() {
      this.limpiarFormulario();
    },
    
    limpiarFormulario() {
      this.cliente = { id: null, nombre: '', direccion: '', contacto: '' };
      this.editando = false;
    },
    
    async eliminarCliente(id) {
      if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
        try {
          await axios.delete(`https://inventarioapp-yhie.onrender.com/api/clientes/${id}`);
          alert('Cliente eliminado correctamente');
          this.obtenerClientes();
        } catch (err) {
          console.error('Error al eliminar cliente:', err);
          alert('Error al eliminar cliente. Revisa la consola para más detalles.');
        }
      }
    }
  }
};
</script>

<style scoped>
/* mismo estilo que en proveedores para mantener uniformidad */
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

th {
  background-color: #f2f2f2;
}

.btn-editar {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 3px;
  cursor: pointer;
}

.btn-eliminar {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.btn-editar:hover {
  background-color: #0056b3;
}

.btn-eliminar:hover {
  background-color: #c82333;
}

form {
  margin-bottom: 20px;
}

input {
  margin: 5px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
}

button[type="submit"] {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
}

button[type="button"] {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #218838;
}

button[type="button"]:hover {
  background-color: #5a6268;
}
</style>
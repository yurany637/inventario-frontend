<template>
  <div>
    <h2>Gestión de Proveedores</h2>
    
    <h3>{{ editando ? 'Actualizar' : 'Registrar Nuevo' }} Proveedor</h3>
    <form @submit.prevent="guardarProveedor">
      <input 
        type="text" 
        v-model="proveedor.nombre" 
        placeholder="Nombre del Proveedor" 
        required
      >

      <!-- Dirección: mínimo 5 caracteres, debe contener letras y números -->
      <input 
        type="text" 
        v-model="proveedor.direccion" 
        placeholder="Dirección" 
        required
        pattern="^(?=.*[A-Za-z])(?=.*[0-9]).{5,}$" 
        title="La dirección debe tener al menos 5 caracteres e incluir letras y números"
      >

      <!-- Contacto: solo números, 7 a 15 dígitos -->
      <input 
        type="text" 
        v-model="proveedor.contacto" 
        placeholder="Contacto (Teléfono)" 
        required
        pattern="^[0-9]{7,15}$" 
        title="El contacto debe tener entre 7 y 15 dígitos numéricos"
      >

      <button type="submit">{{ editando ? 'Actualizar' : 'Guardar' }} Proveedor</button>
      <button v-if="editando" type="button" @click="cancelarEdicion">Cancelar</button>
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
            <button @click="editarProveedor(p)" class="btn-editar">Editar</button>
            <button @click="eliminarProveedor(p.id)" class="btn-eliminar">Eliminar</button>
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
        id: null,
        nombre: '',
        direccion: '',
        contacto: ''
      },
      editando: false
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
        alert('Error al cargar proveedores. Revisa la consola para más detalles.');
      }
    },
    
    async guardarProveedor() {
      try {
        if (this.editando) {
          // Actualizar proveedor existente
          await axios.put(`https://inventarioapp-yhie.onrender.com/api/proveedores/${this.proveedor.id}`, {
            nombre: this.proveedor.nombre,
            direccion: this.proveedor.direccion,
            contacto: this.proveedor.contacto
          });
          alert('Proveedor actualizado correctamente');
        } else {
          // Crear nuevo proveedor
          await axios.post('https://inventarioapp-yhie.onrender.com/api/proveedores', {
            nombre: this.proveedor.nombre,
            direccion: this.proveedor.direccion,
            contacto: this.proveedor.contacto
          });
          alert('Proveedor creado correctamente');
        }
        
        this.limpiarFormulario();
        this.obtenerProveedores(); // Actualizar la lista
      } catch (err) {
        console.error('Error al guardar proveedor:', err);
        alert('Error al guardar proveedor. Revisa la consola para más detalles.');
      }
    },
    
    editarProveedor(proveedor) {
      this.proveedor = {
        id: proveedor.id,
        nombre: proveedor.nombre,
        direccion: proveedor.direccion,
        contacto: proveedor.contacto
      };
      this.editando = true;
    },
    
    cancelarEdicion() {
      this.limpiarFormulario();
    },
    
    limpiarFormulario() {
      this.proveedor = { id: null, nombre: '', direccion: '', contacto: '' };
      this.editando = false;
    },
    
    async eliminarProveedor(id) {
      if (confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
        try {
          await axios.delete(`https://inventarioapp-yhie.onrender.com/api/proveedores/${id}`);
          alert('Proveedor eliminado correctamente');
          this.obtenerProveedores(); // Actualizar la lista
        } catch (err) {
          console.error('Error al eliminar proveedor:', err);
          alert('Error al eliminar proveedor. Revisa la consola para más detalles.');
        }
      }
    }
  }
};
</script>

<style scoped>
/* --- mismo estilo --- */
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
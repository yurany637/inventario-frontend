<template>
  <div>
    <h2>Gestión de Productos</h2>
    
    <h3>{{ editando ? 'Actualizar' : 'Registrar Nuevo' }} Producto</h3>
    <form @submit.prevent="guardarProducto">
      <!-- Nombre -->
      <input type="text" v-model="producto.nombre" placeholder="Nombre del Producto" required>
      <div v-if="errores.nombre" style="color:red; font-size:12px;">{{ errores.nombre }}</div>

      <!-- Cantidad -->
      <input type="number" v-model="producto.cantidad" placeholder="Cantidad" required>
      <div v-if="errores.cantidad" style="color:red; font-size:12px;">{{ errores.cantidad }}</div>

      <button type="submit">{{ editando ? 'Actualizar' : 'Guardar' }} Producto</button>
      <button v-if="editando" type="button" @click="cancelarEdicion">Cancelar</button>
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
            <button @click="editarProducto(p)" class="btn-editar">Editar</button>
            <button @click="eliminarProducto(p.id)" class="btn-eliminar">Eliminar</button>
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
        id: null,
        nombre: '',
        cantidad: ''
      },
      errores: {}, // ✅ para manejar validaciones
      editando: false
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
        alert('Error al cargar productos. Revisa la consola para más detalles.');
      }
    },
    
    validarFormulario() {
      this.errores = {};

      if (!this.producto.nombre) {
        this.errores.nombre = 'El nombre no puede estar vacío';
      }

      if (this.producto.cantidad === '' || this.producto.cantidad === null) {
        this.errores.cantidad = 'La cantidad no puede estar vacía';
      } else if (isNaN(this.producto.cantidad) || this.producto.cantidad < 0) {
        this.errores.cantidad = 'La cantidad debe ser un número válido';
      }

      return Object.keys(this.errores).length === 0;
    },

    async guardarProducto() {
      if (!this.validarFormulario()) {
        return;
      }

      try {
        if (this.editando) {
          await axios.put(`https://inventarioapp-yhie.onrender.com/api/productos/${this.producto.id}`, {
            nombre: this.producto.nombre,
            cantidad: this.producto.cantidad
          });
          alert('Producto actualizado correctamente');
        } else {
          await axios.post('https://inventarioapp-yhie.onrender.com/api/productos', {
            nombre: this.producto.nombre,
            cantidad: this.producto.cantidad
          });
          alert('Producto creado correctamente');
        }
        
        this.limpiarFormulario();
        this.obtenerProductos();
      } catch (err) {
        console.error('Error al guardar producto:', err);
        alert('Error al guardar producto. Revisa la consola para más detalles.');
      }
    },
    
    editarProducto(producto) {
      this.producto = {
        id: producto.id,
        nombre: producto.nombre,
        cantidad: producto.cantidad
      };
      this.editando = true;
    },
    
    cancelarEdicion() {
      this.limpiarFormulario();
    },
    
    limpiarFormulario() {
      this.producto = { id: null, nombre: '', cantidad: '' };
      this.errores = {};
      this.editando = false;
    },
    
    async eliminarProducto(id) {
      if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        try {
          await axios.delete(`https://inventarioapp-yhie.onrender.com/api/productos/${id}`);
          alert('Producto eliminado correctamente');
          this.obtenerProductos();
        } catch (err) {
          console.error('Error al eliminar producto:', err);
          alert('Error al eliminar producto. Revisa la consola para más detalles.');
        }
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
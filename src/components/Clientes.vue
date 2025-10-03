<template>
  <div>
    <h2>Registro de Clientes</h2>
    <form @submit.prevent="guardarCliente">
      <div>
        <label for="cedula">Cédula:</label>
        <input 
          type="text" 
          id="cedula" 
          v-model="cliente.cedula" 
          required 
          pattern="[0-9]{6,10}" 
          title="La cédula debe contener entre 6 y 10 dígitos numéricos"
        />
      </div>

      <div>
        <label for="nombre">Nombre:</label>
        <input 
          type="text" 
          id="nombre" 
          v-model="cliente.nombre" 
          required 
          pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ ]+" 
          title="El nombre solo puede contener letras y espacios"
        />
      </div>

      <div>
        <label for="correo">Correo:</label>
        <input 
          type="email" 
          id="correo" 
          v-model="cliente.correo" 
          required 
          title="Ingrese un correo válido, ejemplo: usuario@dominio.com"
        />
      </div>

      <div>
        <label for="telefono">Teléfono:</label>
        <input 
          type="text" 
          id="telefono" 
          v-model="cliente.telefono" 
          required 
          pattern="[0-9]{7,10}" 
          title="El teléfono debe contener entre 7 y 10 dígitos numéricos"
        />
      </div>

      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cliente: {
        cedula: '',
        nombre: '',
        correo: '',
        telefono: ''
      }
    }
  },
  methods: {
    guardarCliente() {
      // Aquí puedes seguir guardando los datos
      console.log("Cliente guardado:", this.cliente);
      alert("Cliente registrado correctamente ✅");
    }
  }
}
</script>
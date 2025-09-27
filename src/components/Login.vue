<template>
  <div class="login-container">
    <h2>Inicio de Sesión</h2>
    <form @submit.prevent="login">
      <input type="text" v-model="usuario" placeholder="Usuario" required>
      <input type="password" v-model="password" placeholder="Contraseña" required>
      <button type="submit">Ingresar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      usuario: '',
      password: '',
      error: null
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('https://inventarioapp-yhie.onrender.com/api/auth/login', {
          nombreUsuario: this.usuario,
          password: this.password
        });
        
        // Simplemente redirigimos al dashboard si el login es exitoso
        console.log(response.data.mensaje);
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = 'Usuario o contraseña incorrectos.';
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
}

form {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
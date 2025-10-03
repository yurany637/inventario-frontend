<template>
  <div class="login-container">
    <h2>Inicio de Sesión</h2>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Usuario" required>
      <input type="password" v-model="password" placeholder="Contraseña" required>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Verificando...' : 'Ingresar' }}
      </button>
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
      username: '',
      password: '',
      error: null,
      loading: false
    };
  },
  methods: {
    async login() {
      this.error = null;
      this.loading = true;
      
      try {
        const response = await axios.post('https://inventarioapp-yhie.onrender.com/api/auth/login', {
          username: this.username,  // ✅ Cambiado de nombreUsuario a username
          password: this.password
        });
        
        if (response.data.mensaje) {
          console.log('Login exitoso:', response.data.mensaje);
          this.$router.push('/dashboard');
        } else if (response.data.error) {
          this.error = response.data.error;
        }
      } catch (err) {
        console.error('Error en login:', err);
        if (err.response && err.response.data && err.response.data.error) {
          this.error = err.response.data.error;
        } else {
          this.error = 'Error al conectar con el servidor. Verifica tu conexión.';
        }
      } finally {
        this.loading = false;
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
  min-width: 300px;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #007bff;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.error {
  color: #dc3545;
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  background-color: #f8d7da;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
}
</style>
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa el archivo de rutas

const app = createApp(App);
app.use(router); // Usa el router
app.mount('#app');

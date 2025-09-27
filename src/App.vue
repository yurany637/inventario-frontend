<template>
  <div id="app">
    <header>
      <h1>Sistema de Inventario</h1>
      <p>Frontend Vue.js conectado con Backend Spring Boot</p>
    </header>
    
    <main>
      <ProductList />
    </main>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'

export default {
  name: 'App',
  components: {
    ProductList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  background: #42b983;
  color: white;
  text-align: center;
  padding: 20px;
}

header h1 {
  margin: 0;
}

main {
  padding: 20px;
}
</style>
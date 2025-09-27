<template>
  <div class="product-list">
    <h2>Lista de Productos</h2>
    
    <!-- Formulario para crear producto -->
    <div class="create-product">
      <h3>Crear Nuevo Producto</h3>
      <input 
        v-model="newProduct.nombre" 
        placeholder="Nombre del producto"
        class="input-field"
      />
      <input 
        v-model.number="newProduct.cantidad" 
        type="number"
        placeholder="Cantidad"
        class="input-field"
      />
      <button @click="createProduct" class="btn-create">Crear Producto</button>
    </div>

    <!-- Lista de productos -->
    <div v-if="loading" class="loading">Cargando productos...</div>
    
    <div v-else-if="error" class="error">
      Error: {{ error }}
    </div>
    
    <div v-else>
      <div v-if="products.length === 0" class="no-products">
        No hay productos disponibles
      </div>
      
      <div v-else class="products-grid">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="product-card"
        >
          <h4>{{ product.nombre }}</h4>
          <p>Cantidad: {{ product.cantidad }}</p>
          <p>ID: {{ product.id }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from '../services/productService';

export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
      loading: true,
      error: null,
      newProduct: {
        nombre: '',
        cantidad: 0
      }
    }
  },
  async mounted() {
    await this.loadProducts();
  },
  methods: {
    async loadProducts() {
      try {
        this.loading = true;
        const response = await ProductService.getAllProducts();
        this.products = response.data;
        this.error = null;
      } catch (error) {
        console.error('Error loading products:', error);
        this.error = 'No se pudieron cargar los productos. Verifica la conexión con el backend.';
      } finally {
        this.loading = false;
      }
    },
    
    async createProduct() {
      if (!this.newProduct.nombre || this.newProduct.cantidad < 0) {
        alert('Por favor completa todos los campos correctamente');
        return;
      }
      
      try {
        await ProductService.createProduct(this.newProduct);
        this.newProduct = { nombre: '', cantidad: 0 };
        await this.loadProducts(); // Recargar la lista
        alert('Producto creado exitosamente');
      } catch (error) {
        console.error('Error creating product:', error);
        alert('Error al crear el producto');
      }
    }
  }
}
</script>

<style scoped>
.product-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.create-product {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.input-field {
  width: 200px;
  padding: 8px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-create {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.btn-create:hover {
  background: #369870;
}

.loading, .error, .no-products {
  text-align: center;
  padding: 20px;
  font-size: 18px;
}

.error {
  color: #e74c3c;
  background: #fdf2f2;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.product-card h4 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}
</style>
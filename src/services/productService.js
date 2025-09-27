import axios from 'axios';
import API_BASE_URL from '../config/api';

const API_URL = `${API_BASE_URL}/api/productos`;

class ProductService {
  
  getAllProducts() {
    return axios.get(API_URL);
  }
  
  createProduct(product) {
    return axios.post(API_URL, product, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  updateProduct(id, product) {
    return axios.put(`${API_URL}/${id}`, product);
  }
  
  deleteProduct(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new ProductService();
import axios from 'axios';
import API_BASE_URL from '../config/api';

const API_URL = `${API_BASE_URL}/api/proveedores`;

class ProviderService {
  
  getAllProviders() {
    return axios.get(API_URL);
  }
  
  getProviderById(id) {
    return axios.get(`${API_URL}/${id}`);
  }
  
  createProvider(provider) {
    return axios.post(API_URL, provider);
  }
  
  updateProvider(id, provider) {
    return axios.put(`${API_URL}/${id}`, provider);
  }
  
  deleteProvider(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new ProviderService();
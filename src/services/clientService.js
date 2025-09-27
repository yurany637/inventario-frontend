import axios from 'axios';
import API_BASE_URL from '../config/api';

const API_URL = `${API_BASE_URL}/api/clientes`;

class ClientService {
  
  getAllClients() {
    return axios.get(API_URL);
  }
  
  getClientById(id) {
    return axios.get(`${API_URL}/${id}`);
  }
  
  createClient(client) {
    return axios.post(API_URL, client);
  }
  
  updateClient(id, client) {
    return axios.put(`${API_URL}/${id}`, client);
  }
  
  deleteClient(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new ClientService();
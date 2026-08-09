import { api } from './api';

const ProductService = {
  getAll: (signal) => api.get('/products', { signal }),
  delete: (id, token) => api.delete(`/products/${id}`, { 
    headers: { Authorization: `Bearer ${token}`}
  }),
}

export { ProductService }
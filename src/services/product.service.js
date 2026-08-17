import { api } from './api';

const ProductService = {
  getAll: (signal, { page = 1, limit = 10 } = {}) => api.get(`/products?page=${page}&limit=${limit}`, { signal }),
  delete: (id, token) => api.delete(`/products/${id}`, { 
    headers: { Authorization: `Bearer ${token}`}
  }),
  update: (id, body, token) => api.patch(`/products/${id}`, body, {
    headers: { Authorization: `Bearer ${token}` }
  }),
}

export { ProductService }
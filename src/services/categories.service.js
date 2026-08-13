import { api } from './api.js'; 

const CategoriesService = { 
  getAll: (signal) => api.get(`/categories`, { signal }),
  delete: (id, token) => api.delete(`/categories/${id}`, {
    headers: { Authorization: `Bearer ${token}`}
  }),
  update: (id, token, body) => api.patch(`categories/${id}`, body, { 
    headers: { Authorization: `Bearer ${token}` }
  }),
  create: (token, body) => api.post(`/categoires`, body, { 
    headers: { Authorization: `Bearer ${token}`}
  }),
}

export { CategoriesService }
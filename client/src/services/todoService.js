
import { createApiWithAuth } from './axiosInstance';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = createApiWithAuth(`${BASE_URL}/api`);
export const todoService = {
  // Todo Lists
  getTodoLists: async () => {
    const response = await api.get('/todos');
    return response.data;
  },

  createTodoList: async (name) => {
    const response = await api.post('/todos', { name });
    return response.data;
  },

  updateTodoList: async (id, name) => {
    const response = await api.put(`/todos/${id}`, { name });
    return response.data;
  },

  deleteTodoList: async (id) => {
    await api.delete(`/todos/${id}`);
  },

  // Todo Items
  getTodoItems: async (todoId) => {
    const response = await api.get(`/todos/${todoId}/items`);
    return response.data;
  },

  createTodoItem: async (todoId, title, description = '') => {
    const response = await api.post(`/todos/${todoId}/items`, { title, description });
    return response.data;
  },

  updateTodoItem: async (todoId, itemId, updates) => {
    const response = await api.put(`/todos/${todoId}/items/${itemId}`, updates);
    return response.data;
  },

  deleteTodoItem: async (todoId, itemId) => {
    await api.delete(`/todos/${todoId}/items/${itemId}`);
  },
};


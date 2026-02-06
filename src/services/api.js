import axios from 'axios';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export const api = {
  // Todos
  getTodos: () => axios.get(`${API_BASE}/todos`),
  getTodo: (id) => axios.get(`${API_BASE}/todos/${id}`),
  
  // Posts
  getPosts: () => axios.get(`${API_BASE}/posts`),
  getPost: (id) => axios.get(`${API_BASE}/posts/${id}`),
  getPostComments: (id) => axios.get(`${API_BASE}/posts/${id}/comments`),
  
  // Users (optional)
  getUsers: () => axios.get(`${API_BASE}/users`),
  getUser: (id) => axios.get(`${API_BASE}/users/${id}`),
};
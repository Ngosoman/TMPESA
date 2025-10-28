import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Your Django backend URL
  timeout: 10000,
});

// Add request interceptor for JWT if needed (already in AuthContext)
export default api;
// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production'  ? '' : 'http://69.197.187.24:5055'; 
// const API_BASE_URL = process.env.NODE_ENV === 'production'  ? '' : 'http://localhost:5055'; 

export const getApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

export default {
  API_BASE_URL,
  getApiUrl
};


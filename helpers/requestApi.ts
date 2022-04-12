import axios from "axios";

const api = axios.create({
  timeout: 10000,
});

api.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => Promise.reject(error)
);

export default api;

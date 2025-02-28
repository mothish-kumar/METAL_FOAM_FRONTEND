import axios from 'axios';
import { navigateToLogin } from '../utils/navigation';

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials:true
})


//set the access token in header
axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        Promise.reject(error)
    }
)
// try on refresh token
let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
  };

axiosInstance.interceptors.request.use(
    (response)=>response,
    async(error)=>{
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
      
            if (!isRefreshing) {
              isRefreshing = true;
              try {
                const { data } = await axiosInstance.post("/auth/refresh-token");
                const newToken = data.accesstoken;
                localStorage.setItem("authToken", newToken);
                onRefreshed(newToken);
                isRefreshing = false;
              } catch (refreshError) {
                console.error("Token refresh failed, redirecting to landing page.");
                localStorage.removeItem("authToken");
                navigateToLogin(); // Redirect to `/`
                isRefreshing = false;
                return Promise.reject(refreshError);
              }
            }
      
            return new Promise((resolve) => {
              refreshSubscribers.push((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(axiosInstance(originalRequest));
              });
            });
          }
      
          return Promise.reject(error);
        }
)

export default axiosInstance;

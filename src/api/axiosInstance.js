import axios from "axios";
import { navigateToLogin } from "../utils/navigation";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Create a separate Axios instance for refreshing tokens
const refreshInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Set the access token in headers before requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Refresh token logic
let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to unauthorized access (401)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark request as retried

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    console.log("Attempting token refresh...");
                    const { data } = await refreshInstance.post("/auth/refreshToken"); // Use separate instance
                    const newToken = data.accesstoken;

                    localStorage.setItem("authToken", newToken);
                    onRefreshed(newToken);
                    isRefreshing = false;
                } catch (refreshError) {
                    console.error("Token refresh failed, redirecting to login.");
                    localStorage.removeItem("authToken");
                    navigateToLogin(); // Redirect user to login
                    isRefreshing = false;
                    return Promise.reject(refreshError);
                }
            }

            // Wait for token refresh to complete, then retry original request
            return new Promise((resolve) => {
                refreshSubscribers.push((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(axiosInstance(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

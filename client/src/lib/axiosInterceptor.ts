import axios from "axios";
import { base } from "./base";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Create axios instance with interceptors
export const setupAxiosInterceptors = () => {
    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // Don't retry if it's the refresh token endpoint itself
            if (originalRequest.url?.includes('/auth/refresh-token')) {
                console.log('❌ Refresh token endpoint failed');
                return Promise.reject(error);
            }

            // Check if error is 401 and we haven't tried to refresh yet
            if (error.response?.status === 401 && !originalRequest._retry) {
                console.log('🔄 401 Error detected, attempting token refresh...');

                if (isRefreshing) {
                    // If already refreshing, queue this request
                    console.log('⏳ Already refreshing, queueing request');
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then(token => {
                            originalRequest.headers['Authorization'] = 'Bearer ' + token;
                            return axios(originalRequest);
                        })
                        .catch(err => {
                            return Promise.reject(err);
                        });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const refreshToken = localStorage.getItem('refreshToken');

                    if (!refreshToken) {
                        console.log('❌ No refresh token found in localStorage');
                        // No refresh token, redirect to login
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        window.location.href = '/login';
                        return Promise.reject(error);
                    }

                    // Call refresh token endpoint
                    const response = await axios.post(`${base}/auth/refresh-token`, {
                        refreshToken: JSON.parse(refreshToken)
                    });

                    const newAccessToken = response.data.data.accessToken;

                    // Save new access token
                    localStorage.setItem('accessToken', JSON.stringify(newAccessToken));

                    // Update authorization header
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
                    originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;

                    // Process queued requests
                    processQueue(null, newAccessToken);

                    isRefreshing = false;

                    // Retry original request
                    return axios(originalRequest);
                } catch (err) {
                    // Refresh token failed, clear tokens and redirect to login
                    processQueue(err, null);
                    isRefreshing = false;

                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';

                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }
    );
};

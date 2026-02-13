/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const axiosInstance = axios.create({
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        return Promise.reject(error);
    }
);

export const apiConnector = (
    method: string,
    url: string,
    bodyData: any = null,
    headers: Record<string, string> = {},
    params: Record<string, any> = {}
) => {
    return axiosInstance({
        method,
        url,
        data: bodyData,
        headers,
        params
    })
}
import axios from "axios";
import { toast } from 'react-toastify';
import { backend } from "../common/constants";

export const publicGateway = axios.create({
    baseURL: backend,
    headers: {
        "Content-Type": "application/json"
    }
});

export const privateGateway = axios.create({
    baseURL: backend,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a request interceptor
privateGateway.interceptors.request.use(
    function (config) {
        // Check if the browser is online
        if (!navigator.onLine) {
            toast.error("Network Error. Please check your internet connection.", {
                position: "bottom-center",
                theme: "dark"
            });

            // Returning a rejected promise will prevent the request from being sent
            return Promise.reject("No internet connection");
        }

        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle network errors
privateGateway.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (!error.response && !error.status) {
            // No response and no error status, indicating a network issue
            toast.error("Network Error. Please check your internet connection.", {
                position: "bottom-center",
                theme: "dark"
            });

            return Promise.resolve({
                status: 200,
            });
        } else if (error.response?.data?.resCode === 2215) {
            // Handle specific error code
            toast.error(error.response?.data?.message + error?.response?.data?.description, {
                position: "bottom-center",
                theme: "dark"
            });

            // Wait for 3 seconds
            setTimeout(() => {
                localStorage.clear();
                window.location.href = "/login";
            }, 3000);

            return Promise.resolve({
                status: 200,
            });
        } else if (error.response?.data?.resCode === 403) {
            // Handle specific error code
            toast.error(error.response?.data?.message + error?.response?.data?.description, {
                position: "bottom-center",
                theme: "dark"
            });

            // Wait for 3 seconds
            setTimeout(() => {
                localStorage.clear();
                window.location.href = "/login";
            }, 3000);

            return Promise.resolve({
                status: 200,
            });
        }else {
            return Promise.reject(error);
        }
    }
);
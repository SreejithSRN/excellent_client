import axios, { AxiosError,AxiosRequestConfig, Method } from "axios"


export const URL:string = import.meta.env.VITE_API_GATEWAY_URL

const appInstance= axios.create({
    baseURL:URL,
    withCredentials:true
})

export interface ApiResponse<T>{
    success:boolean;
    message:string;
    data:T;
}

appInstance.interceptors.response.use(
    (response)=>(response.data),
    (error:AxiosError)=>{
        console.error("Request Failed:", error.response?.data || error.message)
        return Promise.reject(error)
    }
)

export const commonRequest = async <T, B = unknown>(
    method: Method,
    route: string,
    body?: B,
    config: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> => {
    const requestConfig: AxiosRequestConfig = {
        method,
        url: route,
        data: body,
        headers: config.headers,
        withCredentials: true
    };

    try {
        return await appInstance(requestConfig);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            // Check if the error response has a message from the backend
            const errorMessage = error.response?.data?.message || "Something went wrong";
            console.error("Error response:", errorMessage);
            // You could also show this error in your UI directly here
            throw new Error(errorMessage);  // Throw a new error with the backend message
        } else {
            console.error("Unexpected error:", error);
            throw new Error("An unexpected error occurred.");
        }
    }
};
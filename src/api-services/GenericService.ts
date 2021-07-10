import axios, { AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from "axios";

class GenericService {
    private axios: AxiosInstance;
    constructor(
        config: AxiosRequestConfig,
        requestIntercepters?: AxiosInterceptorManager<AxiosRequestConfig>,
        responseIntercepters?: AxiosInterceptorManager<AxiosResponse<any>>
    ) {
        this.axios = axios.create(config);
        if (requestIntercepters) this.axios.interceptors.request = requestIntercepters;
        if (responseIntercepters) this.axios.interceptors.response = responseIntercepters;
    }

    protected get = (url?: string, params?: any) =>
        this.axios.get(url || "", {
            params: { ...params },
        });

    protected delete = (url?: string, params?: any) =>
        this.axios.delete(url || "", {
            params: { ...params },
        });

    protected post = (url?: string, data?: any, params?: any) =>
        this.axios.post(url || "", data, {
            params: { ...params },
        });

    protected put = (url?: string, data?: any, params?: any) =>
        this.axios.put(url || "", data, {
            params: { ...params },
        });
}

export default GenericService;

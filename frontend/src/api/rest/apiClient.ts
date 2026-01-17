import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  public static getInstance(baseURL?: string): ApiClient {
    if (!ApiClient.instance) {
      if (!baseURL) {
        throw new Error('BaseURL is required for first initialization');
      }
      ApiClient.instance = new ApiClient(baseURL);
    } else {
      console.log('ApiClient instance already exists. Returning the existing instance.');
    }
    return ApiClient.instance;
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }
}

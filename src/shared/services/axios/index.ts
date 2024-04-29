import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class AxiosConfig {
  private instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.instance.interceptors.response.use((response : any) => response, (error: Error) => {
        return Promise.reject(error)
      }
    )
  }

  public getInstance(): AxiosInstance {
    return this.instance
  }

  public setHeaders(headers: any): void {
    this.instance.defaults.headers = { ...this.instance.defaults.headers, ...headers };
  }
  public setParams(params: AxiosRequestConfig['params']): void {
    this.instance.defaults.params = { ...this.instance.defaults.params, ...params };
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config)
    return response.data
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config)
    return response.data
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config)
    return response.data
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config)
    return response.data
  }
}
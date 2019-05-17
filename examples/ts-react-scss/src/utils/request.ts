import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError
} from 'axios';

export interface IAPI {
  getInstance(): AxiosInstance;
}

export default class API implements IAPI {
  private api: AxiosInstance = null;

  private created(config: AxiosRequestConfig): void {
    this.api = axios.create(config);
  }

  private handleInterceptors() {
    this.api.interceptors.request.use((res: AxiosResponse) => {
      return res
    }, (err: AxiosError) => {
      return Promise.reject(err);
    });

    this.api.interceptors.response.use(async (res: AxiosResponse) => {
      // @todo
      return res
    }, (err: AxiosError) => {
      return Promise.reject(err);
    })
  }

  constructor(config: AxiosRequestConfig) {
    this.created(config);
    this.handleInterceptors();
  }

  public getInstance(): AxiosInstance {
    return this.api;
  }
}

export const mainAPI = new API({
  baseURL: `//${document.domain}/app`
}).getInstance();


import axios from 'axios';

export default class API {
  api = null;

  created(config) {
    this.api = axios.create(config);
  }

  handleInterceptors() {
    this.api.interceptors.request.use((res) => {
      return res
    }, (err) => {
      return Promise.reject(err);
    });

    this.api.interceptors.response.use(async (res) => {
      // @todo
      return res
    }, (err) => {
      return Promise.reject(err);
    })
  }

  constructor(config) {
    this.created(config);
    this.handleInterceptors();
  }

  getInstance() {
    return this.api;
  }
}

export const mainAPI = new API({
  baseURL: `//${document.domain}/app`
}).getInstance();


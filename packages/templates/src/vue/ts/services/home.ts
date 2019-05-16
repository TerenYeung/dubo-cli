import {
  AxiosRequestConfig
} from 'axios';

import {mainAPI as API} from 'utils/request';

const getHome = async (config: AxiosRequestConfig): Promise<any> => API.get('/home', {...config})

export default {
  getHome
}
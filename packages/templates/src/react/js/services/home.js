import {mainAPI as API} from 'utils/request';

const getHome = async (config) => API.get('/home', {...config})

export default {
  getHome
}
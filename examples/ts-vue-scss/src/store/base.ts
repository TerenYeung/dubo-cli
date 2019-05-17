import api from 'services';
// import {Toast} from 'mint-ui';

export default class BaseStore {
  protected $api = api;
  protected $message = null;
  protected $toast = {};
}
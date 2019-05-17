import Vue from 'vue';
import Component from 'vue-class-component';
import api from 'services';
// import {Toast} from 'mint-ui';

@Component
export default class BaseVue extends Vue {
  protected assetsPath = `${process.env.assetsPath}`;
  protected nativeService = new (window as any).nativeService();
  protected $share: any; // 对于绑定到 Vue 实例上的对象，必须通过插件形式进行绑定；
  protected $store: any;
  protected $api: any = api;
  protected $toast: any = {};
  protected  defaultAvatar: string = '';

  beforeMount() {
    this.$api = api;
    this.$toast = {};
    this.defaultAvatar = `${this.assetsPath}img/joyrun-logo.png`
  }
}
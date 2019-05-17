import store from 'store';
const Store: any = {}

Store.install = function(Vue) {
  Vue.prototype.$store = store;
}

export default Store;
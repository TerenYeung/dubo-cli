import 'babel-polyfill';
import Vue from 'vue';
import router from './router';
import App from 'App.vue';
import utils from 'utils';
import 'styles/index.scss';

utils.setRootFontSizeFromClient();

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

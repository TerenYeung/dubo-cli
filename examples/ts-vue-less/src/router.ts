import Vue from 'vue';
import Router from 'vue-router';
import Index from 'pages/Index/index.vue';

Vue.use(Router);

export default new Router({
  mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    }
  ],
});

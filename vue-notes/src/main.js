// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import store from './store';
import VueResource from 'vue-resource';

Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  store,
  VueResource,
  components: { App }
})

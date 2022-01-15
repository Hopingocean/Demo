import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import routes from './router';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes
});

import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'app-vue',
    entry: '//localhost:8080',
    container: '#app',
    activeRule: '/app-vue'
  }
])
// start qiankun
start();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

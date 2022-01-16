import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import routes from './router';

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';


Vue.use(VueRouter);
Vue.use(ViewUI);

const router = new VueRouter({
  mode: 'history',
  routes
});

import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'app-vue',
    entry: '//localhost:8081',
    container: '#container',
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

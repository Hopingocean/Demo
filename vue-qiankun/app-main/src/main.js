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
    entry: '//localhost:8888',
    container: '#container',
    activeRule: '/app-vue'
  },
  {
    name: 'ebr',
    entry: '//localhost:8082',
    container: '#container',
    activeRule: '/ebr'
  },
  {
    name: 'visual',
    entry: '//localhost:8083',
    container: '#container',
    activeRule: '/visual'
  }
])
// start qiankun
start({
  sandbox: true
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

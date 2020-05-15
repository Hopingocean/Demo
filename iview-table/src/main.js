import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import router from './router/index'
import mixin from './libs/mixin'

Vue.config.productionTip = false

Vue.use(ViewUI)
Vue.mixin(mixin)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

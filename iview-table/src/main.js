import Vue from 'vue'
import App from './App.vue'
// import { Table } from 'view-design'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false

// Vue.component('Table', Table)
Vue.use(ViewUI)

new Vue({
  render: h => h(App),
}).$mount('#app')

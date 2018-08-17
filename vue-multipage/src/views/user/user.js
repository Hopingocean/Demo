import Vue from 'vue'
import User from './User.vue'

import 'weixin-js-sdk'
import 'lib-flexible'
import '@/assets/css/common.css'

new Vue({
  el: '#app',
  components: {
    User
  },
  template: '<User/>'
})

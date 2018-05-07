import Vue from 'vue'
import router from './router'
import Gift from './Gift.vue'

import wxJsSdk from 'weixin-js-sdk'
import flexiable from 'lib-flexible'
import '@/assets/css/common.css'

new Vue({
    el: '#app',
    router,
    components: { Gift },
    template: '<Gift/>'
})
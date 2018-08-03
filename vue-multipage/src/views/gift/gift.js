import Vue from 'vue'
import router from './router'
import Gift from './Gift.vue'

import 'weixin-js-sdk'
import 'lib-flexible'
import '@/assets/css/common.css'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '',
    loading: '',
    attempt: 1
})

new Vue({
    el: '#app',
    router,
    components: { Gift },
    template: '<Gift/>'
})
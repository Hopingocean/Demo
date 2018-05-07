import Vue from 'vue'
import router from './router'
import Classify from './Classify.vue'

import wxJsSdk from 'weixin-js-sdk'
import flexiable from 'lib-flexible'
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
    components: { Classify },
    template: '<Classify/>'
})
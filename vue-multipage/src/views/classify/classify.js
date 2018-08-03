import Vue from 'vue'
import router from './router'
import Classify from './Classify.vue'

import 'weixin-js-sdk'
import 'lib-flexible'
import '@/assets/css/common.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css'

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
import Vue from 'vue'
import ActivityDetail from './ActivityDetail.vue'

import wxJsSdk from 'weixin-js-sdk'
import flexiable from 'lib-flexible'
import '@/assets/css/common.css'

new Vue({
    el: '#app',
    components: { ActivityDetail },
    template: '<ActivityDetail/>',
})
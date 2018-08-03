import Vue from 'vue'
import ActivityDetail from './ActivityDetail.vue'

import 'weixin-js-sdk'
import 'lib-flexible'
import '@/assets/css/common.css'

new Vue({
    el: '#app',
    components: { ActivityDetail },
    template: '<ActivityDetail/>',
})
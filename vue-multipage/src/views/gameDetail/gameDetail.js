import Vue from 'vue'
import GameDetail from './GameDetail.vue'

import wxJsSdk from 'weixin-js-sdk'
import flexiable from 'lib-flexible'
import '@/assets/css/common.css'

new Vue({
    el: '#app',
    components: { GameDetail },
    template: '<GameDetail/>'
})
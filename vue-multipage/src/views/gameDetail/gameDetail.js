import Vue from 'vue'
import GameDetail from './GameDetail.vue'

import 'weixin-js-sdk'
import 'lib-flexible'
import '@/assets/css/common.css'

new Vue({
    el: '#app',
    components: { GameDetail },
    template: '<GameDetail/>'
})
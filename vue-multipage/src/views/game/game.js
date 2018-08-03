import Vue from 'vue'
import Game from './Game.vue'
import router from './router'

import 'weixin-js-sdk'
import 'lib-flexible'

import '@/assets/css/common.css'

// sdk
import '../../../static/sdk/css/yawy.css'
import '../../../static/sdk/js/yawy'

new Vue({
    el: '#app',
    router,
    components: { Game },
    template: '<Game/>'
})
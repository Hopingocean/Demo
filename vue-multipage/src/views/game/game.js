import Vue from 'vue'
import Game from './Game.vue'
import router from './router'

import wxJsSdk from 'weixin-js-sdk'
import flexiable from 'lib-flexible'

import '@/assets/css/common.css'

new Vue({
    el: '#app',
    router,
    components: { Game },
    template: '<Game/>'
})
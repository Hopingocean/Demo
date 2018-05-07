import Vue from 'vue'
import User from './User.vue'

import wxJsSdk from 'weixin-js-sdk'
import purecss from 'purecss'
import flexiable from 'lib-flexible'
import '@/assets/css/common.css'

new Vue({
    el: '#app',
    components: { User },
    template: '<User/>'
})
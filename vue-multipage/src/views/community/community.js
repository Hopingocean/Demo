import Vue from 'vue'
import Community from './Community.vue'

import purecss from 'purecss'
import flexiable from 'lib-flexible'
import '@/assets/css/common.css'

new Vue({
    el: '#app',
    components: { Community },
    template: '<Community/>',
})
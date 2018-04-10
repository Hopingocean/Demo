import Vue from 'vue'
import Gift from './Gift.vue'

import purecss from 'purecss'
import flexiable from 'lib-flexible'
import '@/assets/css/common.css'

new Vue({
    el: '#app',
    components: { Gift },
    template: '<Gift/>'
})
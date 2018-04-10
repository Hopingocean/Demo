import Vue from 'vue'
import Classify from './Classify.vue'

import purecss from 'purecss'
import flexiable from 'lib-flexible'
import '@/assets/css/common.css'

new Vue({
    el: '#app',
    components: { Classify },
    template: '<Classify/>'
})
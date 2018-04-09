import Vue from 'vue'
import Setting from './Setting.vue'

import purecss from 'purecss'
import flexiable from 'lib-flexible'
import '../../assets/css/common.css'

new Vue({
    el: '#app',
    components: { Setting },
    template: '<Setting/>'
})
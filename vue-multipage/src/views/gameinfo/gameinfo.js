import Vue from 'vue'
import GameInfo from './GameInfo.vue'

import purecss from 'purecss'
import flexiable from 'lib-flexible'
import '@/assets/css/common.css'

new Vue({
    el: '#app',
    components: { GameInfo },
    template: '<GameInfo/>'
})
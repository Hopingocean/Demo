import Vue from 'vue'
import Game from './Game.vue'
import router from './router'

import purecss from 'purecss'
import flexiable from 'lib-flexible'

import '@/assets/css/common.css'

new Vue({
    el: '#app',
    router,
    components: { Game },
    template: '<Game/>'
})
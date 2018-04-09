import Vue from 'vue'
import Ranking from './Ranking.vue'

import purecss from 'purecss'
import flexiable from 'lib-flexible'
import '../../assets/css/common.css'

new Vue({
    el: '#app',
    components: { Ranking },
    template: '<Ranking/>'
})
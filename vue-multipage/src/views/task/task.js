import Vue from 'vue'
import Task from './Task.vue'

import purecss from 'purecss'
import flexiable from 'lib-flexible'
import '../../assets/css/common.css'

new Vue({
    el: '#app',
    components: { Task },
    template: '<Task/>'
})
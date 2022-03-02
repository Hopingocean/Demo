import { createApp } from 'vue'
import App from './App.vue'
import { directives } from '@/directive'

createApp({
  App,
  directives
}).mount('#app')

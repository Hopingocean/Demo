import { createApp } from 'vue'
import App from './App.vue'
// import directives from './directive/index.js'
import i18nPlugin from './plugins/i18n.js'

const app = createApp(App)
// app.use(directives);
app.use(i18nPlugin, {
    greetings: {
        hello: 'Bonjour!'
    }
});

app.mount('#app')

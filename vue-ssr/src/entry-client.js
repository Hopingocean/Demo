/**
 * 
 * 客户端entry只需创建应用程序，并将其挂载到DOM中
 */

 import { createApp } from './app'

//  客户端特定引导逻辑
const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
// 假设App.vue模板中根元素具有id=app
router.onReady(() => {
    app.$mount('#app')
})

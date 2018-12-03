/**
 * 
 * 客户端entry只需创建应用程序，并将其挂载到DOM中
 */

 import { createApp } from './app'

//  客户端特定引导逻辑
const { app } = createApp()
// 假设App.vue模板中根元素具有id=app
app.$mount('#app')
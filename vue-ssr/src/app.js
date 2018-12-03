/**
 * 
 * 通用entry
 */

 import Vue from 'vue'
 import App from './App.vue'
 import { createRouter } from './router'

//  导出一个工厂函数，用于创建新的应用程序、router和store实例
export function createApp() {
    // 创建router实例
    const router = createRouter()

    const app = new Vue({
        // 注入router到根vue实例
        router,
        // 根实例简单的渲染应用程序组件
        render: h => h(App)
    })

    // 返回app和router
    return { app, router }
}
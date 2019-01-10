/**
 * 
 * 服务器entry使用default export导出函数，并在每次渲染中重复调用此函数
 */

 import { createApp } from './app'

 export default context => {
    // 因为有可能是异步路由钩子函数或组件，所以返回promise以便服务器能够等待所有的内容在渲染前就准备就绪
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()
        // 设置服务器router的位置
        router.push(context.url)

        // 等到router将所有异步组件和钩子函数解析完毕
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // 匹配不到的路由，执行reject函数，并返回404
            if (!matchedComponents.length) {
                return reject({ code: 404})
            }

            // 对所有匹配的路由组件调用asyncDate()
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                // 在所有预取钩子（preFetch hook）resolve后，
                // 我们的store现在已经填充如渲染应用程序所需的状态
                // 当我们将状态附加到上下文
                // 并且将template选项用于renderer时，
                // 状态将自动序列化为window.__INITIAL_STATE__,并注入HTML
                context.state = store.state

                // Promise应该resolve应用程序实例，以便它可以渲染
                resolve(app)
            }).catch(reject)
        }, reject)
    })
    
 }
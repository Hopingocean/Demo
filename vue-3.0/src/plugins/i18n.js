// i18n
export default {
    install: (app, options) => {
        // 注入一个全局可用的translate方法,通过添加到app.config.globalProperties上实现
        app.config.globalProperties.$translate = (key) => {
            // 获取options对象的深层属性，使用key作为索引
            return key.split('.').reduce((o, i) => {
                if (o) {
                    return o[i];
                }
            }, options);
        }
        // 通过provide为插件用户提供一些内容
        app.provide('i18n', options);
    }
}
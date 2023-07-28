// 防抖，出发高频事件后n秒内只执行最后一次或立即执行
export const debounce = (fn, delay = 1000, immediate) => {
    let timer = null;
    return function () {
        const context = this;
        timer && clearTimeout(timer);
        if (immediate) {
            !timer && fn.apply(context, arguments);
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    }
}

// 节流，n秒内只触发一次
export const throttle = (fn, delay = 1000) => {
    let startTime = new Date();
    return () => {
        const context = this;
        let curTime = new Date();
        if (curTime - startTime >= delay) {
            fn.apply(context, arguments);
            startTime = curTime;
        }
    }
}

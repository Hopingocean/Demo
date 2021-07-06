function cb (val) {
  // 渲染视图
  console.log('双向绑定源码：', val);
}

// 对象属性监听
function defineReactive (obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true, // 属性可枚举
    configurable: true, // 属性可被修改或删除
    get: function reactiveGetter () {
      return val; // 实际上会进行依赖收集
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val) return;
      cb(newVal);
    }
  })
}

// 可观察的对象
function observer (value) {
  if (!value || (typeof value !== 'object')) {
    return;
  }
  Object.keys(value).forEach((key) => {
    defineReactive(value, key, value[key]);
  });
}

// 初始化
class Vue {
  // Vue构造类
  constructor(options) {
    this._data = options.data;
    observer(this._data);
  }
}

// 初始化
let o = new Vue({
  data: {
    test: 'I am test.'
  }
});
o._data.test = "Hello world.";

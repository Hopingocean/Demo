function cb (val) {
  // 渲染视图
  console.log('双向绑定源码：', val);
}

// 对象属性监听
function defineReactive (obj, key, val) {
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true, // 属性可枚举
    configurable: true, // 属性可被修改或删除
    get: function reactiveGetter () {
      // 将Dep.target(即当前Watcher对象存入dep的subs中)
      dep.addSub(Dep.target);
      return val; // 依赖收集
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val) return;
      // cb(newVal);
      // set时触发dep的notify来通知所有Watcher对象更新视图
      dep.notify();
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

// 订阅者
class Dep {
  constructor () {
    // 存放watcher对象
    this.subs = [];
  }

  // 添加watcher对象
  addSub (sub) {
    this.subs.push(sub);
  }

  // 通知所有watcher对象更新视图
  notify () {
    this.subs.forEach(sub => {
      sub.update();
    })
  }
}

// 观察者
class Watcher {
  constructor () {
    // new一个watcher对象时将该对象赋值给Dep.target
    Dep.target = this;
  }

  // 更新视图的方法
  update () {
    console.log("视图更新了");
  }
}

Dep.target = null;

// 初始化
class Vue {
  // Vue构造类
  constructor(options) {
    this._data = options.data;
    observer(this._data);
    // 新建一个Watcher观察者对象，Dep.target会指向Watcher对象
    new Watcher();
    // 触发render渲染
    console.log('render', this._data.test);
  }

}

// 初始化
let o = new Vue({
  data: {
    test: 'I am test.'
  }
});
o._data.test = "Hello world.";

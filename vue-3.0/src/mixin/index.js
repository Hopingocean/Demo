// mixin
// 1. 当组件和mixin对象，data函数发生冲突时，会以组件自身的数据优先
export default {
  data () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  },
  created () {
    console.log(this.$data);
  },
  // 值为对象的选项，如methods/components/directives,将被合并为同一个对象，两个对象键名冲突时，取组件对象的键值对
  methods: {
    conflicting () {
      console.log('from mixin');
    }
  }
}
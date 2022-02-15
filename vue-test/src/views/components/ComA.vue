<template>
  <div class="com_a"></div>
</template>

<script>
export default {
  name: 'ComA',
  props: {
    // 基础类型检查，null、undefined会通过任何类型检查
    propA: Number,
    propB: [String, Number],
    // 必填字符串
    propC: {
      type: String,
      required: true
    },
    // 默认值数字
    propD: {
      type: Number,
      default: 100
    },
    // 默认值对象
    propE: {
      type: Object,
      // 对象或数组的默认值必须从一个工厂函数返回
      default() {
        return {message: 'hello'}
      } 
    },
    // 自定义验证函数
    propF: {
      validator(value) {
        return value;
      }
    },
    // 具有默认值的函数
    propG: {
      type: Function,
      // 与对象或数组不通，这不是一个工厂函数，这是一个用作默认值的函数
      default() {
        return 'default function value'
      }
    }
  }
}
</script>

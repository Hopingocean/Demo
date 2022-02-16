<template>
  <input type="text" :value="modelValue" @input="emitValue">
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
    },
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: {
    // 验证submit事件
    submit: ({email, password}) => {
      if (email && password) {
        return true;
      } else {
        console.warn('Invalid submit');
        return false;
      }
    }
  },
  created() {
    console.log(this.modelModifiers);
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', {email, password});
    },
    emitValue(e) {
      let value = e.target.value;
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
      this.$emit('update:modelValue', value);
    }
  }
}
</script>

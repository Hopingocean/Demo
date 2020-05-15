<template>
  <div class="watch">
    <h3>深度监听：</h3>
    <div>obj1:{{title1}}
      <input :value="'a:' + obj1.a">
      <input :value="'b:' + obj1.b">
    </div>
    <h3>普通监听：</h3>
    <div>obj2:{{title2}}
      <input :value="'a:' + obj2.a">
      <input :value="'b:' + obj2.b">
    </div>
    <button @click="modifyKey()">modify</button>
    <button @click="addKey()">add</button>
    <button @click="removeKey()">remove</button>
    <button @click="reset()">reset</button>
    <div>
      测试结果：
      <ul>
        <li>添加新的属性都不能触发监听</li>
        <li>对象赋值相同值后都能触发监听，且前值和后值相同</li>
        <li>移除旧的属性，深度监听可以触发监听，非深度监听则不能触发</li>
        <li>修改旧的属性，深度监听可以触发监听，非深度监听则不能触发</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppWatch',
  data() {
    return {
      obj1: {
        a: 1
      },
      obj2: {
        a: 1
      },
      title1: '',
      title2: ''
    }
  },
  watch: {
    obj1: {
      handler(newVal, oldVal) {
        console.log('obj1', newVal, oldVal);
        this.title1 = 'obj1监听触发';
      },
      deep: true
    },
    obj2(newVal, oldVal) {
      console.log('obj2', newVal, oldVal);
      this.title2 = 'obj2监听触发';
    }
  },
  mounted() {},
  methods: {
    modifyKey () {
      this.obj1.a = 'modify';
      this.obj2.a = 'modify';
    },
    addKey() {
      this.obj1.b = 'add';
      this.obj2.b = 'add';
    },
    removeKey() {
      this.obj1.a = 'remove';
      this.obj2.a = 'remove';
    },
    reset() {
      this.obj1 = {
        a: 1
      };
      this.obj2 = {
        a:1
      }
    }
  }
}
</script>
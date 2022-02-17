<template>
  <div class="com_watch"></div>
</template>

<script>
import { reactive, watch, watchEffect } from 'vue'
export default {
  name: 'ComWatch',
  setup () {
    const state = reactive({
      id: 1,
      attribute: {
        name: ''
      }
    });
    // 非深度监听
    watch(() => state, (state, preState) => {
      console.log('not deep', state.attribute.name, preState.attribute.name);
    });
    // 深度监听
    watch(() => state, (state, preState) => {
      console.log('deep', state.attribute.name, preState.attribute.name);
    }, {deep: true});

    // 根据响应式状态自动应用和重新应用副作用，它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数
    watchEffect(() => console.log('effect', state.attribute.name));

    // onMounted(state.attribute.name = 'Alex');

    return {
      state
    }
  },
  mounted () {
    this.state.attribute.name = 'Alex';
  }
}
</script>

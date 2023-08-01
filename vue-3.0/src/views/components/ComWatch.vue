<script setup>
import { ref, watch, watchEffect } from "vue";
const state = ref({
  id: 1,
  attribute: {
    name: "",
  },
});
const count = ref(0);
// 非深度监听
watch(
  () => state,
  (newState, preState) => {
    console.log(
      "not deep",
      newState.value.attribute.name,
      preState.value.attribute.name
    );
  }
);
// 深度监听
watch(
  () => state,
  (newState, preState) => {
    console.log(
      "deep",
      newState.value.attribute.name,
      preState.value.attribute.name
    );
  },
  { deep: true }
);
// 监听多个数据源
watch(
  [state, count],
  ([newState, newCount], [oldState, oldCount]) => {
    console.log(
      newState.attribute.name,
      newCount,
      oldState.attribute.name,
      oldCount
    );
  },
  {
    deep: true,
  }
);

// 根据响应式状态自动应用和重新应用副作用，它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数
watchEffect(() => console.log("effect", state.value.attribute.name));

const changeState = () => {
  state.value.attribute.name = "xxx";
};

const changeCount = () => {
  count.value++;
};
// onMounted((state.value.attribute.name = "Alex"));
</script>
<template>
  <div class="com_watch">
    <button @click="changeState">state</button>
    <button @click="changeCount">count</button>
  </div>
</template>

<script>
// import { ref, reactive, watch, watchEffect } from "vue";
// export default {
// name: "ComWatch",
// setup() {
//   const state = reactive({
//     id: 1,
//     attribute: {
//       name: "",
//     },
//   });
//   const count = ref(0);
//   // 非深度监听
//   watch(
//     () => state,
//     (state, preState) => {
//       console.log("not deep", state.attribute.name, preState.attribute.name);
//     }
//   );
//   // 深度监听
//   watch(
//     () => state,
//     (state, preState) => {
//       console.log("deep", state.attribute.name, preState.attribute.name);
//     },
//     { deep: true }
//   );
//   // 监听多个数据源
//   watch(
//     [state, count],
//     ([newState, newCount], [oldState, oldCount]) => {
//       console.log(
//         newState.attribute.name,
//         newCount,
//         oldState.attribute.name,
//         oldCount
//       );
//     },
//     {
//       deep: true,
//     }
//   );

//   // 根据响应式状态自动应用和重新应用副作用，它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数
//   watchEffect(() => console.log("effect", state.attribute.name));

//   const changeState = () => {
//     state.attribute.name = "xxx";
//   };

//   const changeCount = () => {
//     count.value++;
//   };

//   return {
//     state,
//     changeState,
//     changeCount,
//   };
// },
// };
//
</script>

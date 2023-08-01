<!-- 内置组件，transition -->
<script setup>
import { defineProps } from "vue";
defineProps({
  name: {
    type: String,
    default: "slide-fade",
  },
});
</script>
<template>
  <Transition
    :name="name"
    mode="out-in"
    appear
    @enter="onEnter"
    @leave="onLeave"
  >
    <slot></slot>
  </Transition>
</template>

<script>
export default {
  name: "ComTransition",
  methods: {
    onEnter() {},
    onLeave() {},
  },
};
</script>

<style>
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
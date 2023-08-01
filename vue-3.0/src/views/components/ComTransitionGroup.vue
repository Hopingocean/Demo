<template>
  <TransitionGroup name="list" tag="ul">
    <slot></slot>
  </TransitionGroup>
</template>

<script>
export default {
  name: "ComTransitionGroup",
  data() {
    return {
      items: [
        {
          id: 1,
          name: "aaa",
        },
      ],
    };
  },
};
</script>

<style>
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>

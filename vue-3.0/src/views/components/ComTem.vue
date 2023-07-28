<template>
  <div class="tem" ref="root">This is a root element</div>
</template>

<script>
import { ref, onMounted, h } from "vue";
export default {
  name: "ComTem",
  setup() {
    // 模板引用
    const root = ref(null);
    onMounted(() => {
      // Dom元素将在初始选然后分配给ref
      console.log(root.value);
    });
    // return { root };

    return () =>
      h("div", {
        ref: root,
      });

    // JSX使用
    // return () => <div ref={root}></div>;
  },
};
</script>
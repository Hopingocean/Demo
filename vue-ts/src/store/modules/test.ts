import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTestStore = defineStore("testStore", () => {
  // state
  const count = ref<number>(1);
  // getter
  const dobuleCount = computed(() => count.value * 2);
  // action
  const increment = () => {
    count.value++;
  };
  // 异步action
  const list = ref<number[]>([]);
  const getList = () => {
    setTimeout(() => {
      return [1, 2, 3];
    });
  };
  return { count, dobuleCount, increment, getList };
});

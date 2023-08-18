<script setup lang="ts">
import $bus from "@/bus/";
import { onMounted } from "vue";
onMounted(() => {
  $bus.on("toChild2", (str) => {
    console.log(str);
  });
});
</script>
<template>
  <button>child2</button>
</template>

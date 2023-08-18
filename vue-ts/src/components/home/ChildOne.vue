<script setup lang="ts">
import $bus from "@/bus/";
const emitChild2 = () => {
  $bus.emit("toChild2", "child1");
};
</script>
<template>
  <button @click="emitChild2">child1</button>
</template>

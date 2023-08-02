<script setup lang="ts">
import { ref } from 'vue'
// ref泛型参数,如果只指定了一个类型并且未指定默认值，最后会得到一个包含undefined的联合类型<number|undefined>
// computed也可以使用泛型参数指定类型
// reactive需要处理深层次ref解包的返回值，不推荐使用泛型参数，可以使用接口显示的指定变量的类型
const count = ref<number | string>(10);
count.value = '100';
// defineProps<{
//   msg: string
// }>()

// props解构默认值
interface Props {
  msg: string
  age?: number
  labels?: string[]
}
// 复杂的props声明
interface Book {
  title: string
  author: string
  year: number
}
// defineProps<Props>();
// defineProps<{book: Book}>();
const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['a', 'b']
})

// 建议显式的为事件处理函数的参数标注类型，另外在访问event属性时可能需要使用类型断言
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg + labels }}</h1>
    <input type="text" @change="handleChange" />
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

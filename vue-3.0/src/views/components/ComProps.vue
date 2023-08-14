<template>
  <div>items:{{ itemsLength }}</div>
  <input type="text" :value="modelValue" @input="emitValue" />
  <button @click="sendMessage">sendMsg</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
interface Book {
  title: string;
  year?: number;
}
export default defineComponent({
  name: "ComA",
  props: {
    bookA: {
      type: Object as PropType<Book>,
      // 如果你的 TypeScript 版本低于 4.7，确保使用箭头函数
      default: () => ({
        title: "Arrow Function Expression"
      }),
      validator: (book: Book) => !!book.title
    },
    // 基础类型检查，null、undefined会通过任何类型检查
    propA: Number,
    propB: [String, Number],
    // 必填字符串
    propC: {
      type: String,
      required: true
    },
    // 默认值数字
    propD: {
      type: Number,
      default: 100
    },
    // 默认值对象
    propE: {
      type: Object,
      // 对象或数组的默认值必须从一个工厂函数返回
      default() {
        return { message: "hello" };
      }
    },
    // 自定义验证函数
    // propF: {
    //   validator: (value) => {
    //     return value;
    //   },
    // },
    // 具有默认值的函数
    propG: {
      type: Function,
      // 与对象或数组不通，这不是一个工厂函数，这是一个用作默认值的函数
      default() {
        return "default function value";
      }
    },
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    },
    firstNameValue: String,
    firstNameModifiers: {
      default: () => ({})
    }
  },
  emits: {
    addBook(payload: { bookName: string }) {
      // 执行运行时校验
      return payload.bookName.length > 0;
    },
    // 验证submit事件
    submit: ({ email, password }) => {
      if (email && password) {
        return true;
      } else {
        console.warn("Invalid submit");
        return false;
      }
    }
  },
  created() {
    console.log(this.modelModifiers);
  },
  methods: {
    submitForm(email, password) {
      this.$emit("submit", { email, password });
    },
    emitValue(e) {
      let value = e.target.value;
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
      this.$emit("update:modelValue", value);
    }
  }
});
</script>

<script setup>
import { defineEmits, defineExpose, inject } from "vue";
const emit = defineEmits(["send-message"]);
const sendMessage = () => {
  emit("send-message", "leeo");
};
defineExpose({
  sendMessage
});
const itemsLength = inject("itemsLength");
</script>

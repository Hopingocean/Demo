<template>
  <div id="app">
    <input v-focus />
    <ComProps
      ref="comProps"
      v-model.capitalize="myText"
      v-model:first-name.upper="firstName"
      @sendMessage="getMessage"
    ></ComProps>
    <p>{{ myName }}</p>
    {{ myText + $translate("greetings.hello") }}
    <ComSlot :items="items">
      <template v-slot:header>
        <h1>header</h1>
      </template>
      <template v-slot:default="slotProps">
        <p>{{ slotProps.name }}</p>
      </template>
      <template #footer="footerProps">
        <p>{{ footerProps.msg }}</p>
      </template>
    </ComSlot>
    <AsyncComp>
      <template v-slot:header>
        <h2>header2</h2>
      </template>
    </AsyncComp>
    <ComSetup></ComSetup>
    <ComWatch></ComWatch>
    <p @click="store.increment()">{{ store.count }}</p>
    <ComAttrs
      class="my-attrs"
      :myText="myText"
      :items="items"
      @click="onClick"
    ></ComAttrs>
    <button @click="show = !show">fade</button>
    <ComTransition>
      <div v-if="show">Hello</div>
    </ComTransition>
    <ComTransitionGroup>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ComTransitionGroup>
    <ComTeleport></ComTeleport>
  </div>
</template>

<script>
// import { defineAsyncComponent, inject } from "vue";
import ComProps from "@/views/components/ComProps.vue";
import ComSlot from "@/views/components/ComSlot.vue";
import ComSetup from "@/views/components/ComSetup.vue";
import ComWatch from "@/views/components/ComWatch.vue";
import ComTransition from "@/views/components/ComTransition.vue";
import ComTransitionGroup from "@/views/components/ComTransitionGroup.vue";
import ComTeleport from "@/views/components/ComTeleport.vue";

export default {
  name: "App",
  provide() {
    return {
      itemsLength: this.items.length,
    };
  },
  // setup() {
  //   const i18n = inject("i18n");
  //   const userLocation = inject("location");
  //   const userGeolocation = inject("geolocation");
  //   const updateGeolocation = inject("updateGeolocation");
  //   console.log(i18n, userLocation, userGeolocation);
  //   return {
  //     i18n,
  //     userLocation,
  //     userGeolocation,
  //     updateGeolocation,
  //   };
  // },
  components: {
    ComProps,
    ComSlot,
    ComSetup,
    ComWatch,
    ComAttrs: () => import("@/views/components/ComAttrs.vue"),
    ComTransition,
    ComTransitionGroup,
    ComTeleport,
    AsyncComp: defineAsyncComponent(() =>
      import("@/views/components/ComSlot.vue")
    ),
  },
  data() {
    return {
      myText: "",
      firstName: "",
      items: [
        {
          id: 1,
          name: "aaa",
        },
        {
          id: 2,
          name: "bbb",
        },
      ],
      show: true,
    };
  },
  methods: {
    onClick() {},
  },
};
</script>

<script setup>
import { ref, defineAsyncComponent, inject, onMounted } from "vue";
import { store } from "./store/index.js";

const i18n = inject("i18n");
const userLocation = inject("location");
const userGeolocation = inject("geolocation");
// const updateGeolocation = inject("updateGeolocation");
console.log(i18n, userLocation, userGeolocation);

// const i18n = inject("i18n");
// console.log(i18n.greetings.hello);
let myName = ref("");
const getMessage = (name) => {
  console.log(name);
  myName = name;
};

const comProps = ref(null);
onMounted(() => {
  console.log(comProps.value);
  comProps.value.sendMessage();
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

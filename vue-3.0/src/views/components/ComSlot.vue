<template>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <ul>
      <li v-for="item in items" :key="item.id">
        <slot :item="item"></slot>
      </li>
    </ul>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</template>

<script>
export default {
  name: 'ComSlot',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  inject: ['itemsLength'],
  data () {
    return {}
  },
  created () {
    console.log(this.items);
    console.log(this.itemsLength);
  },
  mounted () {
    console.log(this.itemsLength);
  }
}
</script>

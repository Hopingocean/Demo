<template>
    <div class="bar">{{item.title}}</div>
</template>

<script>
export default {
    name: 'Bar',
    asyncData({ store, route }) {
        // 触发action后，会返回promise
        return store.dispatch('fetchItem', route.params.id)
    },
    computed: {
        // 从store的state对象中获取item
        item() {
            return this.$store.state.items[this.$route.params.id]
        }
    }
}
</script>

<style scoped>

</style>

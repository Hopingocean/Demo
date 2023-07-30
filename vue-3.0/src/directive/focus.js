
// 自定义指令

const focus = {
    // 绑定元素attribute前或事件监听器应用前
    created(el, binding, vnode, prevNode) {
        console.log(el, binding, vnode, prevNode);
        // el,指令绑定到的元素
        // binding.value,oldValue,arg,modifiers,instance,dir
        // vnode,绑定元素的底层VNode
        // prevNode,之前的渲染中指令所绑定元素的VNode,仅在beforeUpdate,updated使用
    },
    // 在元素插入到DOM前调用
    beforeMount(el, binding, vnode, prevNode) {console.log(el, binding, vnode, prevNode);},
    // 在绑定元素的父组件及它自己的所有子组件都挂在完成后调用
    mounted(el, binding, vnode, prevNode) {
        console.log(el, binding, vnode, prevNode);
        el.focus();
    },
    // 绑定元素的父组件更新前调用
    beforeUpdate(el, binding, vnode, prevNode) {console.log(el, binding, vnode, prevNode);},
    // 在绑定元素的父组件及它自己的所有子组件都更新后调用
    updated(el, binding, vnode, prevNode) {console.log(el, binding, vnode, prevNode);},
    // 绑定元素的父组件卸载前调用
    beforeUnmount(el, binding, vnode, prevNode) {console.log(el, binding, vnode, prevNode);},
    // 绑定元素的父组件卸载后调用
    unmounted(el, binding, vnode, prevNode) {console.log(el, binding, vnode, prevNode);},
}
export default focus;

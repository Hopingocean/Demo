import { ref } from 'vue';
import { useEventListener } from './event';

// 组合式函数以use开头
export const useMouse = () => {
    // 被组合式函数封装和管理的状态
    const x = ref(0);
    const y = ref(0);

    // 组合式函数可以更改其状态
    function update(event) {
        x.value = event.pageX;
        y.value = event.pageY;
    }

    // 一个组合式函数可以挂靠在所属组件的生命周期上
    // onMounted(() => window.addEventListener('mousemove', update));
    // onUnmounted(() => window.removeEventListener('mousemove', update))
    useEventListener(window, 'mousemove', update);

    // 通过返回值暴漏所管理的装填
    return {x, y};
}
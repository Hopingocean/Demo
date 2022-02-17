import { getUserinfo } from '@/api/api-user.js';
import { ref, onMounted, watch } from 'vue';
export default function useUserinfo(user) {
  let userinfo = ref({}); // ref接收参数并将其包裹在一个带有value property的对象中返回，然后可以使用该property访问或更改响应式变量的值
  const getUser = async () => {
    let res = await getUserinfo();
    userinfo.value = res.data;
  }
  // 注册生命周期钩子
  onMounted(getUser); // mounted时调用getUser
    
  // 在user prop的响应式引用上设置一个侦听器
  watch(user, () => {getUser()}); // watch响应式更改

  return {
    userinfo,
    getUser
  };
}
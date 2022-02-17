<template>
  <div class="com_setup">
    <img :src="userinfo.avatar" alt="">
    <p>{{userinfo.username}}</p>
  </div>
</template>

<script>
// import { getUserinfo } from '@/api/api-user.js';
// import { ref, onMounted, watch, toRefs, computed } from 'vue';

import useUserinfo from '@/composables/useUserinfo.js';
import useUsername from '@/composables/useUsername.js';
import { toRefs } from 'vue';
export default {
  name: 'ComSetup',
  data () {
    return {}
  },
  props: {
    user: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    console.log(props);
    // 使用toRefs创建对props中的user property的响应式引用
    // const { user } = toRefs(props);
    // let userinfo = ref({}); // ref接收参数并将其包裹在一个带有value property的对象中返回，然后可以使用该property访问或更改响应式变量的值
    // const getUser = async () => {
    //   let res = await getUserinfo();
    //   userinfo.value = res.data;
    // }
    
    // // 注册生命周期钩子
    // onMounted(getUser); // mounted时调用getUser
    
    // // 在user prop的响应式引用上设置一个侦听器
    // watch(user, () => {getUser()}); // watch响应式更改

    // // 独立的computed属性
    // const searchQuery = ref('');
    // const searchUsername = computed(() => {
    //   return userinfo.value.username
    // })

    const { user } = toRefs(props);
    const { userinfo, getUser } = useUserinfo(user);
    const { searchQuery, searchUsername } = useUsername(user);

    return {
      userinfo,
      getUser,
      searchQuery,
      searchUsername
    };
  },
  mounted () {
    this.getUser();
  }
}
</script>
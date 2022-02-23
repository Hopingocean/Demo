<template>
  <div class="com_setup">
    <img :src="userinfo.avatar" alt="">
    <p>{{userinfo.username}}</p>
  </div>
</template>

<script>
// import { getUserinfo } from '@/api/api-user.js';
// import { ref, onMounted, watch, toRefs, computed } from 'vue';

// 组合式函数
import useUserinfo from '@/composables/useUserinfo.js';
import useUsername from '@/composables/useUsername.js';
import { onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onUnmounted, onUpdated, toRefs, provide, ref, reactive, readonly } from 'vue';
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
  // provide: {
  //   location: 'xxx',
  //   geolocation: {
  //     longitude: 100,
  //     latitude: 200
  //   }
  // },
  setup(props, context) {
    console.log(props);
    
    // 访问组件的property，执行setup时，只能访问props、attrs、slots、emit，无法访问data、computed、methods、refs

    // Attribute(非响应式对象，等同于$attrs)
    console.log(context.attrs)

    // 插槽（非响应式对象，等同于$slots）
    console.log(context.slots);

    // 触发事件（方法，等同于$emits）
    console.log(context.emit);

    // 暴露公共property（函数）
    console.log(context.expose);

    // 使用toRefs创建对props中的user property的响应式引用
    // const { user } = toRefs(props);
    // let userinfo = ref({}); // ref接收参数并将其包裹在一个带有value property的对象中返回，然后可以使用该property访问或更改响应式变量的值
    // const getUser = async () => {
    //   let res = await getUserinfo();
    //   userinfo.value = res.data;
    // }

    // 在生命周期钩子函数前加'on'来访问组件的生命周期钩子
    // onBeforeCreate(); // not need
    // onCreated(); // not need
    onBeforeMount();
    onMounted();
    onBeforeUpdate();
    onUpdated();
    onBeforeUnmount();
    onUnmounted();
    onErrorCaptured();
    onRenderTracked();
    onRenderTriggered();
    onActivated();
    onDeactivated();

    
    // // 注册生命周期钩子
    // onMounted(getUser); // mounted时调用getUser
    
    // // 在user prop的响应式引用上设置一个侦听器
    // watch(user, () => {getUser()}); // watch响应式更改

    // // 独立的computed属性
    // const searchQuery = ref('');
    // const searchUsername = computed(() => {
    //   return userinfo.value.username
    // })

    // 如果需要解构props，使用toRefs
    const { user } = toRefs(props);
    console.log(user.value);
    const { userinfo, getUser } = useUserinfo(user);
    const { searchQuery, searchUsername } = useUsername(user);

    // 当我们想要将该组件的方法通过模板ref暴露给父组件时，使用expose解决
    context.expose({
      getUser
    })

    // 添加响应性
    const location = ref('north pole');
    const geolocation = reactive({
      longitude: 100,
      latitude: 200
    })

    // 使用provide，如果要确保provide的数据不会被inject的组件更改，可以对property使用readonly
    provide('location', readonly(location));
    provide('geolocation', readonly(geolocation))

    // 当需要在注入数据的组件内部更新inject数据，建议provide一个方法负责改变响应式property
    const updateGeolocation = () => {
      geolocation.value = {
        longitude: 101,
        latitude: 201
      }
    };
    provide('updateGeolocation', updateGeolocation);

    // 结合模板使用，如果setup返回一个对象，那么该对象的property以及传递给setup的props中的参数中的property可以在模板中使用
    return {
      userinfo,
      getUser,
      searchQuery,
      searchUsername
    };

    // 使用渲染函数，该函数可以直接使用在同一作用域中声明的响应式状态
    // return () => h('div', [user.value]); // 显式使用ref的value
  },
  mounted () {
    this.getUser();
  },
  methods: {
    // 修改响应式property
    updateLocation () {
      // 当使用响应式provide/inject值时，建议尽可能将对响应式property的所有修改限制在定义provide的组件内部
      this.location = 'South pole';
    }
  }
}
</script>
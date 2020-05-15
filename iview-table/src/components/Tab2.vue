<template>
  <div class="tab2">
    <!-- <Table :columns="tableColums" :data="tableData"></Table> -->
  </div>
</template>

<script>
export default {
  name: 'Tab1',
  data () {
    return {
      tableColums: [
        {
          title: '标题',
          key: 'title',
          tooltip: true
        },
        {
          title: '内容',
          key: 'content',
          tooltip: true
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('Button', {
              props: {},
              on: {
                click: () => {
                  this.show(params);
                }
              }
            }, 'click')
          }
        }
      ],
      tableData: [
        {
          id: 1,
          title: 'xxxx',
          content: 'dafhflkahdfklafldasjfladfhalkfdsa'
        },
        {
          id: 2,
          title: 'ooooooooooooooooooooooooooooooo',
          content: '12323123123123123dafhflkahdfklafldasjfladfhalkfdsa'
        }
      ]
    }
  },
  created () {},
  destroyed() {
    console.log('destroy2');
  },
  methods: {
    show (params) {
      console.log(params);
    }
  }
}
</script>
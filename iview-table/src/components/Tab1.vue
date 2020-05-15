<template>
  <div class="tab1">
    <Form ref="formData" :model="formData" inline :label-width="60">
      <!-- <FormItem label="x:">
        <Input v-model="formData.x" />
      </FormItem>
      <FormItem label="y:">
        <Input v-model="formData.y" />
      </FormItem> -->
      <FormItem label="选择1:">
        <Select v-model="formData.model1">
          <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="选择2:">
        <Select v-model="formData.model2">
          <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
    </Form>
    <Table :columns="tableColums" :data="tableData"></Table>
  </div>
</template>

<script>
export default {
  name: 'Tab1',
  data () {
    return {
      formData: {
        x: 123,
        y: 'xxx',
        model1: '',
        model2: ''
      },
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
      ],
      cityList1: [
        {
            value: 'New York',
            label: 'New York'
        },
        {
            value: 'London',
            label: 'London'
        },
        {
            value: 'Sydney',
            label: 'Sydney'
        },
        {
            value: 'Ottawa',
            label: 'Ottawa'
        },
        {
            value: 'Paris',
            label: 'Paris'
        },
        {
            value: 'Canberra',
            label: 'Canberra'
        },
        {
            value: 'New York1',
            label: 'New York1'
        },
        {
            value: 'London1',
            label: 'London1'
        },
        {
            value: 'Sydney1',
            label: 'Sydney1'
        },
        {
            value: 'Ottawa1',
            label: 'Ottawa1'
        },
        {
            value: 'Paris1',
            label: 'Paris1'
        },
        {
            value: 'Canberra1',
            label: 'Canberra1'
        },
        {
            value: 'New York2',
            label: 'New York2'
        },
        {
            value: 'London2',
            label: 'London2'
        },
        {
            value: 'Sydney2',
            label: 'Sydney2'
        },
        {
            value: 'Ottawa2',
            label: 'Ottawa2'
        },
        {
            value: 'Paris2',
            label: 'Paris2'
        },
        {
            value: 'Canberra2',
            label: 'Canberra2'
        },
        {
            value: 'New York3',
            label: 'New York3'
        },
        {
            value: 'London3',
            label: 'London3'
        },
        {
            value: 'Sydney3',
            label: 'Sydney3'
        },
        {
            value: 'Ottawa3',
            label: 'Ottawa3'
        },
        {
            value: 'Paris3',
            label: 'Paris3'
        },
        {
            value: 'Canberra3',
            label: 'Canberra3'
        },
        {
            value: 'New York4',
            label: 'New York4'
        },
        {
            value: 'London4',
            label: 'London4'
        },
        {
            value: 'Sydney4',
            label: 'Sydney4'
        },
        {
            value: 'Ottawa4',
            label: 'Ottawa4'
        },
        {
            value: 'Paris4',
            label: 'Paris4'
        },
        {
            value: 'Canberra4',
            label: 'Canberra4'
        },
        {
            value: 'New York5',
            label: 'New York5'
        },
        {
            value: 'London5',
            label: 'London5'
        },
        {
            value: 'Sydney5',
            label: 'Sydney5'
        },
        {
            value: 'Ottawa5',
            label: 'Ottawa5'
        },
        {
            value: 'Paris5',
            label: 'Paris5'
        },
        {
            value: 'Canberra5',
            label: 'Canberra5'
        },
        {
            value: 'New York6',
            label: 'New York6'
        },
        {
            value: 'London6',
            label: 'London6'
        },
        {
            value: 'Sydney6',
            label: 'Sydney6'
        },
        {
            value: 'Ottawa6',
            label: 'Ottawa6'
        },
        {
            value: 'Paris6',
            label: 'Paris6'
        },
        {
            value: 'Canberra6',
            label: 'Canberra6'
        },
        {
            value: 'New York7',
            label: 'New York7'
        },
        {
            value: 'London7',
            label: 'London7'
        },
        {
            value: 'Sydney7',
            label: 'Sydney7'
        },
        {
            value: 'Ottawa7',
            label: 'Ottawa7'
        },
        {
            value: 'Paris7',
            label: 'Paris7'
        },
        {
            value: 'Canberra7',
            label: 'Canberra7'
        }
      ],
      cityList2: [
        {
            value: 'New York123',
            label: 'New York123'
        },
        {
            value: 'London123',
            label: 'London123'
        },
        {
            value: 'Sydney123',
            label: 'Sydney123'
        },
        {
            value: 'Ottawa123',
            label: 'Ottawa123'
        },
        {
            value: 'Paris123',
            label: 'Paris123'
        },
        {
            value: 'Canberra123',
            label: 'Canberra123'
        }
      ]
    }
  },
  destroyed() {
    console.log('destroy1');
  }
}
</script>
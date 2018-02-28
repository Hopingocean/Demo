// 应用层级的状态应该集中到单个store对象中
import Vue from 'vue'
import Vuex from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
Vue.use(Vuex)

const state = {
  count: 10
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
// 组装模块并导出store 

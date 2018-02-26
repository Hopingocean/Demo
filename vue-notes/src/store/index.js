import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const defaultNote = {
  id: +new Date(),
  title: '我的笔记',
  content: '第一篇笔记内容',
  favorite: false
}
// 需要维护的状态
const state = {
  notes: [defaultNote],
  activeNote: defaultNote,
  show: 'all', // all or favorite
  toggle: true, // show or hidden
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

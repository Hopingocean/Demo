// 提交mutation是更改状态的唯一方法，并且这个过程是同步的
export const mutations = {
  add(state, n) {
    state.count += n
  },
  reduce(state) {
    state.count--
  }
}
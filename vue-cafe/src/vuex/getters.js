// 处理数据
export const getters = {
  count: function(state) {
    if (state.count > 100) {
      return state.count = 10;
    }
  }
}
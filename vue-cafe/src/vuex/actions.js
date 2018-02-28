// 异步逻辑应该封装到action里
export const actions = {
  addAction(context) {
    context.commit('add', 10);
    setTimeout(() => {context.commit('reduce')}, 5000);
  },
  reduceAction({commit}) {
    commit('reduce')
  }
}
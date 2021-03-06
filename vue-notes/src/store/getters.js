// 获取noteList ，根据state.show的状态做数据过滤
const filteredNotes = (state) => {
  if (state.show === 'all') {
    return state.notes || {};
  } else if (state.show === 'favorite') {
    return state.notes.filter(note => note.favorite) || {};
  }
}

// 获取列表展示状态 all or favorite
const show = state => state.show;

// 获取当前激活note
const activeNote = state => state.activeNote;

export default {
  filteredNotes,
  show,
  activeNote
}
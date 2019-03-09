const state = {
  // 0 不排序
  // 1：销量↑ 2：销量↓
  // 3：价格↑ 4：价格↓
  // 5：评论↑ 6：评论↓
  // 7：时间↑ 8：时间↓
  type: 0
}

const mutations = {
  CHANGETYPE(state, payload){
    state.type = payload
  },
}

const actions = {
  changeType ({commit}, payload) {
    commit("CHANGETYPE", payload)
  }
}

export default {
  state,
  mutations,
  actions
}
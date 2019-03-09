const state = {
  username: '',
  userId: '',
  isLogined: false,
  userDetail: {}
}

const mutations = {
  LOGIN(state, payload){
    state.username = payload.username,
    state.userId = payload.userId,
    state.isLogined = payload.isLogined,
    state.userDetail = payload.userDetail
  },
  SETDETAIL(state, payload){
    state.userDetail = payload
  }
}

const actions = {
  login ({commit}, payload) {
    commit("LOGIN", payload)
  },
  setDetail({commit}, payload){
    commit("SETDETAIL", payload)
  }
}

export default {
  state,
  mutations,
  actions
}
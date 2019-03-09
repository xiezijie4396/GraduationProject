const state = {
  goods: [],
  flag: false
}

const mutations = {
  TOSHOPCAR(state, payload){
    state.flag = false
    state.goods.forEach(e=>{
      if(e._id === payload._id){                        
        if(e.wantNum < e.num){                            // 判断现有选中数量是否大于库存数量
          e.wantNum++
        }
        state.flag = true
      }
    });
    if(!state.flag){
      state.goods.push(payload)
    }
  },

}

const actions = {
  toShopCar ({commit}, payload) {
    commit("TOSHOPCAR", payload)
  }
}

export default {
  state,
  mutations,
  actions
}
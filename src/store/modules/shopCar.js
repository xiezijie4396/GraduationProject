const state = {
  goods: [],
  flag: false
}

const mutations = {
  TOSHOPCAR(state, payload){
    // currentGood 当前购买的商品 thisGood 仓库中的商品
    var currentGood = payload
    state.flag = false
    state.goods.forEach(e=>{
      if(e._id === currentGood._id){                        
        if(e.num < currentGood.totalNum){                            // 判断现有选中数量是否大于库存数量
          e.num++
        }
        state.flag = true
      }
    });
    if(!state.flag){
      state.goods.push(currentGood)
    }
  },
  CLEARSHOPCAR(state, payload){
    state.goods = []
  },
}

const actions = {
  toShopCar ({commit}, payload) {
    commit("TOSHOPCAR", payload)
  },
  clearShopCar ({commit}) {
    commit("CLEARSHOPCAR")
  },
}

export default {
  state,
  mutations,
  actions
}
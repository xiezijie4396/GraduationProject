const state = {
  order: [],
  orderByRead: [],
  orderByUnRead: []
}

const mutations = {
  // 获得所有订单
  GETORDER(state){
    this._vm.axios.post('/api/order/get').then((res)=>{
      state.order = []
      res.data.forEach((e)=>{
        state.order.push(e)
      })
      state.order.reverse()
      var username = this._vm._data.$$state.login.username 
      state.orderByRead = []     
      state.orderByUnRead = []             
      state.order.forEach(e => {
        if(e.buyerName == username){
          if(e.buyerRead){
            state.orderByRead.push(e)
          }else{
            state.orderByUnRead.push(e)
          }
        }
        else if(e.salerName == username){
          if(e.salerRead){
            state.orderByRead.push(e)
          }else{
            state.orderByUnRead.push(e)
          }
        }
        else if(e.adminName == username){
          if(e.adminRead){
            state.orderByRead.push(e)
          }else{
            state.orderByUnRead.push(e)
          }
        }
      });              
    })
  }
}

const actions = {
  getOrder ({commit}) {
    commit("GETORDER")
  }
}

export default {
  state,
  mutations,
  actions
}
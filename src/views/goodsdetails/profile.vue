<template>
  <div class="profile col-xs-8">
    <div class="panel panel-default" style="height: 100%">
      <div class="panel-body">
        <h4>{{good.name}}</h4>
        <div class="col-xs-4 left">价格</div>
        <div class="col-xs-8 right">{{good.price}}</div>
        <div class="col-xs-4 left">数量</div>
        <div class="col-xs-8 right">{{good.num}}</div>
        <div class="col-xs-12">
          <button class="btn btn-success" @click="buy">立即购买</button>
          <button class="btn btn-primary" @click="toShopCar">加入购物车</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'profile',
  data () {
    return {
      
    }
  },
  computed:{
    loginMsg(){
      return this.$store.state.login
    },
    userName(){
      return this.loginMsg.username
    },
    userDetail(){
      return this.loginMsg.userDetail
    }
  },
  props:{
    good: Object,
  },
  methods:{
    toShopCar(){
      if(!this.userDetail || !this.userDetail.name || !this.userDetail.phone || !this.userDetail.address){
        alert('必须填入姓名、地址、联系电话才能进行正常的购买操作')
        let result = window.confirm('是否进入个人资料页面进行资料填写?')
        if(result == true){
          this.$router.push({
            path: '/person?id='+this.loginMsg.userId
          })
        }
        return
      }
      if(this.good.saler == this.userName){
        alert('不能购买自己的商品')
        return
      }
      var currentGood = Object.assign({},this.good)
      currentGood.num = 1
      currentGood.totalNum = this.good.num
      // currentGood 当前购买的商品
      this.$store.dispatch('toShopCar', currentGood).then(() => {
        alert('加入购物车成功!!')
      })
    },
    buy(){
      var items = []
      if(!this.userDetail || !this.userDetail.name || !this.userDetail.phone || !this.userDetail.address){
        alert('必须填入姓名、地址、联系电话才能进行正常的购买操作')
        let result = window.confirm('是否进入个人资料页面进行资料填写?')
        if(result == true){
          this.$router.push({
            path: '/person?id='+this.loginMsg.userId
          })
        }
        return
      }
      if(this.good.saler == this.userName){
        alert('不能购买自己的商品')
        return
      }
      var currentGood = Object.assign({},this.good)
      currentGood.num = 1
      currentGood.totalNum = this.good.num

      items.push({
        name: currentGood.name,
        price: currentGood.price,
        num: currentGood.num,
        totalNum: currentGood.totalNum,
        buyerName: this.userName,
        salerName: currentGood.saler,
        goodsId: currentGood._id,
        address: this.userDetail.address,
        phone: this.userDetail.phone
      })
      var params = this.$common.setParams([
        {name: 'items', param: JSON.stringify(items)},
      ])
      
      this.axios.post('/api/order/create',params).then((res)=>{
        alert('订单已生成，请进行后续的操作')
        this.$router.push({
          path: '/order'
        })
      })
    }
  }
}
</script>


<style scoped lang="less">
.profile{
  padding-top: 10px;
  box-sizing: border-box;
  height: 210px;
}
.left, .right{
  margin-bottom: 10px;
}
</style>

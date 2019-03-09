<template>
  <div class="index">
    <ul class="nav nav-tabs order-nav">
      <li :class="status=='未读'?'active':''"><a @click="status='未读'">未读<span class="badge">{{ordersbyunRead.length}}</span></a></li>
      <li :class="status=='已读'?'active':''"><a @click="status='已读'">已读<span class="badge">{{ordersbyRead.length}}</span></a></li>
    </ul>
    <tab :status="status" :orders="orders" @changeData="changeData"/>
  </div>
</template>

<script>
import tab from './tab'

export default {
  name: 'index',
  data () {
    return {
      status: '未读',
    }
  },
  mounted(){
    this.getData()
  },
  computed: {
    loginMsg(){
      return this.$store.state.login
    },
    ordersbyunRead(){
      return this.$store.state.order.orderByUnRead
    },
    ordersbyRead(){
      return this.$store.state.order.orderByRead
    },
    orders(){
      if(this.status == '未读'){
        return this.$store.state.order.orderByUnRead
      }
      else if(this.status == '已读'){
        return this.$store.state.order.orderByRead
      }
    }
  },
  methods:{
    getData(){
      this.$store.dispatch('getOrder')
    },
    changeData(){
      alert('修改订单状态成功')
      this.getData()
    },
  },

  components: {
    tab
  }
}
</script>


<style scoped lang="less">
.index{
  width: 800px;
  margin: 0 auto;
  padding-top: 50px;
  .order-nav{
    margin-bottom: 10px;
  }
}
</style>

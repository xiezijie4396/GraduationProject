<template>
  <div class="all">
    <div class="panel panel-default" v-for="(order,index) in orders" :key="index">
      <div class="panel-body">
        <div class="btns pull-right btns-head">
          <button class="btn btn-success" v-if="status=='已读'" @click="changeRead(order._id, false)">标为未读</button>
          <button class="btn btn-success" v-else @click="changeRead(order._id, true)">标为已读</button>
        </div>
        <table class="table table-bordered">
          <thead>
              <tr>
                <th colspan="2">订单号</th>
                <th colspan="1">订单状态</th>
                <th colspan="1">店家</th>
                <th colspan="1">商品名称</th>
                <th colspan="1">单价</th>
                <th colspan="1">数量</th>
              </tr>
          </thead>   
          <tbody>
              <tr>
                <td colspan="2">{{order._id}}</td>
                <td colspan="1">{{order.status}}</td>
                <td colspan="1">{{order.salerName}}</td>
                <td colspan="1">{{order.name}}</td>
                <td colspan="1">{{order.price}}</td>
                <td colspan="1">{{order.wantNum}}</td>
              </tr>
              <tr>
                <th colspan="4">地址</th>
                <th colspan="2">姓名</th>
                <th colspan="2">联系方式</th>
              </tr>
              <tr>
                <td colspan="4">{{order.address}}</td>
                <td colspan="2">{{order.buyerName}}</td>
                <td colspan="2">{{order.phone}}</td>
              </tr>
          </tbody>   
        </table>
        <!-- 只有顾客能进行的操作 待顾客确认->待店主确认 -->
        <template v-if="order.status === '待顾客确认' && order.isbuyer">
          <div class="btns pull-left btns-footer" v-if="order.status === '待顾客确认' && order.isbuyer">
            <button class="btn btn-primary" @click="editItem(order)">编辑订单</button>
            <button class="btn btn-danger" @click="submitOrder(order._id, 1)">取消订单</button>
          </div>
          <div class="btns pull-right btns-footer">
              <button class="btn btn-success" @click="submitOrder(order._id, '待店主确认')">确认订单</button>
          </div>
        </template>
        <!-- 只有店主能进行的操作 待店主确认->店主已确认、店主已确认->已完成 -->
        <template v-else-if="order.status === '待店主确认' && order.issaler">
          <div class="btns pull-right btns-footer">
              <button class="btn btn-success" @click="submitOrder(order._id, '店主已确认')">确认订单</button>
          </div>
        </template>
        <template v-else-if="order.status === '店主已确认' && order.issaler">
          <div class="btns pull-right btns-footer">
              <button class="btn btn-success" @click="submitOrder(order._id, '已完成')">完成订单</button>
          </div>
        </template>
        <!-- 只有管理员能进行的操作 删除订单 -->
        <template v-else-if="userName == 'admin'">
          <div class="btns pull-right btns-footer">
            <button class="btn btn-success" @click="submitOrder(order._id, 1)">删除订单</button>
          </div>
        </template>
      </div>
    </div>

    <!-- 编辑用modal -->
    <div class="modal fade" id="editModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">购物车</h4>
          </div>
          <div class="modal-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th><input type="checkbox"></th>
                  <th>商品名称</th>
                  <th>商品单价</th>
                  <th>商品数量</th>
                </tr>
              </thead>
              <tbody>
                 <tr v-for="(item, index) in currentOrder.goods" :key="index">
                  <td><input type="checkbox"></td>
                  <td>{{item.name}}</td>
                  <td>￥{{item.price}}</td>
                  <td>
                    <button class="btn btn-default" @click="item.wantNum>0?item.wantNum--:''">-</button>
                    {{item.wantNum}}
                    <button class="btn btn-default" @click="item.wantNum<item.num?item.wantNum++:''">+</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success pull-right" @click="saveItem(currentOrder._id, currentOrder)">保存</button>
            <button type="button" class="btn btn-warning pull-left">删除</button>
            <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      currentOrder: []
    }
  },
  props: {
    status: String,
    orders: Array
  },
  computed:{
    userName(){
      return this.$store.state.login.username
    },
  },
  methods:{
    editItem(order){
      this.currentOrder = order;
      $('#editModal').modal('show')
    },
    saveItem(id, obj){
      var params = this.$common.setParams([
        {name: 'id', param: id},
        {name: 'goods', param: JSON.stringify(obj.goods)},
      ])
      this.axios.post('/api/order/changeObj', params).then((res)=>{
        alert('保存成功')
        this.$emit('changeData')
         $('#editModal').modal('hide')
      })
    },
    submitOrder(id, status){
      var params = this.$common.setParams([
        {name: 'id', param: id},
        {name: 'status', param: status},
      ])
      this.axios.post('/api/order/changeStatus', params).then((res)=>{
        this.$emit('changeData')
      })
    },
    changeRead(id, type){
      var params = this.$common.setParams([
        {name: 'id', param: id},
        {name: 'type', param: type},
        {name: 'username', param: this.userName}
      ])
      this.axios.post('/api/order/changeRead', params).then((res)=>{
        this.$emit('changeData')
      })
    }
  },
}
</script>


<style lang="less">
.all{
  width: 800px;
  margin: 0 auto;
  td,th{
    text-align: center;
  }
  .panel{
    width: 100%;
    margin-bottom: 10px;
    .table.table-bordered{
      margin: 0 auto;
    }
    .panel-body{
      padding: 20px;
    }
    .btns-head{
      padding-bottom: 20px;
    }
    .btns-footer{
      padding-top: 20px;
    }
  }
}
</style>

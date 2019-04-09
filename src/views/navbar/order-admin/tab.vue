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
                <th colspan="1" style="width: 320px">商品名称</th>
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
                <td colspan="1">￥{{order.price}}</td>
                <td colspan="1">{{order.num}}</td>
              </tr>
          </tbody>   
        </table>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th colspan="5">地址</th>
              <th colspan="1">姓名</th>
              <th colspan="1">联系方式</th>
              <th colspan="1">总价</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="5">{{order.address}}</td>
              <td colspan="1">{{order.buyerName}}</td>
              <td colspan="1">{{order.phone}}</td>
              <td colspan="1" style="color: orange;font-weight: bolder;font-size: 16px;">￥{{order.num * order.price}}</td>
            </tr>
          </tbody>
        </table>

        <!-- 只有顾客能进行的操作 待顾客确认->待店主确认 -->
        <template v-if="order.status === '待顾客确认' && order.buyerName === userName ">
          <div class="btns pull-left btns-footer" v-if="order.status === '待顾客确认' && order.buyerName === userName">
            <button class="btn btn-primary" @click="editItem(order)">编辑订单</button>
          </div>
          <div class="btns pull-right btns-footer">
              <button class="btn btn-success" @click="submitOrder(order._id, '待店主确认', 'buyer')">确认订单</button>
          </div>
        </template>
        <!-- 只有店主能进行的操作 待店主确认->店主已确认、店主已确认->已完成 -->
        <template v-else-if="order.status === '待店主确认' && order.salerName === userName">
          <div class="btns pull-right btns-footer">
              <button class="btn btn-success" @click="submitOrder(order._id, '店主已确认', 'saler')">确认订单</button>
          </div>
        </template>
        <template v-else-if="order.status === '店主已确认' && order.salerName === userName">
          <div class="btns pull-right btns-footer">
              <button class="btn btn-success" @click="submitOrder(order._id, '已完成', 'saler')">完成订单</button>
          </div>
        </template>
        <!-- 只有管理员能进行的操作 删除订单 -->
        <template v-else-if="userName === 'admin'">
          <div class="btns pull-right btns-footer">
            <button class="btn btn-success" @click="submitOrder(order._id, 1, 'admin')">删除订单</button>
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
            <h4 class="modal-title" id="myModalLabel">编辑订单</h4>
          </div>
          <div class="modal-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>商品名称</th>
                  <th>商品单价</th>
                  <th style="width: 110px">商品数量</th>
                </tr>
              </thead>
              <tbody>
                 <tr>
                  <td>{{currentOrder.name}}</td>
                  <td>￥{{currentOrder.price}}</td>
                  <td>
                    <button class="btn btn-default" @click="currentOrder.num > 1 ? currentOrder.num--:''">-</button>
                    {{currentOrder.num}}
                    <button class="btn btn-default" @click="currentOrder.num < currentOrder.totalNum+currentOrder.currentNum ? currentOrder.num++:''">+</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success pull-right" @click="saveItem(currentOrder._id, currentOrder)">保存修改</button>
            <button type="button" class="btn btn-danger pull-left" @click="submitOrder(currentOrder._id, 1, 'admin')">取消订单</button>
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
      currentOrder: {}
    }
  },
  props: {
    status: String,
    orders: Array
  },
  mounted(){

  },
  computed:{
    userName(){
      return this.$store.state.login.username
    },
  },
  methods:{
    editItem(order){
      this.currentOrder = order
      this.currentOrder.currentNum = order.num
      $('#editModal').modal('show')
    },
    saveItem(id, obj){
      var params = this.$common.setParams([
        {name: 'id', param: id},
        {name: 'order', param: JSON.stringify(obj)},
      ])
      this.axios.post('/api/order/changeNum', params).then((res)=>{
        alert('保存成功')
        this.$emit('changeData')
         $('#editModal').modal('hide')
      })
    },
    submitOrder(id, status, kind){
      var params = this.$common.setParams([
        {name: 'id', param: id},
        {name: 'status', param: status},
        {name: 'kind', param: kind},
      ])
      this.axios.post('/api/order/changeStatus', params).then((res)=>{
        this.$emit('changeData')
        if(kind == 'admin'){
          $('#editModal').modal('hide')
        }
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
  .table.table-bordered{
      margin: 0 auto 10px auto;
      th{
        white-space: nowrap;
        vertical-align: middle;
      }
      td{
        vertical-align: middle;
      }
    }
    #editModal{
      .modal-footer{
        button{
          margin: 5px;
        }
      }
    }
}
</style>

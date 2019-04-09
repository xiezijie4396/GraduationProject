<template>
  <div class="top">
    <!-- 导航栏 -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="">网上二手电脑交易平台</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-left">
            <li><a href="">首页</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <template v-if="loginMsg.isLogined">
              <li><a href="">欢迎你,{{loginMsg.username}}</a></li>
              <template v-if="loginMsg.username !== 'admin'">
                <li><a href="#" data-toggle="modal" data-target="#shoppingModal">购物车<span class="badge">{{shopCar.length}}</span></a></li>
                <li><router-link :to="'/person?id='+loginMsg.userId">我的资料</router-link></li>
              </template>
              <template v-else>
                <li><router-link to="/user-admin" v-if="loginMsg.username == 'admin'">用户管理</router-link></li>
                <li><router-link to="/advs-admin" v-if="loginMsg.username == 'admin'">广告管理</router-link></li>
              </template>
              <li><router-link to="/order-admin">
                  <template v-if="loginMsg.username == 'admin'">订单管理</template>
                  <template v-else>我的订单</template>
                  <span class="badge">{{orderByUnRead.length}}</span>
                  </router-link></li>
              <li><router-link to="/goods-admin">
                <template v-if="loginMsg.username == 'admin'">商品管理</template>
                <template v-else>我的商品</template>
                </router-link></li>
              <li><a href="#" @click="logout">退出登录</a></li>
            </template>
            <template v-else>
              <li @click="changeModel='login'"><a href="#" data-toggle="modal" data-target="#myModal">登录</a></li>
              <li @click="changeModel='register'"><a href="#" data-toggle="modal" data-target="#myModal">注册</a></li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
    <!-- 登录注册用Modal -->
    <div class="modal fade" id="myModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">
              <template v-if="changeModel==='register'">用户注册</template>
              <template v-else>用户登录</template>
            </h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" v-model="username" class="form-control" id="username" placeholder="请输入用户名">
              </div>
              <div class="form-group">
                <label for="password">密码</label>
                <input type="password" v-model="password" class="form-control" id="password" placeholder="请输入密码">
              </div>
              <div class="form-group" v-if="changeModel === 'register'">
                <label for="repassword">再次输入密码</label>
                <input type="password" v-model="repassword" class="form-control" id="repassword" placeholder="请再次输入密码">
              </div>
            </form>            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="register" v-if="changeModel === 'register'">注册</button>
            <button type="button" class="btn btn-primary" @click="login" v-else>登录</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车用Modal -->
    <div class="modal fade" id="shoppingModal">
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
                  <th><input type="checkbox" @click="setCheckAll($event)" v-model="checkAll"></th>
                  <th>商品名称</th>
                  <th>商品单价</th>
                  <th style="min-width: 110px">商品数量</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in shopCar" :key="index">
                  <td><input type="checkbox" :checked="item.checked" @click="setCheck(item._id, $event)"></td>
                  <td>{{item.name}}</td>
                  <td>￥{{item.price}}</td>
                  <td>
                    <button class="btn btn-default" @click="item.num>0?item.num--:''">-</button>
                    {{item.num}}
                    <button class="btn btn-default" @click="item.num<item.totalNum?item.num++:''">+</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-right">总价：￥{{Totalprice}}</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="buy">立即购买</button>
            <button type="button" class="btn btn-warning pull-left" @click="deleteGoods">删除</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      username: '',
      password: '',
      repassword: '',
      changeModel: '',            // 用来表示点开的是登录框还是注册框
      checkAll: false ,           // 用于购物车全选框的处理
    }
  },
  mounted(){
    this.getOrder()
  },
  updated(){
    // this.getOrder()   // 处理切换用户时订单数据没有及时更新的问题
  },
  computed:{
    loginMsg(){
      return this.$store.state.login
    },
    shopCar(){
      return this.$store.state.shopCar.goods
    },
    userDetail(){
      return this.loginMsg.userDetail
    },
    Totalprice(){
      var sum = 0
      this.shopCar.forEach((e)=>{
        if(e.checked){
          sum += e.price * e.num
        }
      })
      return sum
    },
    orderByUnRead(){
      return this.$store.state.order.orderByUnRead
    }
  },
  methods:{
    register(){
      if(this.username === ''){
        alert('请输入用户名')
        return
      }
      if(this.password === ''){
        alert('请输入密码')
        return
      }
      if(this.repassword === ''){
        alert('请重新输入密码')
        return
      }
      if(this.password !== this.repassword){
        alert('密码输入不一致,请重新输入')
        return
      }
      var params = this.$common.setParams([
        {name: 'username', param: this.username},
        {name: 'password', param: this.password}
      ])
      this.axios.post('/api/user/register',params).then(function(res){
        alert(res.data.msg)
        if(res.data.status > 0){
          $('#myModal').modal('hide')
        }
      })
    },
    login(){
      if(this.username === ''){
        alert('请输入用户名')
        return
      }
      if(this.password === ''){
        alert('请输入密码')
        return
      }
      var params = this.$common.setParams([
        {name: 'username', param: this.username},
        {name: 'password', param: this.password}
      ])
      this.axios.post('/api/user/login',params).then((res)=>{
        alert(res.data.msg)
        if(res.data.status > 0){
          var params = this.$common.setParams([
            {name: 'id', param: res.data.userId},
          ])
          this.axios.post("/api/user/register/getdetail", params).then(result => {
              $('#myModal').modal('hide')
              this.$store.dispatch('login', {
                username : this.username,
                userId : res.data.userId,
                isLogined : true,
                userDetail: {
                  name: result.data.name,
                  address: result.data.address,
                  phone: result.data.phone
                }
              })
          });
        }
      })
    },
    logout(){
      this.username = ''
      this.password = ''
      this.$store.dispatch('login', {
        username : '',
        userId : '',
        isLogined : false
      })
      this.$store.dispatch('clearShopCar')
      this.$router.push({
        path: '/'
      })
      alert('退出成功!')
    },
    setCheckAll($event){                        // 点击购物车全选框进行的处理
      this.shopCar.forEach((good)=>{
        this.$set(good, 'checked', $event.target.checked)
      })
    },
    setCheck(id, $event){                       // 点击购物车单选框进行的处理
      if(!$event.target.checked){               // 如果该单选框为false 则设置全选框为false
        this.shopCar.forEach((good)=>{      
          if(good._id === id){
            this.$set(good, 'checked', false)   // 更新数组
          }
        })
        this.checkAll = false;  
        return;
      }
      this.checkAll = true;                     // 如果该单选框为true 则需要判断其他单选框也为true
      this.shopCar.forEach((good)=>{
        if(good._id === id){
          this.$set(good, 'checked', true)      // 更新数组
        }            
        if(!good.checked){
          this.checkAll = false;        
        }
      })
    },
    buy(){
      if(!this.Totalprice){
        alert('请先选择产品和产品数量，再点击购买')
        return
      }
      var items = []
      this.shopCar.forEach((e) => {
        items.push({
          name: e.name,
          price: e.price,
          num: e.num,
          totalNum: e.totalNum,
          buyerName: this.loginMsg.username,
          salerName: e.saler,
          address: this.userDetail.address,
          phone: this.userDetail.phone,
          goodsId: e._id
        })
      })
      var params = this.$common.setParams([
        {name: 'items', param: JSON.stringify(items)},
      ])
      this.axios.post('/api/order/create',params).then((res)=>{
        alert('订单已生成，请进行后续的操作')
        // 生成订单后清空购物车
        this.$store.dispatch('clearShopCar').then((result) => {
          $('#shoppingModal').modal('hide')

          this.$router.push({
            path: '/order'
          })
        })
      })
    },
    getOrder(){
      this.$store.dispatch('getOrder')
    },
    // 删除购物车中的某一项
    deleteGoods(){
      var count = 0
      this.shopCar.forEach((e, i) => {
        if(e.checked){
          this.shopCar.splice(i, 1)
          count++
        }
      })
      // count为0 代表待删除的项为0
      if(!count){
        alert('请先选择待删除的项')
      }else{
        alert('删除成功')
      }
    }
  },
}
</script>

<style scoped lang="less">
.table.table-bordered{
  margin-bottom: 0;
  th{
    white-space:nowrap;
    text-align: center;
  }
  td{
    text-align: center;
    vertical-align: middle;
  }
  input{
    width: 100%;
  }
}
#shoppingModal{
  .table.table-bordered{
    margin-bottom: 10px;
    input{
      width: unset;
    }
  }
}

</style>

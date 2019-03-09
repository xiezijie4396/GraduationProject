<template>
  <div class="goods-admin">
    <div class="panel panel-default">
      <div class="panel-body">
        <router-link to="/goods-admin/add" class="btn btn-primary">添加商品</router-link>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th v-if="loginMsg.username == 'admin'">店家</th>
              <th>商品名称</th>
              <th>商品图片</th>
              <th>商品价格</th>
              <th>发布时间</th>
              <th>商品数量</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in goodsbyPage" :key="index">
              <td v-if="loginMsg.username == 'admin'">{{item.saler}}</td>
              <td>{{item.name}}</td>
              <td>
                <div v-for="(upImg, i) in item.upLoadImg" :key="i" style="display: inline-block;">
                  <img :src="upImg.base64">
                </div>
              </td>
              <td>{{item.price}}</td>
              <td>{{item.createTime | dateformat}}</td>
              <td>{{item.num}}</td>
              <td>
                <a @click="modifly(item._id)">编辑</a>
                <a @click="deleteGoods(item._id)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
        <nav class="text-center" v-show="goodsbyPage.length !== 0">
          <ul class="pagination">
            <li @click="changePage(1, $event)"><a><span>&laquo;</span></a></li>
            <li v-for="(num,index) in pageCount" :key="index" @click="changePage(num, $event)"><a>{{num}}</a></li>
            <li @click="changePage(pageCount, $event)"><a><span>&raquo;</span></a></li>
          </ul>
        </nav>      
      </div>
    </div>     
  </div>
</template>

<script>
export default {
  name: 'adminuser',
  data () {
    return {
      goods: [],          // 商品
      goodsbyPage: [],    // 根据页码显示出来的商品
      pageSize: 2,        // 每页显示2条数据    
      pageCount: 0,       // 总共有多少页   
    }
  },
  components: {
    
  },
  mounted(){
    this.getData()
  },
  computed: {
    loginMsg(){
      return this.$store.state.login
    },
  },
  methods:{
    getData(){
      this.axios.post('/api/goods/get').then((res)=>{
        this.goods = res.data
        this.goods = this.goods.filter((e)=>{
          return e.saler == this.loginMsg.username || this.loginMsg.username == 'admin'
        })
        if(this.goods.length % this.pageSize === 0){           // 如果页面整除的话
          this.pageCount = this.goods.length / this.pageSize
        }else{
          this.pageCount = parseInt(this.goods.length / this.pageSize) + 1
        }
        this.$nextTick(()=>{
          this.changePage(1)
        })
      })
    },
    deleteGoods(id){
      var params = this.$common.setParams([
        {name: 'uid', param: id},
      ])
      this.axios.post('/api/goods/delete', params).then((res)=>{
        this.getData()                                          // 删除完 更新数据
      })
    },
    changePage(num, $event){                                    // 改变页码
      this.goodsbyPage = []
      this.goodsbyPage = this.goods.slice((num-1)*this.pageSize, (num-1)*this.pageSize+this.pageSize)
      if($event){
        $($event.target).parents('.pagination>li').addClass('active').siblings().removeClass('active')
      }else{
        $('.pagination>li:nth-child(2)').eq(0).addClass('active').siblings().removeClass('active')
      }
    },
    modifly(id){
      this.$router.push({ 
        path: '/goods-admin/modifly',
        query: { id: id }})
    }
  }
}
</script>


<style scoped lang="less">
.goods-admin{
  button{
    margin: 0 10px 10px 0;
  }
  th, td{
    text-align: center;
    vertical-align: middle;
  }
  thead{
    th{
      white-space:nowrap;
    }
  }
  img{
    width: 50px;
    height: 50px;
  }
  .btn{
    margin-bottom: 10px;
  }
  .pagination{
    li{
      cursor: pointer;
    }
  }
}

</style>

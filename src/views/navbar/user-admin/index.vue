<template>
  <div class="userAdmin">
    <div class="panel panel-default">
      <div class="panel-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>用户名</th>
              <th>密码</th>
              <th>注册时间</th>
              <th>最近登录时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in userPageArr" :key="index">
              <td>{{user.username}}</td>
              <td>{{user.password}}</td>
              <td>{{user.createTime | dateformat}}</td>
              <td>{{user.loginTime | dateformat}}</td>
              <td><a @click="deleteUser(user._id)">删除</a></td>
            </tr>
          </tbody>
        </table>
        <nav class="text-center">
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
  name: 'userAdmin',
  data () {
    return {
      userArr: [],                              // 用于存储所有用户的数据
      userPageArr: [],                          // 分页后产生的用户数据
      pageSize: 2,                              // 每页显示2条数据    
      pageCount: 0,                             // 总共有多少页   
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){                                              // 获取用户数据
      this.axios.post('/api/user/get').then((res)=>{
        this.userArr = res.data
        if(this.userArr.length % this.pageSize === 0){      // 如果页面整除的话
          this.pageCount = this.userArr.length / this.pageSize
        }else{
          this.pageCount = parseInt(this.userArr.length / this.pageSize) + 1
        }
        this.$nextTick(()=>{
          this.changePage(1)
        })
      })
    },
    deleteUser(id){                                         // 删除用户
      var params = this.$common.setParams([
        {name: 'uid', param: id},
      ])
      this.axios.post('/api/user/delete', params).then((res)=>{
        alert('删除成功')
        this.getData()                                      // 删除完 更新数据
      })
    },
    changePage(num, $event){                                // 改变页码
      this.userPageArr = []
      this.userPageArr = this.userArr.slice((num-1)*this.pageSize, (num-1)*this.pageSize+this.pageSize)
      if($event){
        $($event.target).parents('.pagination>li').addClass('active').siblings().removeClass('active')
      }else{
        $('.pagination>li:nth-child(2)').eq(0).addClass('active').siblings().removeClass('active')
      }
    }
  },
}
</script>


<style scoped lang="less">
.userAdmin{
  th, td{
    text-align: center;
  }
  thead{
    th{
      white-space:nowrap;
    }
  }
  .pagination{
    li{
      cursor: pointer;
    }
  }
}

</style>

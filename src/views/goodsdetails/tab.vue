<template>
  <div class="tab">
    <ul id="myTab" class="nav nav-tabs">
        <li class="active"><a href="#details" data-toggle="tab">商品详情</a></li>
        <li><a href="#ios" data-toggle="tab">规格参数</a></li>
        <li><a href="#rated" data-toggle="tab">店家评价</a></li>
    </ul>
    <div id="myTabContent" class="tab-content">
        <!-- 商品详情 -->
        <div class="tab-pane fade in active" id="details" v-html="good.detail"></div>
        <!-- 规格参数 -->
        <div class="tab-pane fade" id="ios">
          <div class="panel panel-default">
            <!-- 基本参数 -->
            <div class="panel-heading">基本参数</div>
            <div class="panel-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>品牌</th>
                    <th>系列</th>
                    <th>操作系统</th>
                    <th>显卡类型</th>
                    <th>CPU</th>
                    <th>厚度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{good.params.brand}}</td>
                    <td>{{good.params.series}}</td>
                    <td>{{good.params.OS}}</td>
                    <td>{{good.params.videoType}}</td>
                    <td>{{good.params.CPU}}</td>
                    <td>{{good.params.ply}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 存储 -->
            <div class="panel-heading">存储</div>
            <div class="panel-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>显存容量</th>
                    <th>机械硬盘容量</th>
                    <th>固态硬盘</th>
                    <th>内存容量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{good.storage.video}}</td>
                    <td>{{good.storage.mechanical}}</td>
                    <td>{{good.storage.solidState}}</td>
                    <td>{{good.storage.memory}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 显示 -->
            <div class="panel-heading">显示</div>
            <div class="panel-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>屏幕尺寸</th>
                    <th>分辨率</th>
                    <th>是否触摸屏</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{good.show.screen}}</td>
                    <td>{{good.show.resolution}}</td>
                    <td>{{good.show.touch}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 包装清单 -->
            <div class="panel-heading">包装清单</div>
            <div class="panel-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th v-for="(item,i) in good.packList" :key="i">
                      {{item.packName}}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td v-for="(item,i) in good.packList" :key="i">
                      {{item.packNum}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- 店家评论区 -->
        <div class="tab-pane fade" id="rated">
          <div class="shopData" v-if="comments[0]">
            <div class="col-xs-4">店家：{{comments[0].salerId.username}}</div>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>评论</th>
                <th>购买物品</th>
                <th>评论人</th>
                <th>评论时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in comments" :key="index">
                <td>{{item.content}}</td>
                <td>{{item.goodsId.name}}</td>
                <td>{{item.userId.username}}</td>
                <td>{{item.createTime | dateformat}}</td>
              </tr>
            </tbody>
          </table>
          <label>您的评价</label>
          <textarea class="form-control" rows="3" v-model="newComment"></textarea>
          <button class="btn btn-success" @click="submitComment">提交评价</button>
          <button class="btn btn-warning">清空评价</button>
        </div>
    </div>    
  </div>
</template>

<script>

export default {
  name: 'tab',
  data () {
    return {
      comments: [],               // 现有评论
      newComment: ''              // 发布的新评论
    }
  },
  props: {
    good: Object,
  },
  mounted(){
    this.getComments()
  },
  computed: {
    userId(){
      return this.$store.state.login.userId
    }
  },
  methods:{
     getComments(){
      var params = this.$common.setParams([
        {name: 'salerId', param: this.good.salerId},
      ])
      this.axios.post('/api/comments/get',params).then((res)=>{
        this.comments = res.data
      })
    },
    submitComment(){
      var params = this.$common.setParams([
        {name: 'goodsId', param: this.$route.query.id},
        {name: 'userId', param: this.userId},
        {name: 'content', param: this.newComment},
        {name: 'salerId', param: this.good.salerId},
      ])
      this.axios.post('/api/comments/set',params).then((res)=>{
        alert('发表评论成功')
        this.newComment = []
        this.getComments()
      })
    }
  }
}
</script>


<style scoped lang="less">
.tab{
  margin-bottom: 40px;
  th, td{
    text-align: center;
  }
  ul{
    li{
      margin-top: 10px;
    }
  }
  .details{
    img{
      width: 100%;
    }
  }
  .shopData{
    width: 100%;
    height: 60px;
    div{
      line-height: 50px;
    }
    img{
      width: 50px;
      height: 50px;
    }
  }
  #rated{
    th{
      white-space:nowrap;
    }
  }
  textarea{
    margin-bottom: 10px;
  }
}
</style>

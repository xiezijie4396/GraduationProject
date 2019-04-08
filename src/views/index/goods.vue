<template>
  <div class="goods">
    <div class="goods-list">
      <div class="goods-img">
        <div class="col-xs-3" v-for="(item,i) in goods" :key="i">
          <router-link :to="'/goodsdetails?id='+item._id" class="thumbnail">
            <img :src="item.upLoadImg[0].base64">
            <p class="goods-price">￥{{item.price}}</p>
            <p class="goods-title">{{item.name}}</p>
            <!-- <p class="goods-comment">11万＋条评价</p> -->
            <!-- <p class="goods-owner">联想官方旗舰店</p> -->
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'goods',
  data () {
    return {

    }
  },
  props: {
    goods: Array
  },
  mounted(){
  },
  watch: {
    '$store.state.sort.type': function(){
      this.sortData(this.$store.state.sort.type)
    },
  },
  methods: {
    sortData(type){
      // 0 不排序
      // 1：销量↑ 2：销量↓
      // 3：价格↑ 4：价格↓
      // 5：评论↑ 6：评论↓
      // 7：时间↑ 8：时间↓
      if(type == 1){
        this.goods.sort(function(a, b){
          return a.volume - b.volume
        })
      }
      else if(type == 2){
        this.goods.sort(function(a, b){
          return b.volume - a.volume
        })
      }else if(type == 3){
        this.goods.sort(function(a, b){
          return a.price - b.price
        })
      }
      else if(type == 4){
        this.goods.sort(function(a, b){
          return b.price - a.price
        })
      }
      else if(type == 5){
        this.goods.sort(function(a, b){
          return a.volume - b.volume
        })
      }
      else if(type == 6){
        this.goods.sort(function(a, b){
          return b.volume - a.volume
        })
      }
      else if(type == 7){
        this.goods.sort(function(a, b){
          return new Date(a.createTime).getTime() - new Date(b.createTime).getTime()
        })
      }
      else if(type == 8){
        this.goods.sort(function(a, b){
          return new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
        })
      }
    }
  }
}
</script>


<style scoped lang="less">
.index{
  width: 800px;
  margin: 0 auto;
  .goods-title{
    height: 100px;
    overflow: hidden;
  }
}
</style>

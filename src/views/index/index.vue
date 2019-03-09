<template>
  <div class="index">
    <carousel :imgs="advs"/>
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="searchDiv">
          <input type="text" placeholder="搜索" v-model="searchText">
          <button class="btn btn-default" type="button" @click="search(searchText)">搜索</button>
        </div>
        <order-btns/>
        <goods :goods="goods"/>
      </div>
    </div>
    <bottom/>
  </div>
</template>

<script>
import Bottom from '../../components/Bottom'
import Goods from './goods'
import orderBtns from './orderBtns'
import Carousel from './carousel'
export default {
  name: 'index',
  data () {
    return {
      searchText: '',
      data: [],
      goods: [],
      advs: []               // 用于存放广告的数组
    }
  },
  components: {
    Goods,
    orderBtns,
    Bottom,
    Carousel
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      this.axios.post('/api/goods/get').then((res)=>{
        this.data = res.data
        this.search('')
      })
      this.axios.post('/api/advs/get').then((res)=>{
        this.advs = []
        res.data.forEach((e)=>{
          this.advs.push(e.advs)
        })
      })
    },
    search(text){
      var reg = new RegExp(text,"gim");
      this.goods = this.data.filter((value, index, array)=>{
        return reg.test(value.name)
      })
    }
  }
}
</script>


<style scoped lang="less">
.index{
  width: 800px;
  margin: 0 auto;
  .panel{
    margin-top: 20px;
  }
  .searchDiv{
    margin: 20px auto 10px auto;
    input{
      display: inline-block;
      width: 80%;
      line-height: 34px;
      height: 34px;
      text-indent: 1em;
    }
  }
  .form-inline{
    .form-control{
      width: 50%;
    }
  }
}



</style>
